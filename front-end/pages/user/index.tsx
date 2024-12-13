import Head from 'next/head';
import Header from '@components/header';
import UserOverviewTable from '@components/user/UserOverviewTable';
import { User } from '@types';
import useSWR from 'swr';
import UserService from '@services/userService';
import BeoordelingService from '@services/BeoordelingService';
import BeoordelingOverviewTable from '@components/beoordeling/BeoordelingOverviewTable';
import { useState } from 'react';

const fetcher = async () => {
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

    return updatedUsers;
};

const UserPage: React.FC = () => {
    const { data: users, error } = useSWR<Array<User>>('/api/users', fetcher);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);

    const loggedInUser = (typeof window !== 'undefined') ? sessionStorage.getItem('loggedInUser') : null;
    let currentRole = '';
    if (loggedInUser) {
        const parsedUser = JSON.parse(loggedInUser);
        currentRole = parsedUser.role;
    }

    if (error) return <div>Failed to load</div>;
    if (!users) return <div>Loading...</div>;

    // Filter users based on the role
    const filteredUsers = currentRole === 'realtor'
        ? users.filter(user => user.rol === 'pilot')
        : users;

    return (
        <>
            <Head>
                <title>Users</title>
            </Head>
            <Header />
            <main className="d-flex flex-column justify-content-center align-items-center">
                <section>
                    <h2>User overzicht</h2>
                    <UserOverviewTable
                        users={filteredUsers}
                        selectUser={setSelectedUser}
                        currentUserRole={currentRole}
                    />
                    {selectedUser && (
                        <>
                            <h2>Beoordelingen van {selectedUser.voornaam} {selectedUser.naam}</h2>
                            <BeoordelingOverviewTable beoordelingen={selectedUser.beoordelingen} />
                        </>
                    )}
                </section>
            </main>
        </>
    );
};

export default UserPage;
