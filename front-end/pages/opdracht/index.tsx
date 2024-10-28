import Head from 'next/head';
import Header from '@components/header';
import OpdrachtOverviewTable from '@components/opdracht/OpdrachtOverviewTable';
import { Opdracht } from '@types';
import { useState, useEffect } from 'react';
import OpdrachtService from '@services/OpdrachtService';
import MediaOverviewTable from '@components/media/MediaOverviewTable';
import BeoordelingOverviewTable from '@components/beoordeling/BeoordelingOverviewTable';

const OpdrachtPage: React.FC = () => {
    const [opdrachten, setOpdrachten] = useState<Array<Opdracht>>([]); // props die we declareren
    const [selectedOpdracht, setSelectedOpdracht] = useState<Opdracht | null>(null); // nieuwe state voor geselecteerde opdracht

    const getOpdrachten = async () => {
        // functie getOpdrachten waar we de functie gaan oproepen
        const response = await OpdrachtService.getAllOpdrachten();
        const opdrachtData = await response.json(); // opdrachten omzetten naar JSON
        setOpdrachten(opdrachtData); // setter gebruiken
    };

    useEffect(() => {
        getOpdrachten(); // de call naar de backend
    }, []); // wordt nog gedetailleerder uitgelegd

    return (
        <>
            <Head>
                <title>Opdrachten</title>
            </Head>
            <Header />
            <main className="d-flex flex-column justify-content-center align-items-center">
                <h1>Opdrachten</h1>
                <section>
                    <h2>Opdrachten overview</h2>
                    {opdrachten && (
                        <OpdrachtOverviewTable
                            opdrachten={opdrachten}
                            selectOpdracht={setSelectedOpdracht} // De setSelectedOpdracht functie meegeven
                        />
                    )}
                    {/* Render de MediaOverviewTable en BeoordelingOverviewTable alleen als een opdracht is geselecteerd */}
                    {/* Render de media & beoordeling table */}
                    {selectedOpdracht && (
                        <>
                            <h2>Media van Opdracht {selectedOpdracht.opdrachtnummer}</h2>
                            <MediaOverviewTable medias={selectedOpdracht.medias} />

                            <h2>Beoordeling van Opdracht {selectedOpdracht.opdrachtnummer}</h2>
                            <BeoordelingOverviewTable
                                beoordelingen={[selectedOpdracht.beoordeling]}
                            />
                        </>
                    )}
                </section>
            </main>
        </>
    );
};

export default OpdrachtPage;
