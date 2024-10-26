import { Media } from './media';
import { Beoordeling } from './beoordeling';

export class Opdracht {
    opdrachtnummer?: number;
    public datum: Date;
    public beoordeling: Beoordeling | null;
    public puntentotaal: number;
    public status: string;
    public medias: Media[]; //toevoegen om media aan opdracht te kunnen toevoegen
    public realtorId: number;
    public pilotId?: number;

    constructor(opdracht: {
        opdrachtnummer?: number;
        datum: Date;
        beoordeling: Beoordeling | null;
        puntentotaal: number;
        status: string;
        medias: Media[]; //toevoegen om media aan opdracht te kunnen toevoegen
        realtorId: number;
        pilotId?: number;
    }) {
        this.opdrachtnummer = opdracht.opdrachtnummer;
        this.datum = opdracht.datum;
        this.beoordeling = opdracht.beoordeling;
        this.puntentotaal = opdracht.puntentotaal;
        this.status = opdracht.status;
        this.medias = opdracht.medias;
        this.realtorId = opdracht.realtorId;
        this.pilotId = opdracht.pilotId;
    }

    equals(opdracht: Opdracht): boolean {
        return (
            this.opdrachtnummer === opdracht.getOpdrachtnummer() &&
            this.datum.getTime() === opdracht.getDatum().getTime() &&
            this.beoordeling === opdracht.getBeoordeling() &&
            this.puntentotaal === opdracht.getPuntentotaal() &&
            this.status === opdracht.getStatus() &&
            this.medias.length === opdracht.getMedias().length && //checken of ze evenlang zijn
            this.medias.every((media, index) => media.equals(opdracht.getMedias()[index])) //vergelijken van elke media
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
        //alle bijhorende medias krijgen
        return this.medias;
    }

    addMediaToOpdracht(media: Media) {
        //media toevoegen aan opdracht
        this.medias.push(media);
    }
}
