// import { BeoordelingService } from '../../service/beoordeling.service';
// import { Beoordeling } from '../../model/beoordeling';
// import beoordelingDb from '../../repository/beoordeling.db';

// jest.mock('../../repository/beoordeling.db', () => ({
//     getAllBeoordelingen: jest.fn(),
//     getBeoordelingById: jest.fn(),
//     createBeoordeling: jest.fn(),
//     deleteBeoordelingById: jest.fn(),
// }));

// describe('BeoordelingService', () => {
//     test('retrieves all beoordelingen', async () => {
//         const beoordelingList = [new Beoordeling({ beoordelingId: 1, score: 9, opmerkingen: 'Goed uitgevoerd', userId: 1 })];
//         (beoordelingDb.getAllBeoordelingen as jest.Mock).mockResolvedValue(beoordelingList);

//         const result = await BeoordelingService.getBeoordelingen();
//         expect(result).toEqual(beoordelingList);
//     });

//     test('retrieves beoordeling by ID', async () => {
//         const beoordeling = new Beoordeling({ beoordelingId: 1, score: 9, opmerkingen: 'Goed uitgevoerd', userId: 1 });
//         (beoordelingDb.getBeoordelingById as jest.Mock).mockResolvedValue(beoordeling);

//         const result = await BeoordelingService.getBeoordelingById(1);
//         expect(result).toEqual(beoordeling);
//     });

//     test('throws an error if beoordeling by ID is not found', async () => {
//         (beoordelingDb.getBeoordelingById as jest.Mock).mockResolvedValue(null);

//         await expect(BeoordelingService.getBeoordelingById(1)).rejects.toThrow('Beoordeling 1 not found');
//     });

//     test('creates a new beoordeling', () => {
//         const newBeoordeling = new Beoordeling({ beoordelingId: 1, score: 9, opmerkingen: 'Goed uitgevoerd', userId: 1 });
//         (beoordelingDb.createBeoordeling as jest.Mock).mockReturnValue(newBeoordeling);

//         const result = BeoordelingService.createBeoordeling(newBeoordeling);
//         expect(result).toEqual(newBeoordeling);
//     });

//     test('deletes beoordeling by ID', () => {
//         (beoordelingDb.deleteBeoordelingById as jest.Mock).mockReturnValue(true);

//         const result = BeoordelingService.deleteBeoordelingById(1);
//         expect(result).toBe(true);
//     });
// });
