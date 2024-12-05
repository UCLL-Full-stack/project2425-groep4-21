import { Media } from '../model/media';
import database from "../util/database";

const medias = [
    new Media({
        mediaId: 1,
        type: 'image',
        bestandslocatie: 'https://example.com/image1.jpg',
        uploadDatum: new Date(),
        opdrachtId: 1,
    }),
    new Media({
        mediaId: 2,
        type: 'video',
        bestandslocatie: 'https://example.com/video1.mp4',
        uploadDatum: new Date(),
        opdrachtId: 1,
    }),
    new Media({
        mediaId: 3,
        type: 'image',
        bestandslocatie: 'https://example.com/image2.jpg',
        uploadDatum: new Date(),
        opdrachtId: 2,
    }),
];

const getAllMedia = async (): Promise<Media[]> => {
    const mediasPrisma = await database.media.findMany();

    return mediasPrisma.map(mediaPrisma => new Media({
        mediaId: mediaPrisma.id,
        type: mediaPrisma.type,
        bestandslocatie: mediaPrisma.bestandslocatie,
        uploadDatum: mediaPrisma.uploadDatum,
        opdrachtId: mediaPrisma.opdrachtId,
    }));
};

const getMediaById = async (id: number): Promise<Media | null> => {
    const mediaPrisma = await database.media.findUnique({
        where: { id: id },
    });

    if (!mediaPrisma) {
        return null;
    }

    return new Media({
        mediaId: mediaPrisma.id,
        type: mediaPrisma.type,
        bestandslocatie: mediaPrisma.bestandslocatie,
        uploadDatum: mediaPrisma.uploadDatum,
        opdrachtId: mediaPrisma.opdrachtId,
    });
};

const createMedia = async (newMedia: Media): Promise<Media> => {
    const createdMedia = await database.media.create({
        data: {
            type: newMedia.getType(),
            bestandslocatie: newMedia.getBestandslocatie(),
            uploadDatum: newMedia.getUploadDatum(),
            opdrachtId: newMedia.getOpdrachtId(),
        },
    });

    return new Media({
        mediaId: createdMedia.id,
        type: createdMedia.type,
        bestandslocatie: createdMedia.bestandslocatie,
        uploadDatum: createdMedia.uploadDatum,
        opdrachtId: createdMedia.opdrachtId,
    });
};

const deleteMediaById = async (id: number): Promise<boolean> => {
    try {
        await database.media.delete({
            where: { id: id },
        });
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
};

const getMediaByOpdrachtId = async (opdrachtId: number): Promise<Media[]> => {
    return medias.filter((media) => media.getOpdrachtId() === opdrachtId);
};

export default {
    getAllMedia,
    getMediaById,
    createMedia,
    deleteMediaById,
    getMediaByOpdrachtId
};
