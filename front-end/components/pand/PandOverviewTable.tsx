import React from 'react';
import { Pand } from '@types';

type Props = {
    // Props die we definiëren
    panden: Array<Pand>;
};

const PandOverviewTable: React.FC<Props> = ({ panden }: Props) => {
    // we geven hier mee dat we props hebben
    return (
        <>
            {panden && ( // inline conditie, alleen als er panden zijn wordt de tabel opgebouwd
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">Adres</th>
                            <th scope="col">Beschrijving</th>
                            <th scope="col">Makelaar ID</th>
                        </tr>
                    </thead>
                    <tbody>
                        {panden.map(
                            (
                                pand,
                                index // itereren en mappen over de panden
                            ) => (
                                <tr key={index}>
                                    {/* unieke key, index */}
                                    <td>{pand.adres}</td>
                                    <td>{pand.beschrijving}</td>
                                    <td>{pand.userIdMakelaar}</td>
                                </tr>
                            )
                        )}
                    </tbody>
                </table>
            )}
        </>
    );
};

export default PandOverviewTable;
