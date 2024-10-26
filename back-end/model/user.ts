import { Beoordeling } from './beoordeling';
import { Opdracht } from './opdracht';
import { Pand } from './pand';

export class User {
    public id: number;
    private voornaam: string;
    private naam: string;
    private gebruikersnaam: string;
    private rol: string;
    private emailadres: string;
    private portfolio: string;
    private niveau: string;
    private bevoegdheden: string;
    private beoordelingen: Beoordeling[];
    private panden: Pand[];
    private opdrachten: Opdracht[] = [];

    constructor(user: {
        id: number;
        voornaam: string;
        naam: string;
        gebruikersnaam: string;
        rol: string;
        emailadres: string;
        portfolio: string;
        niveau: string;
        bevoegdheden: string;
        beoordelingen: Beoordeling[];
        panden: Pand[];
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
        this.beoordelingen = user.beoordelingen;
        this.panden = user.panden;
    }

    getId(): number {
        return this.id;
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

    getRol(): string {
        return this.rol;
    }

    getEmailadres(): string {
        return this.emailadres;
    }

    getPortfolio(): string {
        return this.portfolio;
    }

    getNiveau(): string {
        return this.niveau;
    }

    getBevoegdheden(): string {
        return this.bevoegdheden;
    }

    getBeoordelingen(): Beoordeling[] {
        return this.beoordelingen;
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
}
