// pages/users/index.tsx

import Head from 'next/head';
import Header from '@components/header';
import UserOverviewTable from '@components/user/UserOverviewTable';
import { User } from '@types';
import useSWR from 'swr';
import UserService from '@services/userService';
import BeoordelingService from '@services/BeoordelingService';
import BeoordelingOverviewTable from '@components/beoordeling/BeoordelingOverviewTable';
import { useState, useEffect } from 'react';
import StarRatingSelector from '@components/user/StarRatingSelector';

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

                    // Ensure beoordelingen is an array
                    if (!Array.isArray(beoordelingen)) {
                        throw new Error(`Beoordelingen for user ID ${user.id} is not an array.`);
                    }

                    // Calculate totalScore and averageScore
                    const totalScore = beoordelingen.reduce(
                        (sum: number, beoordeling: any) => sum + beoordeling.score,
                        0
                    );
                    const averageScore =
                        beoordelingen.length > 0 ? totalScore / beoordelingen.length : 0;

                    // Calculate starRating (1 to 5)
                    const starRating = Math.max(
                        1,
                        Math.min(5, Math.round((averageScore / 10) * 5))
                    );

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

type LoggedInUser = {
    token: string;
    username: string;
    role: string;
};

const UserPage: React.FC = () => {
    const { data: users, error } = useSWR<Array<User>>('/api/users', fetcher);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [minStarRating, setMinStarRating] = useState<number>(1);

    const [currentUserRole, setCurrentUserRole] = useState<string>('');

    const [loggedInUser, setLoggedInUser] = useState<LoggedInUser | null>(null);
    const [isLoadingUser, setIsLoadingUser] = useState(true);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const loggedInUser = sessionStorage.getItem('loggedInUser');
            if (loggedInUser) {
                const parsedUser = JSON.parse(loggedInUser);
                setCurrentUserRole(parsedUser.role);
            }
        }

        const user = sessionStorage.getItem('loggedInUser');
        if (user) {
            setLoggedInUser(JSON.parse(user));
        }
        setIsLoadingUser(false);
    }, []);


    if (error) {
        return <div>Failed to load users: {error.message}</div>;
    }
    if (!users) {
        return <div>Loading...</div>;
    }

    const filteredUsers =
        currentUserRole === 'realtor'
            ? users.filter(
                  (user) => user.rol === 'pilot' && (user.starRating ?? 1) >= minStarRating
              )
            : users;

    return (
        <>
            <Head>
                <title>Users</title>
            </Head>
            <Header />
            <main className="flex flex-col items-center p-4">
                <section className="w-full max-w-5xl mx-auto">
                    <h2 className="text-2xl font-semibold mb-4">
                        {currentUserRole === 'realtor' ? 'Piloten Overzicht' : 'User Overzicht'}
                    </h2>
                    {currentUserRole === 'realtor' && (
                        <div className="mb-6 flex items-center">
                            <label className="text-gray-700 font-medium mr-4">
                                Minimum Star Rating:
                            </label>
                            <StarRatingSelector
                                minRating={minStarRating}
                                setMinRating={setMinStarRating}
                            />
                        </div>
                    )}
                    <UserOverviewTable
                        users={filteredUsers}
                        selectUser={setSelectedUser}
                        currentUserRole={currentUserRole}
                    />
                    {selectedUser && (
                        <>
                            <h2 className="text-xl font-semibold mt-8 mb-4">
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
