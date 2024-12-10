import Head from 'next/head';
import Header from '@components/header';
import MediaOverviewTable from '@components/media/MediaOverviewTable';
import { Media } from '@types';
import useSWR from 'swr';
import MediaService from '@services/MediaService';

const fetcher = async () => {
    const response = await MediaService.getAllMedia();
    return response.json();
};

const MediaPage: React.FC = () => {
    const { data: medias, error } = useSWR<Array<Media>>('/api/media', fetcher);

    if (error) return <div>Failed to load</div>;
    if (!medias) return <div>Loading...</div>;

    return (
        <>
            <Head>
                <title>Media</title>
            </Head>
            <Header />
            <main className="d-flex flex-column justify-content-center align-items-center">
                <section>
                    <h2>Media overview</h2>
                    <MediaOverviewTable medias={medias} />
                </section>
            </main>
        </>
    );
};

export default MediaPage;
