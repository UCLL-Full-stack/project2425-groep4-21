import { Media } from '../model/media';
import mediaDb from '../repository/media.db';
import pandDb from '../repository/pand.db';

class MediaService {
    static async getMedia(): Promise<Media[]> {
        return mediaDb.getAllMedia();
    }

    static async getMediaById(id: number): Promise<Media | null> {
        const media = await mediaDb.getMediaById(id);
        if (!media) {
            throw new Error(`Media ${id} not found`);
        }
        return media;
    }

    static createMedia(newMedia: Media): Media {
        return mediaDb.createMedia(newMedia);
    }

    static deleteMediaById(id: number): boolean {
        return mediaDb.deleteMediaById(id);
    }

    static async getMediaByPropertyId(propertyId: number): Promise<Media[] | null> {
        const pand = await pandDb.getPandById(propertyId);
        if (!pand) {
            return null;
        }

        const opdrachten = pand.getOpdracht();
        if (!opdrachten || opdrachten.length === 0) {
            return [];
        }

        const mediaList: Media[] = [];
        for (const opdracht of opdrachten) {
            const medias = opdracht.getMedias();
            if (medias && medias.length > 0) {
                mediaList.push(...medias);
            }
        }
        return mediaList;
    }
}

export { MediaService };
