import Head from 'next/head';
import Header from '@components/header';
import BeoordelingOverviewTable from '@components/beoordeling/BeoordelingOverviewTable';
import { Beoordeling } from '@types';
import useSWR from 'swr';
import BeoordelingService from '@services/BeoordelingService';

const fetcher = async () => {
    const response = await BeoordelingService.getAllBeoordelingen();
    return response.json();
};

const BeoordelingPage: React.FC = () => {
    const { data: beoordelingen, error } = useSWR<Array<Beoordeling>>('/api/beoordelingen', fetcher);

    if (error) return <div>Failed to load</div>;
    if (!beoordelingen) return <div>Loading...</div>;

    return (
        <>
            <Head>
                <title>Beoordelingen</title>
            </Head>
            <Header />
            <main className="d-flex flex-column justify-content-center align-items-center">
                <section>
                    <h2>Beoordeling overzicht</h2>
                    <BeoordelingOverviewTable beoordelingen={beoordelingen} />
                </section>
            </main>
        </>
    );
};

export default BeoordelingPage;
