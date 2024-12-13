import Head from 'next/head';
import Header from '@components/header';
import PandOverviewTable from '@components/pand/PandOverviewTable';
import { Pand } from '@types';
import useSWR from 'swr';
import PandService from '@services/PandService';

const fetcher = async () => {
    const response = await PandService.getAllPanden();
    return response.json();
};

const PandPage: React.FC = () => {
    const { data: panden, error } = useSWR<Array<Pand>>('/api/panden', fetcher);

    const loggedInUser = (typeof window !== 'undefined') ? sessionStorage.getItem('loggedInUser') : null;
    let currentRole = '';
    let currentUserId: number | null = null;
    if (loggedInUser) {
        const parsedUser = JSON.parse(loggedInUser);
        currentRole = parsedUser.role;
        currentUserId = parsedUser.userId;
    }

    if (error) return <div>Failed to load</div>;
    if (!panden) return <div>Loading...</div>;

    const filteredPanden = currentRole === 'realtor' && currentUserId
        ? panden.filter(pand => pand.userIdMakelaar === currentUserId)
        : panden;

    const headingText = currentRole === 'realtor' ? "Mijn panden" : "Panden overzicht";

    return (
        <>
            <Head>
                <title>Panden</title>
            </Head>
            <Header />
            <main className="d-flex flex-column justify-content-center align-items-center">
                <section>
                    <h2>{headingText}</h2>
                    <PandOverviewTable panden={filteredPanden} />
                </section>
            </main>
        </>
    );
};

export default PandPage;
