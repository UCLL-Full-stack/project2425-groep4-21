import React from 'react';
import { Beoordeling } from '@types';

type Props = {
    beoordelingen: Array<Beoordeling>;
    currentUserRole: string;
};

const BeoordelingOverviewTable: React.FC<Props> = ({ beoordelingen, currentUserRole }: Props) => {
    return (
        <>
            {beoordelingen && (
                <table className="table table-hover">
                    <thead>
                    <tr>
                        <th scope="col">Score</th>
                        <th scope="col">Opmerkingen</th>
                        {currentUserRole !== 'realtor' && currentUserRole !== 'pilot' && (
                            <th scope="col">User ID</th>
                        )}
                    </tr>
                    </thead>
                    <tbody>
                    {beoordelingen.map((beoordeling, index) => (
                        <tr key={index}>
                            <td>{beoordeling.score}</td>
                            <td>{beoordeling.opmerkingen}</td>
                            {currentUserRole !== 'realtor' && currentUserRole !== 'pilot' && (
                                <td>{beoordeling.userId}</td>
                            )}
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
        </>
    );
};

export default BeoordelingOverviewTable;
