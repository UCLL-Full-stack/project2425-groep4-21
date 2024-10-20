import { Beoordeling } from '../model/beoordeling';
import beoordelingDb from '../repository/beoordeling.db';

class BeoordelingService {
    static async getBeoordelingen(): Promise<Beoordeling[]> {
        return beoordelingDb.getAllBeoordelingen();
    }

    static async getBeoordelingById(id: number): Promise<Beoordeling | null> {
        const beoordeling = beoordelingDb.getBeoordelingById(id);
        if (!beoordeling) {
            throw new Error(`Beoordeling ${id} not found`);
        }
        return beoordeling;
    }

    static createBeoordeling(newBeoordeling: Beoordeling): Beoordeling {
        return beoordelingDb.createBeoordeling(newBeoordeling);
    }

    static deleteBeoordelingById(id: number): boolean {
        return beoordelingDb.deleteBeoordelingById(id);
    }
}

export { BeoordelingService };
