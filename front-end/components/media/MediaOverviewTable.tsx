import React from 'react';
import { Media } from '@types';

type Props = {
    medias: Array<Media>;
};

const MediaOverviewTable: React.FC<Props> = ({ medias }: Props) => {
    return (
        <>
            {medias && (
                <table className="table table-hover">
                    <thead>
                    <tr>
                        <th scope="col">Type</th>
                        <th scope="col">Bestandslocatie</th>
                        <th scope="col">Upload Datum</th>
                        <th scope="col">Acties</th>
                    </tr>
                    </thead>
                    <tbody>
                    {medias.map((media, index) => (
                        <tr key={index}>
                            <td>{media.type}</td>
                            <td>{media.bestandslocatie}</td>
                            <td>{media.uploadDatum}</td>
                            <td>
                                <button
                                    className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded-lg shadow-sm"
                                    onClick={() => console.log(`Download media: ${media.bestandslocatie}`)}
                                >
                                    Download
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
        </>
    );
};

export default MediaOverviewTable;
