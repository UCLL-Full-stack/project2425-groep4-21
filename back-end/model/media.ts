export class Media {
    private mediaId?: number;
    private type: string;
    private bestandslocatie: string;
    private uploadDatum: Date;
    private opdrachtId: number;

    constructor(media: { mediaId?: number; type: string; bestandslocatie: string; uploadDatum: Date; opdrachtId: number;
    }) {
        this.mediaId = media.mediaId;
        this.type = media.type;
        this.bestandslocatie = media.bestandslocatie;
        this.uploadDatum = media.uploadDatum;
        this.opdrachtId = media.opdrachtId;
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
