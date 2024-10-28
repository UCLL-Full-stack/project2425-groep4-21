import Head from 'next/head';
import Header from '@components/header';
import PandOverviewTable from '@components/pand/PandOverviewTable';
import { Pand } from '@types';
import { useState, useEffect } from 'react';
import PandService from '@services/PandService';

const PandPage: React.FC = () => {
    const [panden, setPanden] = useState<Array<Pand>>([]); // props die we declareren

    const getPanden = async () => {
        // functie getPanden waar we de functie gaan oproepen
        const response = await PandService.getAllPanden();
        const pandData = await response.json(); // panden omzetten naar JSON
        setPanden(pandData); // setter gebruiken
    };

    useEffect(() => {
        getPanden(); // de call naar de backend
    }, []); // wordt nog gedetailleerder uitgelegd

    return (
        <>
            <Head>
                <title>Panden</title>
            </Head>
            <Header />
            <main className="d-flex flex-column justify-content-center align-items-center">
                <h1>Panden</h1>
                <section>
                    <h2>Panden overzicht</h2>
                    {panden && <PandOverviewTable panden={panden} />}
                    {/* inline if statement, als er panden zijn, dan PandOverviewTable renderen */}
                </section>
            </main>
        </>
    );
};

export default PandPage;
