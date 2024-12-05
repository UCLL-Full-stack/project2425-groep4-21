import { Media } from '../model/media';
import database from "../util/database";

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
    const mediasPrisma = await database.media.findMany({
        where: { opdrachtId: opdrachtId },
    });

    return mediasPrisma.map(mediaPrisma => new Media({
        mediaId: mediaPrisma.id,
        type: mediaPrisma.type,
        bestandslocatie: mediaPrisma.bestandslocatie,
        uploadDatum: mediaPrisma.uploadDatum,
        opdrachtId: mediaPrisma.opdrachtId,
    }));
};

export default {
    getAllMedia,
    getMediaById,
    createMedia,
    deleteMediaById,
    getMediaByOpdrachtId
};
