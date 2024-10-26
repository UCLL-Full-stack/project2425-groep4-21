export class Beoordeling {
    private beoordelingId?: number;
    public score: number;
    private opmerkingen: string;
    private userId: number;

    constructor(beoordeling: {
        beoordelingId?: number;
        score: number;
        opmerkingen: string;
        userId: number;
    }) {
        this.beoordelingId = beoordeling.beoordelingId;
        this.score = beoordeling.score;
        this.opmerkingen = beoordeling.opmerkingen;
        this.userId = beoordeling.userId;
    }

    equals(beoordeling: Beoordeling): boolean {
        return (
            this.beoordelingId === beoordeling.getBeoordelingId() &&
            this.score === beoordeling.getScore() &&
            this.opmerkingen === beoordeling.getOpmerkingen() &&
            this.userId === beoordeling.getUserId()
        );
    }

    getBeoordelingId(): number | undefined {
        return this.beoordelingId;
    }

    getScore(): number {
        return this.score;
    }

    getOpmerkingen(): string {
        return this.opmerkingen;
    }

    getUserId(): number {
        return this.userId;
    }
}
