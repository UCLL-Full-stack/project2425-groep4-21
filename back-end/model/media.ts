import { Media as MediaPrisma } from '@prisma/client';
export class Media {
    private mediaId?: number;
    private type: string;
    private bestandslocatie: string;
    private uploadDatum: Date;
    private opdrachtId: number;

    constructor(media: {
        mediaId?: number;
        type: string;
        bestandslocatie: string;
        uploadDatum: Date;
        opdrachtId: number;
    }) {
        this.validateInput(media);
        this.validateBusinessRules(media);

        this.mediaId = media.mediaId;
        this.type = media.type;
        this.bestandslocatie = media.bestandslocatie;
        this.uploadDatum = media.uploadDatum;
        this.opdrachtId = media.opdrachtId;
    }

    static from({ id, type, bestandslocatie, uploadDatum, opdrachtId }: MediaPrisma): Media {
        return new Media({
            mediaId: id,
            type,
            bestandslocatie,
            uploadDatum,
            opdrachtId,
        });
    }

    private validateInput(media: {
        type: string;
        bestandslocatie: string;
        uploadDatum: Date;
        opdrachtId: number;
    }): void {
        const { type, bestandslocatie, uploadDatum, opdrachtId } = media;

        if (type.trim().length === 0) {
            throw new Error('Type must be a non-empty string.');
        }
        if (bestandslocatie.trim().length === 0) {
            throw new Error('File location must be a non-empty string.');
        }
        if (isNaN(uploadDatum.getTime())) {
            throw new Error('Upload date must be a valid date.');
        }
        if (!Number.isInteger(opdrachtId) || opdrachtId <= 0) {
            throw new Error('Assignment ID must be a positive integer.');
        }
    }

    private validateBusinessRules(media: {
        type: string;
        bestandslocatie: string;
        uploadDatum: Date;
    }): void {
        const { type, bestandslocatie, uploadDatum } = media;

        // Allowed media types (e.g., only accept "image", "video", or "document")
        const allowedTypes = ['image', 'video', 'document'];
        if (!allowedTypes.includes(type.toLowerCase())) {
            throw new Error(`Type must be one of the following: ${allowedTypes.join(', ')}.`);
        }

        // Upload date must not be in the future
        const now = new Date();
        if (uploadDatum > now) {
            throw new Error('Upload date cannot be in the future.');
        }
    }

    equals(media: Media): boolean {
        return (
            this.type === media.getType() &&
            this.bestandslocatie === media.getBestandslocatie() &&
            this.uploadDatum.getTime() === media.getUploadDatum().getTime()
        );
    }

    getType(): string {
        return this.type;
    }

    getBestandslocatie(): string {
        return this.bestandslocatie;
    }

    getUploadDatum(): Date {
        return this.uploadDatum;
    }

    getOpdrachtId(): number {
        return this.opdrachtId;
    }
}
