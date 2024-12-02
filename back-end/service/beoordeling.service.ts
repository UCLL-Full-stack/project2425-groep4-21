import { Beoordeling } from '../model/beoordeling';
import beoordelingDb from '../repository/beoordeling.db';
import userDb from '../repository/user.db';

class BeoordelingService {
    static async getBeoordelingen(): Promise<Beoordeling[]> {
        return beoordelingDb.getAllBeoordelingen();
    }

    static async getBeoordelingById(id: number): Promise<Beoordeling | null> {
        const beoordeling = await beoordelingDb.getBeoordelingById(id);
        if (!beoordeling) {
            throw new Error(`Beoordeling ${id} not found`);
        }
        return beoordeling;
    }

    static createBeoordeling(newBeoordeling: Beoordeling): Beoordeling {
        return beoordelingDb.createBeoordeling(newBeoordeling);
    }

    static async deleteBeoordelingById(id: number): Promise<boolean> {
        return await beoordelingDb.deleteBeoordelingById(id);
    }

    static async getBeoordelingenByPilotId(pilotId: number): Promise<Beoordeling[]> {
        const pilot = userDb.getUserById(pilotId);
        if (!pilot || pilot.getRol() !== 'pilot') {
            throw new Error('Piloot niet gevonden');
        }

        return await beoordelingDb.getBeoordelingenByUserId(pilotId);
    }
}

export { BeoordelingService };
