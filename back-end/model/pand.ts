import { Opdracht } from './opdracht';
import { User } from './user';
import { User as UserPrisma, Pand as PandPrisma } from '@prisma/client';

export class Pand {
    private id?: number;
    private adres: string;
    private beschrijving: string;
    private userIdMakelaar: number;
    private opdrachten: Opdracht[];
    private user?: User;

    constructor(pand: {
        id?: number;
        adres: string;
        beschrijving: string;
        userIdMakelaar: number;
        opdrachten: Opdracht[];
        user?: User;
    }) {
        this.validateInput(pand);
        this.validateBusinessRules(pand);

        this.id = pand.id;
        this.adres = pand.adres;
        this.beschrijving = pand.beschrijving;
        this.userIdMakelaar = pand.userIdMakelaar;
        this.opdrachten = pand.opdrachten;
        this.user = pand.user;
    }

    static from({
        id,
        adres,
        beschrijving,
        userIdMakelaar,
        user,
        opdrachten = [],
    }: PandPrisma & { user: UserPrisma; opdrachten?: Opdracht[] }) {
        return new Pand({
            id: id,
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

        if (adres.trim().length < 5) {
            throw new Error('Address must be at least 5 characters long.');
        }

        if (beschrijving.length > 1000) {
            throw new Error('Description must not exceed 1000 characters.');
        }
    }
    equals(pand: Pand): boolean {
        return (
            this.id === pand.getPandId() &&
            this.adres === pand.getAdres() &&
            this.beschrijving === pand.getBeschrijving() &&
            this.userIdMakelaar === pand.getUserIdMakelaar() &&
            this.opdrachten.length === pand.getOpdracht().length &&
            this.opdrachten.every((opdracht, index) => opdracht.equals(pand.getOpdracht()[index]))
        );
    }

    getPandId(): number | undefined {
        return this.id;
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
