import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Header from '@components/header';
import PandOverviewTable from '@components/pand/PandOverviewTable';
import AddPandForm from '@components/pand/AddPandForm';
import { Pand } from '@types';
import useSWR from 'swr';
import PandService from '@services/PandService';

const fetcher = async () => {
    const response = await PandService.getAllPanden();
    return response.json();
};

type LoggedInUser = {
    token: string;
    username: string;
    role: string;
};

const PandPage: React.FC = () => {
    const { data: panden, error } = useSWR<Array<Pand>>('/api/panden', fetcher);
    const [isAdding, setIsAdding] = useState(false);
    const [loggedInUser, setLoggedInUser] = useState<LoggedInUser | null>(null);
    const [isLoadingUser, setIsLoadingUser] = useState(true);

    useEffect(() => {
        const user = sessionStorage.getItem('loggedInUser');
        if (user) {
            setLoggedInUser(JSON.parse(user));
        }
        setIsLoadingUser(false);
    }, []);

    let currentRole = '';
    let currentUserId: number | null = null;
    if (loggedInUser) {
        currentRole = loggedInUser.role;
    }

    if (!loggedInUser) {
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
    if (!panden) return <div>Loading...</div>;

    const filteredPanden =
        currentRole === 'realtor' && currentUserId
            ? panden.filter((pand) => pand.userIdMakelaar === currentUserId)
            : panden;

    const headingText = currentRole === 'realtor' ? 'Mijn panden' : 'Panden overzicht';

    return (
        <>
            <Head>
                <title>Panden</title>
            </Head>
            <Header />
            <main className="d-flex flex-column justify-content-center align-items-center">
                <section>
                    <h2>{headingText}</h2>
                    {currentRole === 'realtor' && (
                        <button onClick={() => setIsAdding(true)}>Add New Pand</button>
                    )}
                    {isAdding && <AddPandForm onClose={() => setIsAdding(false)} />}
                    <PandOverviewTable panden={filteredPanden} currentUserRole={currentRole} />
                </section>
            </main>
        </>
    );
};

export default PandPage;
