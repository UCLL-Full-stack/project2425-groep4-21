import { Pand } from '../model/pand';
import pandDb from '../repository/pand.db';

class PandService {
    static async getPanden(): Promise<Pand[]> {
        return pandDb.getAllPanden();
    }

    // static async getPandById(id: number): Promise<Pand | null> {
    //     const pand = await pandDb.getPandById(id);
    //     if (!pand) {
    //         throw new Error(`Pand ${id} not found`);
    //     }
    //     return pand;
    // }

    // static async createPand(newPand: Pand): Promise<Pand> {
    //     return pandDb.createPand(newPand);
    // }

    // static async deletePandById(id: number): Promise<boolean> {
    //     return pandDb.deletePandById(id);
    // }

    // static async updatePand(pandId: number, updatedPandData: Partial<Pand>): Promise<Pand | null> {
    //     const existingPand = await pandDb.getPandById(pandId);
    //     if (!existingPand) {
    //         return null;
    //     }

    //     return await pandDb.updatePand(pandId, updatedPandData);
    // }
}

export { PandService };
