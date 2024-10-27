import { Media } from '../model/media';

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

const getAllMedia = (): Media[] => {
    return medias;
};

const getMediaById = (id: number): Media | null => {
    const media = medias[id];
    return media || null;
};

const createMedia = (newMedia: Media): Media => {
    medias.push(newMedia);
    return newMedia;
};

const deleteMediaById = (id: number): boolean => {
    if (id >= 0 && id < medias.length) {
        medias.splice(id, 1);
        return true;
    }
    return false;
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
