import Head from 'next/head';
import Header from '@components/header';
import MediaOverviewTable from '@components/media/MediaOverviewTable';
import { Media } from '@types';
import useSWR from 'swr';
import MediaService from '@services/MediaService';
import { useEffect, useState } from 'react';

const fetcher = async () => {
    const response = await MediaService.getAllMedia();
    return response.json();
};

type LoggedInUser = {
    token: string;
    username: string;
    role: string;
};

const MediaPage: React.FC = () => {
    const { data: medias, error } = useSWR<Array<Media>>('/api/media', fetcher);

    const [loggedInUser, setLoggedInUser] = useState<LoggedInUser | null>(null);
    const [isLoadingUser, setIsLoadingUser] = useState(true);

    useEffect(() => {
        const user = sessionStorage.getItem('loggedInUser');
        if (user) {
            setLoggedInUser(JSON.parse(user));
        }
        setIsLoadingUser(false);
    }, []);

    if (isLoadingUser) {
        return <div>Loading user data...</div>;
    }

    if (!loggedInUser || loggedInUser.role !== 'admin') {
        return (
            <>
                <Header />
                <div className="min-h-screen flex items-center justify-center bg-gray-100">
                    <h1 className="text-2xl font-bold text-red-600">
                        Permission denied. You are not authorized to view this page.
                    </h1>
                </div>
            </>
        );
    }

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
