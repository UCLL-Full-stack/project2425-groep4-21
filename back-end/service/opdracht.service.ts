import { Opdracht } from '../model/opdracht';
import opdrachtDb from '../repository/opdracht.db';

class OpdrachtService {
    static async getOpdrachten(): Promise<Opdracht[]> {
        return opdrachtDb.getAllOpdrachten();
    }

    static async getOpdrachtById(id: number): Promise<Opdracht | null> {
        const opdracht = opdrachtDb.getOpdrachtById(id);
        if (!opdracht) {
            throw new Error(`Opdracht ${id} not found`);
        }
        return opdracht;
    }

    static createOpdracht(newOpdracht: Opdracht): Opdracht {
        return opdrachtDb.createOpdracht(newOpdracht);
    }

    static deleteOpdrachtById(id: number): boolean {
        return opdrachtDb.deleteOpdrachtById(id);
    }
}

export { OpdrachtService };
