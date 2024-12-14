import React, { useState, useEffect } from 'react';
import Head from "next/head";
import Header from "@components/header";
import OpdrachtOverviewTable from "@components/opdracht/OpdrachtOverviewTable";
import { Opdracht } from "@types";
import useSWR, { mutate } from "swr";
import OpdrachtService from "@services/OpdrachtService";
import MediaOverviewTable from "@components/media/MediaOverviewTable";
import BeoordelingOverviewTable from "@components/beoordeling/BeoordelingOverviewTable";

const fetcher = async () => {
    const response = await OpdrachtService.getAllOpdrachten();
    if (!response.ok) {
        throw new Error('Failed to fetch opdrachten');
    }
    return response.json();
};

const OpdrachtPage: React.FC = () => {
    const { data: opdrachten, error } = useSWR<Array<Opdracht>>(
        "/api/opdrachten",
        fetcher
    );
    const [selectedOpdracht, setSelectedOpdracht] = useState<Opdracht | null>(null);
    const [showModal, setShowModal] = useState(false);
    const [message, setMessage] = useState<string | null>(null);

    const [currentUserRole, setCurrentUserRole] = useState<string>('');
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const loggedInUser = sessionStorage.getItem("loggedInUser");
            if (loggedInUser) {
                const parsedUser = JSON.parse(loggedInUser);
                setCurrentUserRole(parsedUser.role);
            }
        }
    }, []);

    const handleCloseOpdracht = async (opdrachtId: number) => {
        try {
            const response = await OpdrachtService.updateOpdrachtStatus(opdrachtId, 'closed');
            setMessage("Opdracht aan het sluiten... Kijk naar u profiel voor alle gesloten opdrachten");
            mutate("/api/opdrachten");
        } catch (error) {
            alert(`Fout bij het sluiten van de opdracht: ${error.message}`);
        }
    };

    if (error) return <div>Failed to load</div>;
    if (!opdrachten) return <div>Loading...</div>;

    const filteredOpdrachten = opdrachten.filter(opdracht => opdracht.status !== 'closed');

    return (
        <>
            <Head>
                <title>Opdrachten</title>
            </Head>
            <Header />
            <main className="flex flex-col justify-center items-center">
                <section className="p-6 w-full max-w-4xl">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-bold">Opdrachten Overview</h2>
                    </div>
                    {message && <div className="alert alert-info">{message}</div>}
                    <OpdrachtOverviewTable
                        opdrachten={filteredOpdrachten}
                        selectOpdracht={setSelectedOpdracht}
                        currentUserRole={currentUserRole}
                        closeOpdracht={handleCloseOpdracht}
                    />
                    {selectedOpdracht && (
                        <>
                            <h2 className="mt-6 text-lg font-bold">
                                Media van Opdracht {selectedOpdracht.opdrachtnummer}
                            </h2>
                            <MediaOverviewTable medias={selectedOpdracht.medias} />

                            <h2 className="mt-6 text-lg font-bold">
                                Beoordeling van Opdracht {selectedOpdracht.opdrachtnummer}
                            </h2>
                            <BeoordelingOverviewTable
                                beoordelingen={
                                    selectedOpdracht.beoordeling
                                        ? [selectedOpdracht.beoordeling]
                                        : []
                                }
                            />
                        </>
                    )}
                </section>
            </main>
        </>
    );
};

export default OpdrachtPage;
