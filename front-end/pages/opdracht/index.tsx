import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Header from '@components/header';
import OpdrachtOverviewTable from '@components/opdracht/OpdrachtOverviewTable';
import { Opdracht } from '@types';
import useSWR, { mutate } from 'swr';
import OpdrachtService from '@services/OpdrachtService';
import MediaOverviewTable from '@components/media/MediaOverviewTable';
import BeoordelingOverviewTable from '@components/beoordeling/BeoordelingOverviewTable';

const fetcher = async () => {
    const response = await OpdrachtService.getAllOpdrachten();
    return response.json();
};

type LoggedInUser = {
    token: string;
    username: string;
    role: string;
};

const OpdrachtPage: React.FC = () => {
    const { data: opdrachten, error } = useSWR<Array<Opdracht>>('/api/opdrachten', fetcher);
    const [selectedOpdracht, setSelectedOpdracht] = useState<Opdracht | null>(null);
    const [showModal, setShowModal] = useState(false);
    const [message, setMessage] = useState<string | null>(null);

    const [loggedInUser, setLoggedInUser] = useState<LoggedInUser | null>(null);
    const [isLoadingUser, setIsLoadingUser] = useState(true);

    const [currentUserRole, setCurrentUserRole] = useState<string>('');
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const loggedInUser = sessionStorage.getItem('loggedInUser');
            if (loggedInUser) {
                const parsedUser = JSON.parse(loggedInUser);
                setCurrentUserRole(parsedUser.role);
            }
        }
        const user = sessionStorage.getItem('loggedInUser');
        if (user) {
            setLoggedInUser(JSON.parse(user));
        }
        setIsLoadingUser(false);
    }, []);

    const handleCloseOpdracht = async (opdrachtId: number) => {
        try {
            const response = await OpdrachtService.updateOpdrachtStatus(opdrachtId, 'closed');
            setMessage(
                'Opdracht aan het sluiten... Kijk naar u profiel voor alle gesloten opdrachten'
            );
            mutate('/api/opdrachten');
            setTimeout(() => {
                setMessage(null);
            }, 3000);
        } catch (error) {
            alert(`Fout bij het sluiten van de opdracht: ${error.message}`);
        }
    };

    if (!loggedInUser || loggedInUser.role !== 'admin') {
        return (
            <>
                <Header />
                <div className="min-h-screen flex items-center justify-center bg-gray-100">
                    <h1 className="text-2xl font-bold text-red-600">
                        Permission denied. You are not authorized to view this page.
                    </h1>
                </div>
            </>
        );
    }

    if (error) return <div>Failed to load</div>;
    if (!opdrachten) return <div>Loading...</div>;

    const filteredOpdrachten = opdrachten.filter((opdracht) => opdracht.status !== 'closed');

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
                    {message && (
                        <div
                            className="alert alert-success bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative"
                            role="alert"
                        >
                            {message}
                        </div>
                    )}
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
