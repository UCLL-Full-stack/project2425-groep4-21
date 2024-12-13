import React from 'react';
import { Opdracht } from '@types';

type Props = {
    opdrachten: Array<Opdracht>;
    selectOpdracht: (opdracht: Opdracht) => void;
    currentUserRole: string;
};

const OpdrachtOverviewTable: React.FC<Props> = ({ opdrachten, selectOpdracht, currentUserRole }: Props) => {
    return (
        <>
            {opdrachten && (
                <table className="table table-hover">
                    <thead>
                    <tr>
                        <th scope="col">Opdrachtnummer</th>
                        <th scope="col">Datum</th>
                        {currentUserRole !== 'realtor' && (
                            <th scope="col">Puntentotaal</th>
                        )}
                        <th scope="col">Status</th>
                    </tr>
                    </thead>
                    <tbody>
                    {opdrachten.map((opdracht, index) => (
                        <tr
                            key={index}
                            onClick={() => selectOpdracht(opdracht)}
                            role="button"
                        >
                            <td>{opdracht.opdrachtnummer}</td>
                            <td>{opdracht.datum}</td>
                            {currentUserRole !== 'realtor' && (
                                <td>{opdracht.puntentotaal}</td>
                            )}
                            <td>{opdracht.status}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
        </>
    );
};

export default OpdrachtOverviewTable;
