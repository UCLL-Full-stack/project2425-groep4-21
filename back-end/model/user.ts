import { Beoordeling } from './beoordeling';
import { Opdracht } from './opdracht';
import { Pand } from './pand';

export class User {
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
    private opdrachten: Opdracht[] = []; //toevoegen om user en opdracht te verbinden

    constructor(user: {
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

    equals(user: User): boolean {
        return (
            this.voornaam === user.getVoornaam() &&
            this.naam === user.getNaam() &&
            this.gebruikersnaam === user.getGebruikersnaam() &&
            this.rol === user.getRol() &&
            this.emailadres === user.getEmailadres() &&
            this.portfolio === user.getPortfolio() &&
            this.niveau === user.getNiveau() &&
            this.bevoegdheden === user.getBevoegdheden() &&
            this.beoordelingen.length === user.getBeoordelingen().length && //checken of ze evenlang zijn
            this.beoordelingen.every((beoordeling, index) =>
                beoordeling.equals(user.getBeoordelingen()[index])
            ) && //vergelijken van elke beoordeling
            this.panden.length === user.getPanden().length && //checken of ze evenlang zijn
            this.panden.every((pand, index) => pand.equals(user.getPanden()[index])) //vergelijken van elke beoordeling
        );
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
        //toegevoegd
        return this.beoordelingen;
    }

    addBeoordelingToUser(Beoordeling: Beoordeling) {
        //toegevoegd
        this.beoordelingen.push(Beoordeling);
    }

    getPanden(): Pand[] {
        //toegevoegd
        return this.panden;
    }

    addPandToUser(pand: Pand) {
        //toegevoegd
        this.panden.push(pand);
    }

    addOpdrachtToUser(opdracht: Opdracht) {
        this.opdrachten.push(opdracht); // Voeg nieuwe opdracht toe aan de user
    }

    // Getter voor de opdrachten van de user
    getOpdrachten(): Opdracht[] {
        return this.opdrachten;
    }
}
