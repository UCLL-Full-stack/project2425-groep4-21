import Head from "next/head";
import Header from "@components/header";
import OpdrachtOverviewTable from "@components/opdracht/OpdrachtOverviewTable";
import { Opdracht } from "@types";
import useSWR from "swr";
import OpdrachtService from "@services/OpdrachtService";
import { useState, useEffect } from "react";

const fetcher = async () => {
    const response = await OpdrachtService.getAllOpdrachten();
    return response.json();
};

const PilotProfilePage: React.FC = () => {
    const { data: opdrachten, error } = useSWR<Array<Opdracht>>(
        "/api/opdrachten",
        fetcher
    );
    const [currentUserRole, setCurrentUserRole] = useState<string>('');
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const loggedInUser = sessionStorage.getItem("loggedInUser");
            if (loggedInUser) {
                const parsedUser = JSON.parse(loggedInUser);
                setCurrentUserRole(parsedUser.role);
            }
        }
    }, []);

    if (error) return <div>Failed to load</div>;
    if (!opdrachten) return <div>Loading...</div>;

    const closedOpdrachten = opdrachten.filter(opdracht => opdracht.status === 'closed');

    return (
        <>
            <Head>
                <title>Pilot Profile</title>
            </Head>
            <Header />
            <main className="flex flex-col justify-center items-center">
                <section className="p-6 w-full max-w-4xl">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-bold">Closed Opdrachten</h2>
                    </div>
                    <OpdrachtOverviewTable
                        opdrachten={closedOpdrachten}
                        selectOpdracht={() => {}}
                        currentUserRole={currentUserRole}
                        closeOpdracht={() => {}}
                    />
                </section>
            </main>
        </>
    );
};

export default PilotProfilePage;
