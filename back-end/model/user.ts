export class User {
    private voornaam: string;
    private naam: string;
    private gebruikersnaam: string;
    private rol: string;
    private emailadres: string;
    private portfolio: string;
    private niveau: string;
    private bevoegdheden: string;

    constructor(user: {
        voornaam: string;
        naam: string;
        gebruikersnaam: string;
        rol: string;
        emailadres: string;
        portfolio: string;
        niveau: string;
        bevoegdheden: string;
    }) {
        this.voornaam = user.voornaam;
        this.naam = user.naam;
        this.gebruikersnaam = user.gebruikersnaam;
        this.rol = user.rol;
        this.emailadres = user.emailadres;
        this.portfolio = user.portfolio;
        this.niveau = user.niveau;
        this.bevoegdheden = user.bevoegdheden;
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
            this.bevoegdheden === user.getBevoegdheden()
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
}
