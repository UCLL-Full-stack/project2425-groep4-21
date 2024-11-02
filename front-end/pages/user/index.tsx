import Head from 'next/head';
import Header from '@components/header';
import UserOverviewTable from '@components/user/UserOverviewTable';
import { User } from '@types';
import { useState, useEffect } from 'react';
import UserService from '@services/userService';
import BeoordelingService from '@services/BeoordelingService';
import BeoordelingOverviewTable from '@components/beoordeling/BeoordelingOverviewTable';

const UserPage: React.FC = () => {
    const [users, setUsers] = useState<Array<User>>([]);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);

    const fetchUsersAndBeoordelingen = async () => {
        const response = await UserService.getAllUsers();
        const userData = await response.json();

        const updatedUsers = await Promise.all(
            userData.map(async (user: User) => {
                if (user.rol === 'pilot') {
                    const beoordelingen = await BeoordelingService.getBeoordelingByPilotId(user.id);
                    return { ...user, beoordelingen };
                }
                return user;
            })
        );

        setUsers(updatedUsers);
    };

    useEffect(() => {
        fetchUsersAndBeoordelingen();
    }, []);

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