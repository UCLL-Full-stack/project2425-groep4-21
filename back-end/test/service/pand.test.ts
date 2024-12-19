import { PandService } from '../../service/pand.service';
import { Pand } from '../../model/pand';
import pandDb from '../../repository/pand.db';

jest.mock('../../repository/pand.db', () => ({
    getAllPanden: jest.fn(),
    getPandById: jest.fn(),
    createPand: jest.fn(),
    deletePandById: jest.fn(),
}));

describe('PandService', () => {
    test('retrieves all panden', async () => {
        const pandList = [new Pand({
            adres: 'Example Street 1',
            beschrijving: 'A beautiful house',
            userIdMakelaar: 1,
            opdrachten: []
        })];
        (pandDb.getAllPanden as jest.Mock).mockResolvedValue(pandList);

        const result = await PandService.getPanden();
        expect(result).toEqual(pandList);
    });

    test('retrieves pand by ID', async () => {
        const pand = new Pand({
            adres: 'Example Street 1',
            beschrijving: 'A beautiful house',
            userIdMakelaar: 1,
            opdrachten: []
        });
        (pandDb.getPandById as jest.Mock).mockResolvedValue(pand);

        const result = await PandService.getPandById(1);
        expect(result).toEqual(pand);
    });

    test('throws an error if pand by ID is not found', async () => {
        (pandDb.getPandById as jest.Mock).mockResolvedValue(null);

        await expect(PandService.getPandById(1)).rejects.toThrow('Pand 1 not found');
    });

    test('creates a new pand', async () => {
        const newPand = new Pand({
            adres: 'Example Street 1',
            beschrijving: 'A beautiful house',
            userIdMakelaar: 1,
            opdrachten: []
        });
        (pandDb.createPand as jest.Mock).mockResolvedValue(newPand);

        const result = await PandService.createPand(newPand);
        expect(result).toEqual(newPand);
    });

    test('deletes pand by ID', async () => {
        (pandDb.deletePandById as jest.Mock).mockResolvedValue(true);

        const result = await PandService.deletePandById(1);
        expect(result).toBe(true);
    });
});
