import { Beoordeling } from './beoordeling';
import { Media } from './media';


export class Opdracht {
    private static nextOpdrachtnummer = 1;
    public opdrachtnummer: number;
    public datum: Date;
    public beoordeling: Beoordeling | null;
    public puntentotaal: number;
    public status: string;
    public medias: Media[];
    public realtorId?: number;
    public pilotId?: number;

    constructor(opdracht: {
        opdrachtnummer?: number;
        datum: string | Date;
        beoordeling: Beoordeling | null;
        puntentotaal: number;
        status: string;
        medias: Media[];
        realtorId?: number;
        pilotId?: number;
    }) {
        // Convert datum to Date object if it's a string
        const datum = typeof opdracht.datum === 'string' ? new Date(opdracht.datum) : opdracht.datum;

        // Geeft opdrachtnummer
        if (opdracht.opdrachtnummer !== undefined) {
            this.opdrachtnummer = opdracht.opdrachtnummer;
        } else {
            this.opdrachtnummer = Opdracht.nextOpdrachtnummer++;
        }

        this.validateInput({ ...opdracht, datum });
        this.validateBusinessRules({ ...opdracht, datum });

        this.datum = datum;
        this.beoordeling = opdracht.beoordeling;
        this.puntentotaal = opdracht.puntentotaal;
        this.status = opdracht.status;
        this.medias = opdracht.medias;
        this.realtorId = opdracht.realtorId;
        this.pilotId = opdracht.pilotId;
    }

    private validateInput(opdracht: {
        datum: Date;
        beoordeling: Beoordeling | null;
        puntentotaal: number;
        status: string;
        medias: Media[];
        realtorId?: number;
        pilotId?: number;
    }): void {
        const { datum, beoordeling, puntentotaal, status, medias, realtorId, pilotId } = opdracht;

        if (isNaN(datum.getTime())) {
            throw new Error('Date must be a valid date.');
        }

        if (isNaN(puntentotaal)) {
            throw new Error('Total points must be a valid number.');
        }

        if (status.trim().length === 0) {
            throw new Error('Status must be a non-empty string.');
        }

        if (!Array.isArray(medias) || medias.some(media => false)) {
            throw new Error('Media must be a valid array of Media instances.');
        }

        if (realtorId !== undefined && (!Number.isInteger(realtorId) || realtorId < 0)) {
            throw new Error('Realtor ID, if provided, must be zero or a positive integer.');
        }

        if (pilotId !== undefined && (!Number.isInteger(pilotId) || pilotId < 0)) {
            throw new Error('Pilot ID, if provided, must be zero or a positive integer.');
        }
    }

    private validateBusinessRules(opdracht: {
        datum: Date;
        status: string;
        puntentotaal: number;
        medias: Media[];
    }): void {
        const { datum, status, puntentotaal, medias } = opdracht;

        // Total points must be between 0 and 100.
        if (puntentotaal < 0 || puntentotaal > 100) {
            throw new Error('Total points must be between 0 and 100.');
        }

        // A completed status requires at least one media item.
        if (status === 'Completed' && medias.length === 0) {
            throw new Error('A completed assignment must have at least one media item.');
        }
    }

    equals(opdracht: Opdracht): boolean {
        return (
            this.opdrachtnummer === opdracht.getOpdrachtnummer() &&
            this.datum.getTime() === opdracht.getDatum().getTime() &&
            this.beoordeling === opdracht.getBeoordeling() &&
            this.puntentotaal === opdracht.getPuntentotaal() &&
            this.status === opdracht.getStatus() &&
            this.medias.length === opdracht.getMedias().length &&
            this.medias.every((media, index) => media.equals(opdracht.getMedias()[index]))
        );
    }

    getOpdrachtnummer(): number | undefined {
        return this.opdrachtnummer;
    }

    getDatum(): Date {
        return this.datum;
    }

    getBeoordeling(): Beoordeling | null {
        return this.beoordeling;
    }

    getPuntentotaal(): number {
        return this.puntentotaal;
    }

    getStatus(): string {
        return this.status;
    }

    getMedias(): Media[] {
        return this.medias;
    }

    addMediaToOpdracht(media: Media) {
        this.medias.push(media);
    }
}
