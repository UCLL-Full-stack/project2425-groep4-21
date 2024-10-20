import { Media } from '../model/media';
import mediaDb from '../repository/media.db';

class MediaService {
    static async getMedia(): Promise<Media[]> {
        return mediaDb.getAllMedia();
    }

    static async getMediaById(id: number): Promise<Media | null> {
        const media = mediaDb.getMediaById(id);
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
}

export { MediaService };
