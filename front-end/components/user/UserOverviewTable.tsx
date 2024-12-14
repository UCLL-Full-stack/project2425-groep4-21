import React from 'react';
import { User } from '@types';
import { useRouter } from 'next/router';
import UserService from '@services/userService';
import { mutate } from 'swr';

type Props = {
    users: Array<User>;
    selectUser: (user: User) => void;
    currentUserRole: string;
};

const UserOverviewTable: React.FC<Props> = ({ users, selectUser, currentUserRole }: Props) => {
    const router = useRouter();

    const handleRowClick = (user: User) => {
        console.log('Row clicked:', user);
        selectUser(user);
        if (
            user.rol === 'pilot' &&
            Array.isArray(user.beoordelingen) &&
            user.beoordelingen.length > 0
        ) {
            const beoordelingId = user.beoordelingen[0].beoordelingId;
            console.log('Beoordeling ID:', beoordelingId);
            router.push(`/beoordeling/${beoordelingId}`);
        }
    };

    const handleBoekClick = (e: React.MouseEvent, user: User) => {
        e.stopPropagation();
        console.log('Boek knop geklikt:', user);
        router.push(`/user/boek/${user.id}`);
    };

    const handleDeleteClick = async (e: React.MouseEvent, user: User) => {
        e.stopPropagation();
        console.log('Delete button clicked:', user);
        try {
            const response = await UserService.deleteUser(user.id);
            if (response.ok) {
                console.log('User deleted successfully');
                await mutate('/api/users');
            } else {
                const errorData = await response.json();
                console.error('Error deleting user:', errorData.message);
            }
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    const handlePortfolioClick = (e: React.MouseEvent, portfolioUrl: string) => {
        e.stopPropagation();
        console.log('Portfolio button clicked:', portfolioUrl);
        window.open(portfolioUrl, '_blank', 'noopener,noreferrer');
    };

    return (
        <>
            {users && (
                <table className="table table-hover">
                    <thead>
                    <tr>
                        <th scope="col">Voornaam</th>
                        <th scope="col">Achternaam</th>
                        <th scope="col">Gebruikersnaam</th>
                        <th scope="col">Rol</th>
                        <th scope="col">Emailadres</th>
                        <th scope="col">Portfolio</th>
                        <th scope="col">Niveau</th>
                        <th scope="col">Acties</th>
                    </tr>
                    </thead>
                    <tbody>
                    {users.map((user, index) => (
                        <tr
                            key={index}
                            onClick={() => handleRowClick(user)}
                            role="button"
                            style={{ cursor: 'pointer' }}
                        >
                            <td>{user.voornaam}</td>
                            <td>{user.naam}</td>
                            <td>{user.gebruikersnaam}</td>
                            <td>{user.rol}</td>
                            <td>{user.emailadres}</td>
                            <td>
                                {user.portfolio}
                                {currentUserRole === 'realtor' && user.rol === 'pilot' && user.portfolio ? (
                                    <button
                                        className="btn btn-secondary ml-2"
                                        onClick={(e) => handlePortfolioClick(e, user.portfolio)}
                                    >
                                        View Portfolio
                                    </button>
                                ) : null}
                            </td>
                            <td>{user.niveau}</td>
                            <td>
                                {currentUserRole === 'admin' ? (
                                    <button
                                        className="btn btn-danger"
                                        onClick={(e) => handleDeleteClick(e, user)}
                                    >
                                        Delete
                                    </button>
                                ) : currentUserRole === 'realtor' && user.rol === 'pilot' ? (
                                    <button
                                        className="btn btn-primary"
                                        onClick={(e) => handleBoekClick(e, user)}
                                    >
                                        Boek
                                    </button>
                                ) : null}
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
        </>
    );
};

export default UserOverviewTable;
