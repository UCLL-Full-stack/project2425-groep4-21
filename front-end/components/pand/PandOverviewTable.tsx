import React from 'react';
import { Pand } from '@types';

type Props = {
    panden: Array<Pand>;
};

const PandOverviewTable: React.FC<Props> = ({ panden }: Props) => {
    return (
        <>
            {panden && (
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
                                index
                            ) => (
                                <tr key={index}>
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
