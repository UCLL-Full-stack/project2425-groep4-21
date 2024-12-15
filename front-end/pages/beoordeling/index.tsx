import Head from 'next/head';
import Header from '@components/header';
import BeoordelingOverviewTable from '@components/beoordeling/BeoordelingOverviewTable';
import { Beoordeling } from '@types';
import useSWR from 'swr';
import BeoordelingService from '@services/BeoordelingService';
import { useState, useEffect } from 'react';

const fetcher = async () => {
    const response = await BeoordelingService.getAllBeoordelingen();
    return response.json();
};

type LoggedInUser = {
    token: string;
    username: string;
    role: string;
};

const BeoordelingPage: React.FC = () => {
    const { data: beoordelingen, error } = useSWR<Array<Beoordeling>>(
        '/api/beoordelingen',
        fetcher
    );
    const [currentUserRole, setCurrentUserRole] = useState<string>('');
    const [currentUserId, setCurrentUserId] = useState<number | null>(null);

    const [loggedInUser, setLoggedInUser] = useState<LoggedInUser | null>(null);
    const [isLoadingUser, setIsLoadingUser] = useState(true);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const loggedInUser = sessionStorage.getItem('loggedInUser');
            if (loggedInUser) {
                const parsedUser = JSON.parse(loggedInUser);
                setCurrentUserRole(parsedUser.role);
                setCurrentUserId(parsedUser.userId);
            }
        }
        const user = sessionStorage.getItem('loggedInUser');
        if (user) {
            setLoggedInUser(JSON.parse(user));
        }
        setIsLoadingUser(false);
    }, []);

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
    if (!beoordelingen) return <div>Loading...</div>;

    const filteredBeoordelingen =
        currentUserRole === 'admin'
            ? beoordelingen
            : currentUserRole === 'realtor' || currentUserRole === 'pilot'
            ? beoordelingen.filter((beoordeling) => beoordeling.userId === currentUserId)
            : [];

    const pageTitle = currentUserRole === 'admin' ? 'Overview beoordelingen' : 'Mijn beoordelingen';

    return (
        <>
            <Head>
                <title>{pageTitle}</title>
            </Head>
            <Header />
            <main className="d-flex flex-column justify-content-center align-items-center">
                <section>
                    <h2>{pageTitle}</h2>
                    {filteredBeoordelingen.length > 0 ? (
                        <BeoordelingOverviewTable
                            beoordelingen={filteredBeoordelingen}
                            currentUserRole={currentUserRole}
                        />
                    ) : (
                        <p>Geen beoordelingen voor deze gebruiker</p>
                    )}
                </section>
            </main>
        </>
    );
};

export default BeoordelingPage;
