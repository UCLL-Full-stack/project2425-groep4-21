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

const BeoordelingPage: React.FC = () => {
    const { data: beoordelingen, error } = useSWR<Array<Beoordeling>>('/api/beoordelingen', fetcher);
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

    if (error) return <div>Failed to load</div>;
    if (!beoordelingen) return <div>Loading...</div>;

    const filteredBeoordelingen = currentUserRole === 'admin'
        ? beoordelingen
        : (currentUserRole === 'realtor' || currentUserRole === 'pilot')
            ? beoordelingen.filter(beoordeling => beoordeling.userId === currentUserId)
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
                        <BeoordelingOverviewTable beoordelingen={filteredBeoordelingen} currentUserRole={currentUserRole} />
                    ) : (
                        <p>Geen beoordelingen voor deze gebruiker</p>
                    )}
                </section>
            </main>
        </>
    );
};

export default BeoordelingPage;
