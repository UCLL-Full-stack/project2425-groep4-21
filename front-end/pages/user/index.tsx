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
    try {
        const response = await UserService.getAllUsers();
        if (!response.ok) {
            throw new Error(`Failed to fetch users: ${response.statusText}`);
        }
        const userData = await response.json();

        const updatedUsers = await Promise.all(
            userData.map(async (user: User) => {
                if (user.rol === 'pilot') {
                    const beoordelingen = await BeoordelingService.getBeoordelingByPilotId(user.id);

                    if (!Array.isArray(beoordelingen)) {
                        throw new Error(`Beoordelingen for user ID ${user.id} is not an array.`);
                    }

                    const totalScore = beoordelingen.reduce((sum: number, beoordeling: any) => sum + beoordeling.score, 0);
                    const averageScore = totalScore / beoordelingen.length;
                    const starRating = Math.max(1, Math.min(5, Math.round((averageScore / 10) * 5)));

                    return { ...user, beoordelingen, starRating };
                }
                return user;
            })
        );

        return updatedUsers;
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    }
};

const UserPage: React.FC = () => {
    const { data: users, error } = useSWR<Array<User>>('/api/users', fetcher);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [minStarRating, setMinStarRating] = useState<number>(1);

    const loggedInUser = (typeof window !== 'undefined') ? sessionStorage.getItem('loggedInUser') : null;
    let currentRole = '';
    if (loggedInUser) {
        const parsedUser = JSON.parse(loggedInUser);
        currentRole = parsedUser.role;
    }

    if (error) return <div>Failed to load</div>;
    if (!users) return <div>Loading...</div>;

    const filteredUsers = currentRole === 'realtor'
        ? users.filter(user => user.rol === 'pilot' && (user.starRating ?? 1) >= minStarRating)
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
                    <label>
                        Minimum Star Rating:
                        <select value={minStarRating} onChange={(e) => setMinStarRating(Number(e.target.value))}>
                            <option value={1}>1 Star</option>
                            <option value={2}>2 Stars</option>
                            <option value={3}>3 Stars</option>
                            <option value={4}>4 Stars</option>
                            <option value={5}>5 Stars</option>
                        </select>
                    </label>
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
