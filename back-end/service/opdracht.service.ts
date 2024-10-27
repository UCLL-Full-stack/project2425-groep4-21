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

    static createOpdracht(newOpdracht: Opdracht): Opdracht {
        return opdrachtDb.createOpdracht(newOpdracht);
    }

    static deleteOpdrachtById(id: number): boolean {
        return opdrachtDb.deleteOpdrachtById(id);
    }

    static async bookDronePilot(details: { pilotId: number, opdrachtnummer: number }): Promise<Opdracht> {
        const { pilotId, opdrachtnummer } = details;
        const opdracht = await this.getOpdrachtById(opdrachtnummer);
        if (!opdracht) {
            throw new Error(`Opdracht ${opdrachtnummer} not found`);
        }
        opdracht.pilotId = pilotId;
        return opdrachtDb.updateOpdracht(opdracht);
    }

    static async filterPilotsByRating(rating: number): Promise<User[]> {
        return userDb.getUsersByRoleAndRating('pilot', rating);
    }

    static async getHiredPilots(realtorId: number): Promise<User[]> {
        const opdrachten = await opdrachtDb.getOpdrachtenByRealtorId(realtorId);
        const pilotIds = opdrachten.map(opdracht => opdracht.pilotId).filter((id): id is number => id !== undefined);
        return userDb.getUsersByIdsAndRole(pilotIds, 'pilot');
    }

    static async getCompletedAssignments(pilotId: number): Promise<Opdracht[]> {
        return opdrachtDb.getCompletedOpdrachtenByPilotId(pilotId);
    }

    static async getBeoordelingByAssignmentId(assignmentId: number): Promise<string | null> {
        const assignment = await opdrachtDb.getAssignmentById(assignmentId);
        if (!assignment) {
            throw new Error('Opdracht niet gevonden');
        }

        const beoordeling = assignment.getBeoordeling();
        if (beoordeling) {
            return beoordeling.getOpmerkingen();
        } else {
            return null;
        }
    }

}

export { OpdrachtService };