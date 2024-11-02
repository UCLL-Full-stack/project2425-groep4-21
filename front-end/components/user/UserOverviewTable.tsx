import React from 'react';
import { User } from '@types';
import { useRouter } from 'next/router';

type Props = {
    users: Array<User>;
    selectUser: (user: User) => void;
};

const UserOverviewTable: React.FC<Props> = ({ users, selectUser }: Props) => {
    const router = useRouter();

    const handleRowClick = (user: User) => {
        console.log('Row clicked:', user);
        selectUser(user);
        if (user.rol === 'pilot' && Array.isArray(user.beoordelingen) && user.beoordelingen.length > 0) {
            const beoordelingId = user.beoordelingen[0].beoordelingId;
            console.log('Beoordeling ID:', beoordelingId);
            router.push(`/beoordeling/${beoordelingId}`);
        }
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
                    </tr>
                    </thead>
                    <tbody>
                    {users.map((user, index) => (
                        <tr key={index} onClick={() => handleRowClick(user)} role="button">
                            <td>{user.voornaam}</td>
                            <td>{user.naam}</td>
                            <td>{user.gebruikersnaam}</td>
                            <td>{user.rol}</td>
                            <td>{user.emailadres}</td>
                            <td>{user.portfolio}</td>
                            <td>{user.niveau}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
        </>
    );
};

export default UserOverviewTable;
