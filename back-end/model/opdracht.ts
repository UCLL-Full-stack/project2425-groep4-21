export class Opdracht {
    private opdrachtnummer?: number;
    private datum: Date;
    private beoordeling: string;
    private puntentotaal: number;
    private status: string;

    constructor(opdracht: {
        opdrachtnummer?: number;
        datum: Date;
        beoordeling: string;
        puntentotaal: number;
        status: string;
    }) {
        this.opdrachtnummer = opdracht.opdrachtnummer;
        this.datum = opdracht.datum;
        this.beoordeling = opdracht.beoordeling;
        this.puntentotaal = opdracht.puntentotaal;
        this.status = opdracht.status;
    }

    equals(opdracht: Opdracht): boolean {
        return (
            this.opdrachtnummer === opdracht.getOpdrachtnummer() &&
            this.datum.getTime() === opdracht.getDatum().getTime() &&
            this.beoordeling === opdracht.getBeoordeling() &&
            this.puntentotaal === opdracht.getPuntentotaal() &&
            this.status === opdracht.getStatus()
        );
    }

    getOpdrachtnummer(): number | undefined {
        return this.opdrachtnummer;
    }

    getDatum(): Date {
        return this.datum;
    }

    getBeoordeling(): string {
        return this.beoordeling;
    }

    getPuntentotaal(): number {
        return this.puntentotaal;
    }

    getStatus(): string {
        return this.status;
    }
}
