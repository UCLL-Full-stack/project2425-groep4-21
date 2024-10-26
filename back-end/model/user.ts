import { Beoordeling } from './beoordeling';
import { Opdracht } from './opdracht';
import { Pand } from './pand';

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
    private panden: Pand[];
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
        panden: Pand[];
        isVerified: boolean;
        beoordelingen?: Beoordeling[];
    }) {
        this.id = user.id;
        this.voornaam = user.voornaam;
        this.naam = user.naam;
        this.gebruikersnaam = user.gebruikersnaam;
        this.rol = user.rol;
        this.emailadres = user.emailadres;
        this.portfolio = user.portfolio;
        this.niveau = user.niveau;
        this.bevoegdheden = user.bevoegdheden;
        this.panden = user.panden;
        this.isVerified = user.isVerified;
        this.beoordelingen = user.beoordelingen || [];

    }

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
        const totalScore = this.beoordelingen.reduce((sum, beoordeling) => sum + beoordeling.getScore(), 0);
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

    addBeoordelingToUser(Beoordeling: Beoordeling) {
        this.beoordelingen.push(Beoordeling);
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
