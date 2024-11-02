import React from 'react';
import { Beoordeling } from '@types';

type Props = {
    beoordeling: Beoordeling;
};

const LecturerDetails: React.FC<Props> = ({ beoordeling }: Props) => {
    return (
        <>
            {beoordeling && (
                <table>
                    <tbody>
                    <tr>
                        <td>ID:</td>
                        <td>{beoordeling.beoordelingId}</td>
                    </tr>
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