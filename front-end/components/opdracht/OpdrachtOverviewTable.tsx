import React from 'react';
import { Opdracht } from '@types';

type Props = {
    opdrachten: Array<Opdracht>;
    selectOpdracht: (opdracht: Opdracht) => void;
    currentUserRole: string;
    closeOpdracht: (opdrachtId: number) => void;
};

const OpdrachtOverviewTable: React.FC<Props> = ({ opdrachten, selectOpdracht, currentUserRole, closeOpdracht }: Props) => {
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
                        {currentUserRole === 'pilot' && (
                            <th scope="col">Acties</th>
                        )}
                    </tr>
                    </thead>
                    <tbody>
                    {opdrachten.map((opdracht) => (
                        <tr
                            key={opdracht.opdrachtnummer}
                            onClick={() => selectOpdracht(opdracht)}
                            role="button"
                            className="hover:bg-gray-100 cursor-pointer"
                        >
                            <td>{opdracht.opdrachtnummer}</td>
                            <td>{opdracht.datum}</td>
                            {currentUserRole !== 'realtor' && (
                                <td>{opdracht.puntentotaal}</td>
                            )}
                            <td>{opdracht.status}</td>
                            {currentUserRole === 'pilot' && opdracht.status === 'Open' && (
                                <td>
                                    <button
                                        className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            if (opdracht.opdrachtnummer !== undefined) closeOpdracht(opdracht.opdrachtnummer);
                                        }}
                                    >
                                        Sluit opdracht
                                    </button>
                                </td>
                            )}
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
        </>
    );
};

export default OpdrachtOverviewTable;
