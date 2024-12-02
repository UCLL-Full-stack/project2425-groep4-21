import { Beoordeling } from './beoordeling';
import { Media } from './media';
import { Opdracht as OpdrachtPrisma, Media as MediaPrisma } from '@prisma/client';

export class Opdracht {
    private static nextOpdrachtnummer = 1;
    private opdrachtnummer: number;
    private datum: Date;
    private puntentotaal: number;
    private status: string;
    private medias: Media[];
    private realtorId: number | null | undefined;
    private pilotId?: number | null | undefined;

    constructor(opdracht: {
        opdrachtnummer?: number;
        datum: string | Date;
        puntentotaal: number;
        status: string;
        medias?: Media[];
        realtorId?: number | null;
        pilotId?: number | null;
    }) {
        const datum = typeof opdracht.datum === 'string' ? new Date(opdracht.datum) : opdracht.datum;

        if (opdracht.opdrachtnummer !== undefined) {
            this.opdrachtnummer = opdracht.opdrachtnummer;
        } else {
            this.opdrachtnummer = Opdracht.nextOpdrachtnummer++;
        }

        const medias = opdracht.medias || [];

        this.validateBusinessRules({ ...opdracht, datum, medias });

        this.datum = datum;
        this.puntentotaal = opdracht.puntentotaal;
        this.status = opdracht.status;
        this.medias = medias;
        this.realtorId = opdracht.realtorId;
        this.pilotId = opdracht.pilotId;
    }

    static from(opdrachtPrisma: OpdrachtPrisma & { medias?: MediaPrisma[] }) {
        return new Opdracht({
            opdrachtnummer: opdrachtPrisma.opdrachtnummer,
            datum: opdrachtPrisma.datum,
            puntentotaal: opdrachtPrisma.puntentotaal,
            status: opdrachtPrisma.status,
            medias: opdrachtPrisma.medias?.map(Media.from) || [],
            realtorId: opdrachtPrisma.realtorId,
            pilotId: opdrachtPrisma.pilotId,
        });
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
            this.puntentotaal === opdracht.getPuntentotaal() &&
            this.status === opdracht.getStatus() &&
            this.medias.length === opdracht.getMedias().length &&
            this.medias.every((media, index) => media.equals(opdracht.getMedias()[index]))
        );
    }

    getOpdrachtnummer(): number | undefined {
        return this.opdrachtnummer;
    }

    getRealtorId(): number | null | undefined {
        return this.realtorId;
    }

    getPilotId(): number | null | undefined {
        return this.pilotId;
    }

    getDatum(): Date {
        return this.datum;
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

    setPilotId(pilotId: number) {
        this.pilotId = pilotId;
    }

    addMediaToOpdracht(media: Media) {
        this.medias.push(media);
    }
}
