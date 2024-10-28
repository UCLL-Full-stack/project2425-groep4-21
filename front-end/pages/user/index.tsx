import Head from 'next/head';
import Header from '@components/header';
import UserOverviewTable from '@components/user/UserOverviewTable';
import { User } from '@types';
import { useState, useEffect } from 'react';
import UserService from '@services/userService';
import BeoordelingOverviewTable from '@components/beoordeling/BeoordelingOverviewTable';

const UserPage: React.FC = () => {
    const [users, setUsers] = useState<Array<User>>([]); // props die we declareren
    const [selectedUser, setSelectedUser] = useState<User | null>(null); // Geselecteerde gebruiker

    const getUsers = async () => {
        // functie getUsers waar we de functie gaan oproepen
        const response = await UserService.getAllUsers();
        const userData = await response.json(); // users omzetten naar JSON
        setUsers(userData); // setter gebruiken
    };

    useEffect(() => {
        getUsers(); // de call naar de backend
    }, []); // wordt nog gedetailleerder uitgelegd

    return (
        <>
            <Head>
                <title>Users</title>
            </Head>
            <Header />
            <main className="d-flex flex-column justify-content-center align-items-center">
                <h1>Users</h1>
                <section>
                    <h2>User overzicht</h2>
                    {users && <UserOverviewTable users={users} selectUser={setSelectedUser} />}
                    {/* Toon beoordelingen van de geselecteerde gebruiker */}
                    {selectedUser && (
                        <>
                            <h2>
                                Beoordelingen van {selectedUser.voornaam} {selectedUser.naam}
                            </h2>
                            <BeoordelingOverviewTable beoordelingen={selectedUser.beoordelingen} />
                        </>
                    )}
                </section>
            </main>
        </>
    );
};

export default UserPage;
