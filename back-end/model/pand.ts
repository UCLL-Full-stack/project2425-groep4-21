import { Opdracht } from './opdracht';
import { User } from './user';
import { User as UserPrisma, Pand as PandPrisma } from '@prisma/client';

export class Pand {
    public pandId?: number;
    public adres: string;
    public beschrijving: string;
    public userIdMakelaar: number;
    public opdrachten: Opdracht[];
    public user?: User; //toegevoegd

    constructor(pand: {
        pandId?: number;
        adres: string;
        beschrijving: string;
        userIdMakelaar: number;
        opdrachten: Opdracht[];
        user?: User; //toegevoegd
    }) {
        this.validateInput(pand);
        this.validateBusinessRules(pand);

        this.pandId = pand.pandId;
        this.adres = pand.adres;
        this.beschrijving = pand.beschrijving;
        this.userIdMakelaar = pand.userIdMakelaar;
        this.opdrachten = pand.opdrachten;
        this.user = pand.user;
    }

    static from({
        pandId,
        adres,
        beschrijving,
        userIdMakelaar,
        user,
        opdrachten = [], // Voeg 'opdrachten' toe met een default lege array
    }: PandPrisma & { user: UserPrisma; opdrachten?: Opdracht[] }) {
        return new Pand({
            pandId,
            adres,
            beschrijving,
            userIdMakelaar,
            user: User.from({ ...user, panden: [] }),
            opdrachten,
        });
    }

    private validateInput(pand: {
        adres: string;
        beschrijving: string;
        userIdMakelaar: number;
        opdrachten: Opdracht[];
    }): void {
        const { adres, beschrijving, userIdMakelaar, opdrachten } = pand;

        if (adres.trim().length === 0) {
            throw new Error('Address must be a non-empty string.');
        }

        if (beschrijving.trim().length === 0) {
            throw new Error('Description must be a non-empty string.');
        }

        if (!Number.isInteger(userIdMakelaar) || userIdMakelaar <= 0) {
            throw new Error('Realtor ID must be a positive integer.');
        }

        if (!Array.isArray(opdrachten) || opdrachten.some((opdracht) => false)) {
            throw new Error('Assignments must be a valid array of Opdracht instances.');
        }
    }

    private validateBusinessRules(pand: {
        adres: string;
        beschrijving: string;
        opdrachten: Opdracht[];
    }): void {
        const { adres, beschrijving, opdrachten } = pand;

        // Address must be at least 5 characters long.
        if (adres.trim().length < 5) {
            throw new Error('Address must be at least 5 characters long.');
        }

        //  Description should not exceed 1000 characters.
        if (beschrijving.length > 1000) {
            throw new Error('Description must not exceed 1000 characters.');
        }
    }
    equals(pand: Pand): boolean {
        return (
            this.pandId === pand.getPandId() &&
            this.adres === pand.getAdres() &&
            this.beschrijving === pand.getBeschrijving() &&
            this.userIdMakelaar === pand.getUserIdMakelaar() &&
            this.opdrachten.length === pand.getOpdracht().length &&
            this.opdrachten.every((opdracht, index) => opdracht.equals(pand.getOpdracht()[index]))
        );
    }

    // Getters
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

    addOpdrachtToPand(opdracht: Opdracht) {
        this.opdrachten.push(opdracht);
    }

    setAdres(adres: string): void {
        this.adres = adres;
    }

    setBeschrijving(beschrijving: string): void {
        this.beschrijving = beschrijving;
    }
}
