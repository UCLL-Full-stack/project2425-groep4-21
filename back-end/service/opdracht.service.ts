import { Opdracht } from '../model/opdracht';
import { User } from '../model/user';
import opdrachtDb from '../repository/opdracht.db';
import userDb from '../repository/user.db';
import { Beoordeling } from '../model/beoordeling';

class OpdrachtService {
    static async getOpdrachten(): Promise<Opdracht[]> {
        return opdrachtDb.getAllOpdrachten();
    }

    static async getOpdrachtById(id: number): Promise<Opdracht | null> {
        if (isNaN(id)) {
            throw new Error('Invalid ID');
        }
        const opdracht = await opdrachtDb.getOpdrachtById(id);
        if (!opdracht) {
            throw new Error(`Opdracht ${id} not found`);
        }
        return opdracht;
    }

    static async createOpdracht(newOpdracht: Opdracht): Promise<Opdracht> {
        return await opdrachtDb.createOpdracht(newOpdracht);
    }

    static async deleteOpdrachtById(id: number): Promise<boolean> {
        return await opdrachtDb.deleteOpdrachtById(id);
    }

    static async updateOpdrachtStatus(id: number, status: string): Promise<Opdracht | null> {
        const opdracht = await this.getOpdrachtById(id);
        if (!opdracht) {
            throw new Error(`Opdracht ${id} not found`);
        }
        opdracht.setStatus(status);
        return opdrachtDb.updateOpdracht(opdracht);
    }

    static async bookDronePilot(details: { pilotId: number, opdrachtnummer: number }): Promise<Opdracht> {
        const { pilotId, opdrachtnummer } = details;
        const opdracht = await this.getOpdrachtById(opdrachtnummer);
        if (!opdracht) {
            throw new Error(`Opdracht ${opdrachtnummer} not found`);
        }
        opdracht.setPilotId(pilotId);
        return opdrachtDb.updateOpdracht(opdracht);
    }

}

export { OpdrachtService };
