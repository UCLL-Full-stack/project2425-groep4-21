import { Media } from './media';

export class Opdracht {
    private opdrachtnummer?: number;
    private datum: Date;
    private beoordeling: string;
    private puntentotaal: number;
    private status: string;
    private medias: Media[]; //toevoegen om media aan opdracht te kunnen toevoegen

    constructor(opdracht: {
        opdrachtnummer?: number;
        datum: Date;
        beoordeling: string;
        puntentotaal: number;
        status: string;
        medias: Media[]; //toevoegen om media aan opdracht te kunnen toevoegen
    }) {
        this.opdrachtnummer = opdracht.opdrachtnummer;
        this.datum = opdracht.datum;
        this.beoordeling = opdracht.beoordeling;
        this.puntentotaal = opdracht.puntentotaal;
        this.status = opdracht.status;
        this.medias = opdracht.medias;
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

    getBeoordeling(): string {
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
