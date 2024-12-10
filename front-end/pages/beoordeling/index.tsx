import Head from 'next/head';
import Header from '@components/header';
import BeoordelingOverviewTable from '@components/beoordeling/BeoordelingOverviewTable';
import { Beoordeling } from '@types';
import { useState, useEffect } from 'react';
import BeoordelingService from '@services/BeoordelingService';

const BeoordelingPage: React.FC = () => {
    const [beoordelingen, setBeoordelingen] = useState<Array<Beoordeling>>([]); // props die we declareren

    const getBeoordelingen = async () => {
        const response = await BeoordelingService.getAllBeoordelingen();
        const beoordelingData = await response.json();
        setBeoordelingen(beoordelingData);
    };

    useEffect(() => {
        getBeoordelingen();
    }, []);

    return (
        <>
            <Head>
                <title>Beoordelingen</title>
            </Head>
            <Header />
            <main className="d-flex flex-column justify-content-center align-items-center">
                <h1>Beoordelingen</h1>
                <section>
                    <h2>Beoordeling overzicht</h2>
                    {beoordelingen && <BeoordelingOverviewTable beoordelingen={beoordelingen} />}
                </section>
            </main>
        </>
    );
};

export default BeoordelingPage;
