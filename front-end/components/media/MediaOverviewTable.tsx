import React from 'react';
import { Media } from '@types';

type Props = {
    // Props die we definiëren
    medias: Array<Media>;
};

const MediaOverviewTable: React.FC<Props> = ({ medias }: Props) => {
    // we geven hier mee dat we props hebben
    return (
        <>
            {medias && ( // inline conditie, alleen als er media items zijn wordt de tabel opgebouwd
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">Type</th>
                            <th scope="col">Bestandslocatie</th>
                            <th scope="col">Upload Datum</th>
                        </tr>
                    </thead>
                    <tbody>
                        {medias.map(
                            (
                                media,
                                index // itereren en mappen over de media items
                            ) => (
                                <tr key={index}>
                                    {/* unieke key, index */}
                                    <td>{media.type}</td>
                                    <td>{media.bestandslocatie}</td>
                                    <td>{media.uploadDatum}</td>
                                </tr>
                            )
                        )}
                    </tbody>
                </table>
            )}
        </>
    );
};

export default MediaOverviewTable;
