import Head from 'next/head';
import Header from '@components/header';
import OpdrachtOverviewTable from '@components/opdracht/OpdrachtOverviewTable';
import { Opdracht } from '@types';
import useSWR from 'swr';
import OpdrachtService from '@services/OpdrachtService';
import MediaOverviewTable from '@components/media/MediaOverviewTable';
import BeoordelingOverviewTable from '@components/beoordeling/BeoordelingOverviewTable';
import {useState} from "react";

const fetcher = async () => {
    const response = await OpdrachtService.getAllOpdrachten();
    return response.json();
};

const OpdrachtPage: React.FC = () => {
    const { data: opdrachten, error } = useSWR<Array<Opdracht>>('/api/opdrachten', fetcher);
    const [selectedOpdracht, setSelectedOpdracht] = useState<Opdracht | null>(null);

    if (error) return <div>Failed to load</div>;
    if (!opdrachten) return <div>Loading...</div>;

    return (
        <>
            <Head>
                <title>Opdrachten</title>
            </Head>
            <Header />
            <main className="d-flex flex-column justify-content-center align-items-center">
                <section>
                    <h2>Opdrachten overview</h2>
                    <OpdrachtOverviewTable
                        opdrachten={opdrachten}
                        selectOpdracht={setSelectedOpdracht}
                    />
                    {selectedOpdracht && (
                        <>
                            <h2>Media van Opdracht {selectedOpdracht.opdrachtnummer}</h2>
                            <MediaOverviewTable medias={selectedOpdracht.medias} />

                            <h2>Beoordeling van Opdracht {selectedOpdracht.opdrachtnummer}</h2>
                            <BeoordelingOverviewTable
                                beoordelingen={selectedOpdracht.beoordeling ? [selectedOpdracht.beoordeling] : []}
                            />
                        </>
                    )}
                </section>
            </main>
        </>
    );
};

export default OpdrachtPage;
