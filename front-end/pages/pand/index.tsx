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

    if (error) return <div>Failed to load</div>;
    if (!panden) return <div>Loading...</div>;

    return (
        <>
            <Head>
                <title>Panden</title>
            </Head>
            <Header />
            <main className="d-flex flex-column justify-content-center align-items-center">
                <section>
                    <h2>Panden overzicht</h2>
                    <PandOverviewTable panden={panden} />
                </section>
            </main>
        </>
    );
};

export default PandPage;
