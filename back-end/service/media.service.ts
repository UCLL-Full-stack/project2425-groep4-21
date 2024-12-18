import { Media } from '../model/media';
import mediaDb from '../repository/media.db';
import pandDb from '../repository/pand.db';
import {OpdrachtService} from "./opdracht.service";

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

    static async createMedia(newMedia: Media): Promise<Media> {
        const opdracht_id = newMedia.getOpdrachtId();

        if (opdracht_id === undefined || opdracht_id === null) {
            throw new Error('opdrachtId is required.');
        }

        const opdracht = await OpdrachtService.getOpdrachtById(opdracht_id);
        if (!opdracht) {
            throw new Error(`Opdracht with ID ${opdracht_id} does not exist.`);
        }

        return await mediaDb.createMedia(newMedia);
    }

    static async deleteMediaById(id: number): Promise<boolean> {
        return await mediaDb.deleteMediaById(id);
    }

}

export { MediaService };
