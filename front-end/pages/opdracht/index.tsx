import Head from "next/head";
import Header from "@components/header";
import OpdrachtOverviewTable from "@components/opdracht/OpdrachtOverviewTable";
import { Opdracht } from "@types";
import useSWR, { mutate } from "swr";
import OpdrachtService from "@services/OpdrachtService";
import MediaOverviewTable from "@components/media/MediaOverviewTable";
import BeoordelingOverviewTable from "@components/beoordeling/BeoordelingOverviewTable";
import { useState } from "react";
import CreateOpdrachtModal from "@components/opdracht/CreateOpdrachtModal";

const fetcher = async () => {
    const response = await OpdrachtService.getAllOpdrachten();
    return response.json();
};

const OpdrachtPage: React.FC = () => {
    const { data: opdrachten, error } = useSWR<Array<Opdracht>>(
        "/api/opdrachten",
        fetcher
    );
    const [selectedOpdracht, setSelectedOpdracht] = useState<Opdracht | null>(
        null
    );
    const [showModal, setShowModal] = useState(false);

    const handleCreateOpdracht = async (newOpdracht: Opdracht) => {
        // Call service to save the new opdracht
        await OpdrachtService.createOpdracht(newOpdracht);
        // Re-fetch data
        mutate("/api/opdrachten");
        setShowModal(false); // Close the modal
    };

    if (error) return <div>Failed to load</div>;
    if (!opdrachten) return <div>Loading...</div>;

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
                        <button
                            onClick={() => setShowModal(true)}
                            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md"
                        >
                            + Create New Opdracht
                        </button>
                    </div>
                    <OpdrachtOverviewTable
                        opdrachten={opdrachten}
                        selectOpdracht={setSelectedOpdracht}
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
                {showModal && (
                    <CreateOpdrachtModal
                        onClose={() => setShowModal(false)}
                        onCreate={handleCreateOpdracht}
                    />
                )}
            </main>
        </>
    );
};

export default OpdrachtPage;
