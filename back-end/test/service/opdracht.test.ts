import { OpdrachtService } from '../../service/opdracht.service';
import { Opdracht } from '../../model/opdracht';
import opdrachtDb from '../../repository/opdracht.db';

jest.mock('../../repository/opdracht.db', () => ({
    getAllOpdrachten: jest.fn(),
    getOpdrachtById: jest.fn(),
    createOpdracht: jest.fn(),
    deleteOpdrachtById: jest.fn(),
}));

describe('OpdrachtService', () => {
    test('retrieves all opdrachten', async () => {
        const opdrachtList = [new Opdracht({
            opdrachtnummer: 1,
            datum: new Date(),
            puntentotaal: 95,
            status: 'Pending',
            medias: [],
            realtorId: 1,
            pilotId: 1,
        })];
        (opdrachtDb.getAllOpdrachten as jest.Mock).mockResolvedValue(opdrachtList);

        const result = await OpdrachtService.getOpdrachten();
        expect(result).toEqual(opdrachtList);
    });

    test('retrieves opdracht by ID', async () => {
        const opdracht = new Opdracht({
            opdrachtnummer: 1,
            datum: new Date(),
            puntentotaal: 95,
            status: 'Pending',
            medias: [],
            realtorId: 1,
            pilotId: 1,
        });
        (opdrachtDb.getOpdrachtById as jest.Mock).mockResolvedValue(opdracht);

        const result = await OpdrachtService.getOpdrachtById(1);
        expect(result).toEqual(opdracht);
    });

    test('throws an error if opdracht by ID is not found', async () => {
        (opdrachtDb.getOpdrachtById as jest.Mock).mockResolvedValue(null);

        await expect(OpdrachtService.getOpdrachtById(1)).rejects.toThrow('Opdracht 1 not found');
    });

    test('creates a new opdracht', async () => {
        const newOpdracht = new Opdracht({
            opdrachtnummer: 1,
            datum: new Date(),
            puntentotaal: 95,
            status: 'Pending',
            medias: [],
            realtorId: 1,
            pilotId: 1,
        });
        (opdrachtDb.createOpdracht as jest.Mock).mockResolvedValue(newOpdracht);

        const result = await OpdrachtService.createOpdracht(newOpdracht);
        expect(result).toEqual(newOpdracht);
    });

    test('deletes opdracht by ID', async () => {
        (opdrachtDb.deleteOpdrachtById as jest.Mock).mockResolvedValue(true);

        const result = await OpdrachtService.deleteOpdrachtById(1);
        expect(result).toBe(true);
    });
});
