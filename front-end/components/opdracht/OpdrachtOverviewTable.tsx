import React from 'react';
import { Opdracht } from '@types';

type Props = {
    // Props die we definiëren
    opdrachten: Array<Opdracht>;
    selectOpdracht: (opdracht: Opdracht) => void; // Callback functie om een opdracht te selecteren
};

const OpdrachtOverviewTable: React.FC<Props> = ({ opdrachten, selectOpdracht }: Props) => {
    // we geven hier mee dat we props hebben
    return (
        <>
            {opdrachten && ( // inline conditie, alleen als er opdrachten zijn wordt de tabel opgebouwd
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">Opdrachtnummer</th>
                            <th scope="col">Datum</th>
                            <th scope="col">Puntentotaal</th>
                            <th scope="col">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {opdrachten.map(
                            (
                                opdracht,
                                index // itereren en mappen over de opdrachten
                            ) => (
                                <tr
                                    key={index}
                                    onClick={() => selectOpdracht(opdracht)}
                                    role="button"
                                >
                                    {/* unieke key, index & dan ook nog klik implementatie */}
                                    <td>{opdracht.opdrachtnummer}</td>
                                    <td>{opdracht.datum}</td>
                                    <td>{opdracht.puntentotaal}</td>
                                    <td>{opdracht.status}</td>
                                </tr>
                            )
                        )}
                    </tbody>
                </table>
            )}
        </>
    );
};

export default OpdrachtOverviewTable;
