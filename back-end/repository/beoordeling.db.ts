import { Beoordeling } from '../model/beoordeling';

const beoordelingen = [
    new Beoordeling({ beoordelingId: 1, score: 8, opmerkingen: 'Goed werk', userId: 123 }),
    new Beoordeling({ beoordelingId: 2, score: 6, opmerkingen: 'Kan beter', userId: 124 }),
    new Beoordeling({ beoordelingId: 3, score: 10, opmerkingen: 'Uitstekend', userId: 125 }),
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

export default {
    getAllBeoordelingen,
    getBeoordelingById,
    createBeoordeling,
    deleteBeoordelingById,
};
