import { Beoordeling } from '../model/beoordeling';
import database from "../util/database";

const beoordelingen = [
    new Beoordeling({ beoordelingId: 1, score: 8, opmerkingen: 'Good work', userId: 0 }),
    new Beoordeling({ beoordelingId: 2, score: 9, opmerkingen: 'Fast and efficient', userId: 0 }),
    new Beoordeling({ beoordelingId: 3, score: 7, opmerkingen: 'Friendly service', userId: 1 }),
    new Beoordeling({ beoordelingId: 4, score: 8, opmerkingen: 'Professional', userId: 1 }),
    new Beoordeling({ beoordelingId: 5, score: 10, opmerkingen: 'Excellent', userId: 3 }),
    new Beoordeling({ beoordelingId: 6, score: 9, opmerkingen: 'Above expectations', userId: 3 }),
];

const getAllBeoordelingen = async (): Promise<Beoordeling[]> => {
    const beoordelingenPrisma = await database.beoordeling.findMany({
        include: {
            userBeoordeling: {
                include: {
                    user: true,
                },
            },
        },
    });

    return beoordelingenPrisma.map(beoordelingPrisma => new Beoordeling({
        beoordelingId: beoordelingPrisma.beoordelingId,
        score: beoordelingPrisma.score,
        opmerkingen: beoordelingPrisma.opmerkingen,
        userId: beoordelingPrisma.userId,
    }));
};



const getBeoordelingById = async (id: number): Promise<Beoordeling | null> => {
    const beoordelingPrisma = await database.beoordeling.findUnique({
        where: { beoordelingId: id },
        include: {
            userBeoordeling: {
                include: {
                    user: true,
                },
            },
        },
    });

    if (!beoordelingPrisma) {
        return null;
    }

    return new Beoordeling({
        beoordelingId: beoordelingPrisma.beoordelingId,
        score: beoordelingPrisma.score,
        opmerkingen: beoordelingPrisma.opmerkingen,
        userId: beoordelingPrisma.userBeoordeling.length > 0 ? beoordelingPrisma.userBeoordeling[0].userId : 0,
    });
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
