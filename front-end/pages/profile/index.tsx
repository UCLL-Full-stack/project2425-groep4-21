import Head from 'next/head';
import Header from '@components/header';
import OpdrachtOverviewTable from '@components/opdracht/OpdrachtOverviewTable';
import BeoordelingOverviewTable from '@components/beoordeling/BeoordelingOverviewTable';
import { Opdracht, Beoordeling } from '@types';
import useSWR from 'swr';
import OpdrachtService from '@services/OpdrachtService';
import BeoordelingService from '@services/BeoordelingService';
import { useState, useEffect } from 'react';

const fetchOpdrachten = async () => {
    const response = await OpdrachtService.getAllOpdrachten();
    return response.json();
};

const fetchBeoordelingen = async () => {
    const response = await BeoordelingService.getAllBeoordelingen();
    return response.json();
};

const PilotProfilePage: React.FC = () => {
    const { data: opdrachten, error: opdrachtError } = useSWR<Array<Opdracht>>(
        '/api/opdrachten',
        fetchOpdrachten
    );
    const { data: beoordelingen, error: beoordelingError } = useSWR<Array<Beoordeling>>(
        '/api/beoordelingen',
        fetchBeoordelingen
    );

    const [currentUserRole, setCurrentUserRole] = useState<string>('');
    const [currentUserId, setCurrentUserId] = useState<number | null>(null);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const loggedInUser = sessionStorage.getItem('loggedInUser');
            if (loggedInUser) {
                const parsedUser = JSON.parse(loggedInUser);
                setCurrentUserRole(parsedUser.role);
                setCurrentUserId(parsedUser.userId);
            }
        }
    }, []);


    if (!currentUserRole) {
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

    if (opdrachtError || beoordelingError) return <div>Failed to load</div>;
    if (!opdrachten || !beoordelingen) return <div>Loading...</div>;

    const closedOpdrachten = opdrachten.filter((opdracht) => opdracht.status === 'Completed');
    const filteredBeoordelingen =
        currentUserRole === 'admin'
            ? beoordelingen
            : beoordelingen.filter((beoordeling) => beoordeling.userId === currentUserId);

    return (
        <>
            <Head>
                <title>Pilot Profile</title>
            </Head>
            <Header />
            <main className="flex flex-col justify-center items-center">
                <h2>Mijn profiel</h2>
                <section className="p-6 w-full max-w-4xl">
                    <div className="mb-6">
                        <h2 className="text-xl font-bold">Gesloten Opdrachten</h2>
                        <OpdrachtOverviewTable
                            opdrachten={closedOpdrachten}
                            selectOpdracht={() => {}}
                            currentUserRole={currentUserRole}
                            closeOpdracht={() => {}}
                        />
                    </div>
                    <div className="mt-6">
                        <h2 className="text-xl font-bold">Mijn Beoordelingen</h2>
                        {filteredBeoordelingen.length > 0 ? (
                            <BeoordelingOverviewTable
                                beoordelingen={filteredBeoordelingen}
                                currentUserRole={currentUserRole}
                            />
                        ) : (
                            <p>Geen beoordelingen voor deze gebruiker</p>
                        )}
                    </div>
                </section>
            </main>
        </>
    );
};

export default PilotProfilePage;
