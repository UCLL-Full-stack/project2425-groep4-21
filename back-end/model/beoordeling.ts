export class Beoordeling {
    private beoordelingId?: number;
    public score: number;
    private opmerkingen: string;
    public userId: number;

    constructor(beoordeling: {
        beoordelingId?: number;
        score: number;
        opmerkingen: string;
        userId: number;
    }) {
        this.validateInput(beoordeling);

        this.beoordelingId = beoordeling.beoordelingId;
        this.score = beoordeling.score;
        this.opmerkingen = beoordeling.opmerkingen;
        this.userId = beoordeling.userId;
    }

    private validateInput(beoordeling: {
        score: number;
        opmerkingen: string;
        userId: number;
    }): void {
        const { score, opmerkingen, userId } = beoordeling;

        if (isNaN(score)) {
            throw new Error('Score must be a number.');
        }
        if (score < 1 || score > 10) {
            throw new Error('Score must be between 1 and 10.');
        }
        if (opmerkingen.trim().length === 0) {
            throw new Error('Comments cannot be empty.');
        }
        if (opmerkingen.length > 500) {
            throw new Error('Comments cannot exceed 500 characters.');
        }
        if (!Number.isInteger(userId) || userId < 0) {
            throw new Error('User ID must be a non-negative integer.');
        }
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
