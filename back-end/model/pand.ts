import { Opdracht } from './opdracht';

export class Pand {
    // export = public, zodat de klasse Pand door de buitenwereld kan worden
    private pandId?: number;
    private adres: string;
    private beschrijving: string;
    private userIdMakelaar: number;
    private opdrachten: Opdracht[];

    constructor(pand: {
        pandId?: number;
        adres: string;
        beschrijving: string;
        userIdMakelaar: number;
        opdrachten: Opdracht[];
    }) {
        this.pandId = pand.pandId;
        this.adres = pand.adres;
        this.beschrijving = pand.beschrijving;
        this.userIdMakelaar = pand.userIdMakelaar;
        this.opdrachten = pand.opdrachten;
    }

    equals(pand: Pand): boolean {
        return (
            this.pandId === pand.getPandId() &&
            this.adres === pand.getAdres() &&
            this.beschrijving === pand.getBeschrijving() &&
            this.userIdMakelaar === pand.getUserIdMakelaar() &&
            this.opdrachten.every((opdracht, index) =>
                opdracht.equals(pand.getOpdracht()[index])
        ));
    }

    //getters
    getPandId(): number | undefined {
        return this.pandId;
    }

    getAdres(): string {
        return this.adres;
    }

    getBeschrijving(): string {
        return this.beschrijving;
    }

    getUserIdMakelaar(): number {
        return this.userIdMakelaar;
    }

    getOpdracht(): Opdracht[] {
        return this.opdrachten;
    }

    aaddOpdrachtToPand(opdracht: Opdracht) {
        this.opdrachten.push(opdracht);
    }

}
