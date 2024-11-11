import { Beoordeling } from './beoordeling';
import { Opdracht } from './opdracht';
import { Pand } from './pand';
import { User as UserPrisma } from '@prisma/client';

export class User {
    public id: number;
    private voornaam: string;
    private naam: string;
    private gebruikersnaam: string;
    private rol: 'pilot' | 'realtor' | 'admin';
    private emailadres: string;
    private portfolio: string;
    private niveau: string;
    private bevoegdheden: string;
    private panden: Pand[] = []; // toegevoegd
    private opdrachten: Opdracht[] = [];
    public isVerified: boolean;
    beoordelingen: Beoordeling[] = [];

    constructor(user: {
        id: number;
        voornaam: string;
        naam: string;
        gebruikersnaam: string;
        rol: 'pilot' | 'realtor' | 'admin';
        emailadres: string;
        portfolio: string;
        niveau: string;
        bevoegdheden: string;
        panden?: Pand[]; //toegevoegd
        isVerified: boolean;
        beoordelingen?: Beoordeling[];
    }) {
        //this.validateInput(user);
        //this.validateBusinessRules(user);

        this.id = user.id;
        this.voornaam = user.voornaam;
        this.naam = user.naam;
        this.gebruikersnaam = user.gebruikersnaam;
        this.rol = user.rol;
        this.emailadres = user.emailadres;
        this.portfolio = user.portfolio;
        this.niveau = user.niveau;
        this.bevoegdheden = user.bevoegdheden;
        this.panden = user.panden || []; //toegevoegd
        this.isVerified = user.isVerified;
        this.beoordelingen = user.beoordelingen || [];
    }

    static from({
        id,
        voornaam,
        naam,
        gebruikersnaam,
        rol,
        emailadres,
        portfolio,
        niveau,
        bevoegdheden,
        panden = [],
        isVerified,
    }: UserPrisma & { panden?: Pand[] }) {
        return new User({
            id,
            voornaam,
            naam,
            gebruikersnaam,
            rol: rol as 'pilot' | 'realtor' | 'admin',
            emailadres,
            portfolio,
            niveau,
            bevoegdheden,
            panden,
            isVerified: isVerified ?? false,
        });
    }

    private validateInput(user: {
        id: number;
        voornaam: string;
        naam: string;
        gebruikersnaam: string;
        rol: 'pilot' | 'realtor' | 'admin';
        emailadres: string;
        portfolio: string;
        niveau: string;
        bevoegdheden: string;
        panden: Pand[];
        beoordelingen?: Beoordeling[];
    }): void {
        const {
            id,
            voornaam,
            naam,
            gebruikersnaam,
            rol,
            emailadres,
            portfolio,
            niveau,
            bevoegdheden,
            panden,
        } = user;

        if (!Number.isInteger(id) || id < 0) {
            throw new Error('User ID must be a non-negative integer.');
        }

        if (voornaam.trim().length === 0) {
            throw new Error('First name must be a non-empty string.');
        }

        if (naam.trim().length === 0) {
            throw new Error('Last name must be a non-empty string.');
        }

        if (gebruikersnaam.trim().length === 0) {
            throw new Error('Username must be a non-empty string.');
        }

        if (!['pilot', 'realtor', 'admin'].includes(rol)) {
            throw new Error('Role must be one of the following: pilot, realtor, admin.');
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailadres)) {
            throw new Error('Email must be a valid email address.');
        }

        if (portfolio.trim().length === 0) {
            throw new Error('Portfolio must be a non-empty string.');
        }

        if (niveau.trim().length === 0) {
            throw new Error('Level must be a non-empty string.');
        }

        if (bevoegdheden.trim().length === 0) {
            throw new Error('Permissions must be a non-empty string.');
        }

        if (!Array.isArray(panden) || panden.some((pand) => false)) {
            throw new Error('Properties must be a valid array of Pand instances.');
        }
    }

    private validateBusinessRules(user: {
        voornaam: string;
        naam: string;
        gebruikersnaam: string;
        niveau: string;
        panden: Pand[];
        rol: 'pilot' | 'realtor' | 'admin';
    }): void {
        const { voornaam, naam, gebruikersnaam, niveau, panden, rol } = user;

        // First name and last name should be at least 2 characters long.
        if (voornaam.trim().length < 2) {
            throw new Error('First name must be at least 2 characters long.');
        }

        if (naam.trim().length < 2) {
            throw new Error('Last name must be at least 2 characters long.');
        }

        // Username should be at least 3 characters long.
        if (gebruikersnaam.trim().length < 3) {
            throw new Error('Username must be at least 3 characters long.');
        }
    }

    // Getters
    getId(): number {
        return this.id;
    }

    getRol(): 'pilot' | 'realtor' | 'admin' {
        return this.rol;
    }

    getNiveau(): string | undefined {
        return this.niveau;
    }

    getBeoordelingen(): Beoordeling[] {
        return this.beoordelingen;
    }

    addBeoordeling(beoordeling: Beoordeling) {
        this.beoordelingen.push(beoordeling);
    }

    calculateRating(): number | undefined {
        if (this.beoordelingen.length === 0) {
            return undefined;
        }
        const totalScore = this.beoordelingen.reduce(
            (sum, beoordeling) => sum + beoordeling.getScore(),
            0
        );
        return totalScore / this.beoordelingen.length;
    }

    getVoornaam(): string {
        return this.voornaam;
    }

    getNaam(): string {
        return this.naam;
    }

    getGebruikersnaam(): string {
        return this.gebruikersnaam;
    }

    getEmailadres(): string {
        return this.emailadres;
    }

    getPortfolio(): string {
        return this.portfolio;
    }

    getBevoegdheden(): string {
        return this.bevoegdheden;
    }

    addBeoordelingToUser(beoordeling: Beoordeling) {
        this.beoordelingen.push(beoordeling);
    }

    getPanden(): Pand[] {
        return this.panden;
    }

    addPandToUser(pand: Pand) {
        this.panden.push(pand);
    }

    addOpdrachtToUser(opdracht: Opdracht) {
        this.opdrachten.push(opdracht);
    }

    getOpdrachten(): Opdracht[] {
        return this.opdrachten;
    }

    public setBeoordelingen(beoordelingen: Beoordeling[]): void {
        this.beoordelingen = beoordelingen;
    }
}
