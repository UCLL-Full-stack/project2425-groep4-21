import { Beoordeling } from './beoordeling';
import { Media } from './media';

export class Opdracht {
    private static nextOpdrachtnummer = 1;
    private opdrachtnummer: number;
    private datum: Date;
    // private beoordeling: Beoordeling | null;
    private puntentotaal: number;
    private status: string;
    private medias: Media[];
    private realtorId?: number;
    pilotId?: number;

    constructor(opdracht: {
        opdrachtnummer?: number;
        datum: string | Date;
        // beoordeling: Beoordeling | null;
        puntentotaal: number;
        status: string;
        medias?: Media[];
        realtorId?: number;
        pilotId?: number;
    }) {

        // Convert datum to Date object if it's a string
        const datum = typeof opdracht.datum === 'string' ? new Date(opdracht.datum) : opdracht.datum;

        if (opdracht.opdrachtnummer !== undefined) {
            this.opdrachtnummer = opdracht.opdrachtnummer;
        } else {
            this.opdrachtnummer = Opdracht.nextOpdrachtnummer++;
        }

        const medias = opdracht.medias || [];

        //this.validateInput({ ...opdracht, datum, medias });
        this.validateBusinessRules({ ...opdracht, datum, medias });

        this.datum = datum;
        // this.beoordeling = opdracht.beoordeling;
        this.puntentotaal = opdracht.puntentotaal;
        this.status = opdracht.status;
        this.medias = medias;
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

        if (medias.some((media) => false)) {
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
        const { puntentotaal, status, medias } = opdracht;

        if (puntentotaal < 0 || puntentotaal > 100) {
            throw new Error('Total points must be between 0 and 100.');
        }

        if (status === 'Completed' && medias.length === 0) {
            throw new Error('A completed assignment must have at least one media item.');
        }
    }

    equals(opdracht: Opdracht): boolean {
        return (
            this.opdrachtnummer === opdracht.getOpdrachtnummer() &&
            this.datum.getTime() === opdracht.getDatum().getTime() &&
            // this.beoordeling === opdracht.getBeoordeling() &&
            this.puntentotaal === opdracht.getPuntentotaal() &&
            this.status === opdracht.getStatus() &&
            this.medias.length === opdracht.getMedias().length &&
            this.medias.every((media, index) => media.equals(opdracht.getMedias()[index]))
        );
    }

    getOpdrachtnummer(): number | undefined {
        return this.opdrachtnummer;
    }

    getRealtorId(): number | undefined {
        return this.realtorId;
    }

    getDatum(): Date {
        return this.datum;
    }

    //getBeoordeling(): Beoordeling | null {
      //  return this.beoordeling;
    //}

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
