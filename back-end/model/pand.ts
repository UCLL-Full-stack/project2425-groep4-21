export class Pand {
    // export = public, zodat de klasse Pand door de buitenwereld kan worden
    private pandId?: number;
    private adres: string; // zoals in het labo, allemaal privates
    private beschrijving: string;
    private userIdMakelaar: number;

    constructor(pand: {
        pandId?: number;
        adres: string;
        beschrijving: string;
        userIdMakelaar: number;
    }) {
        this.pandId = pand.pandId;
        this.adres = pand.adres;
        this.beschrijving = pand.beschrijving;
        this.userIdMakelaar = pand.userIdMakelaar;
    }

    equals(pand: Pand): boolean {
        return (
            this.pandId === pand.getPandId() &&
            this.adres === pand.getAdres() &&
            this.beschrijving === pand.getBeschrijving() &&
            this.userIdMakelaar === pand.getUserIdMakelaar()
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
}
