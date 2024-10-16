import { Opdracht } from './opdracht';

export class Pand {
    // export = public, zodat de klasse Pand door de buitenwereld kan worden
    private pandId?: number;
    private adres: string; // zoals in het labo, allemaal privates
    private beschrijving: string;
    private userIdMakelaar: number;
    private opdracht: Opdracht; //toevoegen

    constructor(pand: {
        pandId?: number;
        adres: string;
        beschrijving: string;
        userIdMakelaar: number;
        opdracht: Opdracht; // toevoegen
    }) {
        this.pandId = pand.pandId;
        this.adres = pand.adres;
        this.beschrijving = pand.beschrijving;
        this.userIdMakelaar = pand.userIdMakelaar;
        this.opdracht = pand.opdracht; //toevoegen
    }

    equals(pand: Pand): boolean {
        return (
            this.pandId === pand.getPandId() &&
            this.adres === pand.getAdres() &&
            this.beschrijving === pand.getBeschrijving() &&
            this.userIdMakelaar === pand.getUserIdMakelaar() &&
            this.opdracht.equals(pand.getOpdracht()) //toevoegen
        );
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

    getOpdracht(): Opdracht {
        //toevoegen
        return this.opdracht;
    }

    addOpdrachtToPand(opdracht: Opdracht) {
        //opdracht toevoegen aan pand
        //this.opdracht.push(opdracht);
        //COMMENTAAR: geen idee hoe ik dit moet implementeren, houd gij u daar maar mee bezig kheb geen zin om lang te zoeken.
        //-_-
    }
}
