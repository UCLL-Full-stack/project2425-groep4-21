import { Beoordeling } from '../model/beoordeling';

const beoordelingen = [
    new Beoordeling({ beoordelingId: 1, score: 8, opmerkingen: 'Good work', userId: 0 }),
    new Beoordeling({ beoordelingId: 2, score: 9, opmerkingen: 'Fast and efficient', userId: 0 }),
    new Beoordeling({ beoordelingId: 3, score: 7, opmerkingen: 'Friendly service', userId: 1 }),
    new Beoordeling({ beoordelingId: 4, score: 8, opmerkingen: 'Professional', userId: 1 }),
    new Beoordeling({ beoordelingId: 5, score: 10, opmerkingen: 'Excellent', userId: 3 }),
    new Beoordeling({ beoordelingId: 6, score: 9, opmerkingen: 'Above expectations', userId: 3 }),
];

const getAllBeoordelingen = (): Beoordeling[] => {
    return beoordelingen;
};

const getBeoordelingById = (id: number): Beoordeling | null => {
    const beoordeling = beoordelingen.find((b) => b.getBeoordelingId() === id);
    return beoordeling || null;
};

const createBeoordeling = (newBeoordeling: Beoordeling): Beoordeling => {
    beoordelingen.push(newBeoordeling);
    return newBeoordeling;
};

const deleteBeoordelingById = (id: number): boolean => {
    const beoordelingIndex = beoordelingen.findIndex((b) => b.getBeoordelingId() === id);
    if (beoordelingIndex !== -1) {
        beoordelingen.splice(beoordelingIndex, 1);
        return true;
    }
    return false;
};

const getBeoordelingenByUserId = async (userId: number): Promise<Beoordeling[]> => {
    return beoordelingen.filter(beoordeling => beoordeling.getUserId() === userId);
};

export default {
    getAllBeoordelingen,
    getBeoordelingById,
    createBeoordeling,
    deleteBeoordelingById,
    getBeoordelingenByUserId,
};
