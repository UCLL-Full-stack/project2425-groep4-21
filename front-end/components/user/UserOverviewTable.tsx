import React from 'react';
import { User } from '@types';

type Props = {
    // Props die we definiëren
    users: Array<User>;
    selectUser: (user: User) => void; // Callback functie om geselecteerde user door te geven
};

const UserOverviewTable: React.FC<Props> = ({ users, selectUser }: Props) => {
    // we geven hier mee dat we props hebben
    return (
        <>
            {users && ( // inline conditie, alleen als er users zijn wordt de tabel opgebouwd
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
                        {users.map(
                            (
                                user,
                                index // itereren en mappen over de users
                            ) => (
                                <tr key={index} onClick={() => selectUser(user)} role="button">
                                    {/* unieke key, index, klikimplementatie user toegevoegd */}
                                    <td>{user.voornaam}</td>
                                    <td>{user.naam}</td>
                                    <td>{user.gebruikersnaam}</td>
                                    <td>{user.rol}</td>
                                    <td>{user.emailadres}</td>
                                    <td>{user.portfolio}</td>
                                    <td>{user.niveau}</td>
                                </tr>
                            )
                        )}
                    </tbody>
                </table>
            )}
        </>
    );
};

export default UserOverviewTable;
