export class Media {
    private type: string;
    private bestandslocatie: string;
    private uploadDatum: Date;

    constructor(media: { type: string; bestandslocatie: string; uploadDatum: Date }) {
        this.type = media.type;
        this.bestandslocatie = media.bestandslocatie;
        this.uploadDatum = media.uploadDatum;
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
}
