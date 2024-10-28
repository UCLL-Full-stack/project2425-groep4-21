import React from 'react';
import { Beoordeling } from '@types';

type Props = {
    // Props die we definiëren
    beoordelingen: Array<Beoordeling>;
};

const BeoordelingOverviewTable: React.FC<Props> = ({ beoordelingen }: Props) => {
    // we geven hier mee dat we props hebben
    return (
        <>
            {beoordelingen && ( // inline conditie, alleen als er beoordelingen zijn wordt de tabel opgebouwd
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">Score</th>
                            <th scope="col">Opmerkingen</th>
                            <th scope="col">User ID</th>
                        </tr>
                    </thead>
                    <tbody>
                        {beoordelingen.map(
                            (
                                beoordeling,
                                index // itereren en mappen over de beoordelingen
                            ) => (
                                <tr key={index}>
                                    {/* unieke key, index */}
                                    <td>{beoordeling.score}</td>
                                    <td>{beoordeling.opmerkingen}</td>
                                    <td>{beoordeling.userId}</td>
                                </tr>
                            )
                        )}
                    </tbody>
                </table>
            )}
        </>
    );
};

export default BeoordelingOverviewTable;
