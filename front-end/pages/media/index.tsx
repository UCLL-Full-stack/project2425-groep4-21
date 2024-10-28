import Head from 'next/head';
import Header from '@components/header';
import MediaOverviewTable from '@components/media/MediaOverviewTable';
import { Media } from '@types';
import { useState, useEffect } from 'react';
import MediaService from '@services/MediaService';

const MediaPage: React.FC = () => {
    const [medias, setMedias] = useState<Array<Media>>([]); // props die we declareren

    const getMediaItems = async () => {
        // functie getMediaItems waar we de functie gaan oproepen
        const response = await MediaService.getAllMedia();
        const mediaData = await response.json(); // media omzetten naar JSON
        setMedias(mediaData); // setter gebruiken
    };

    useEffect(() => {
        getMediaItems(); // de call naar de backend
    }, []); // wordt nog gedetailleerder uitgelegd

    return (
        <>
            <Head>
                <title>Media</title>
            </Head>
            <Header />
            <main className="d-flex flex-column justify-content-center align-items-center">
                <h1>Media</h1>
                <section>
                    <h2>Media overview</h2>
                    {medias && <MediaOverviewTable medias={medias} />}
                    {/* inline if statement, als er media items zijn, dan MediaOverviewTable renderen */}
                </section>
            </main>
        </>
    );
};

export default MediaPage;
