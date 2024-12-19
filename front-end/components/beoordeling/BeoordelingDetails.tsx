import React, { useEffect, useState } from 'react';
import { Beoordeling } from '@types';

type Props = {
    beoordeling: Beoordeling;
};

const LecturerDetails: React.FC<Props> = ({ beoordeling }: Props) => {
    const [currentUserRole, setCurrentUserRole] = useState<string | null>(null);

    useEffect(() => {
        const role = sessionStorage.getItem('role');
        setCurrentUserRole(role);
    }, []);

    return (
        <>
            {beoordeling && currentUserRole && (
                <table>
                    <tbody>
                    {currentUserRole !== 'pilot' && currentUserRole !== 'realtor' && (
                        <tr>
                            <td>ID:</td>
                            <td>{beoordeling.beoordelingId}</td>
                        </tr>
                    )}
                    <tr>
                        <td>Score:</td>
                        <td>{beoordeling.score}</td>
                    </tr>
                    <tr>
                        <td>Opmerkingen:</td>
                        <td>{beoordeling.opmerkingen}</td>
                    </tr>
                    </tbody>
                </table>
            )}
        </>
    );
};

export default LecturerDetails;
