import React from 'react';
import { Pand } from '@types';
import PandService from '@services/PandService';
import { mutate } from 'swr';

type Props = {
    panden: Array<Pand>;
    currentUserRole: string;
};

const PandOverviewTable: React.FC<Props> = ({ panden, currentUserRole }: Props) => {

    const handleDeleteClick = async (pandId: number | undefined, e: React.MouseEvent) => {
        e.stopPropagation();
        if (!pandId) {
            console.error('Pand ID is undefined');
            return;
        }
        try {
            const response = await PandService.deletePand(pandId);
            if (response.ok) {
                console.log('Pand deleted successfully');
                await mutate('/api/panden');
            } else {
                const errorData = await response.json();
                console.error('Error deleting pand:', errorData.message);
            }
        } catch (error) {
            console.error('Error deleting pand:', error);
        }
    };

    return (
        <>
            {panden && (
                <table className="table table-hover">
                    <thead>
                    <tr>
                        <th scope="col">Adres</th>
                        <th scope="col">Beschrijving</th>
                        {currentUserRole == 'realtor' && (
                            <th scope="col">Acties</th>
                        )}
                        {currentUserRole == 'admin' && (
                            <th scope="col">Makelaar</th>
                        )}
                    </tr>
                    </thead>
                    <tbody>
                    {panden.map((pand, index) => (
                        <tr key={index}>
                            <td>{pand.adres}</td>
                            <td>{pand.beschrijving}</td>
                            {currentUserRole == 'realtor' && (
                                <td>
                                    <button
                                        className="btn btn-danger"
                                        onClick={(e) => handleDeleteClick(pand.id, e)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            )}
                            {currentUserRole == 'admin' && (
                                <td>
                                    {pand.userIdMakelaar}
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

export default PandOverviewTable;
