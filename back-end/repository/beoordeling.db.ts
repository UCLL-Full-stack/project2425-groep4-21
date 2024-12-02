import { Beoordeling } from '../model/beoordeling';
import database from "../util/database";

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

const createBeoordeling = async (newBeoordeling: Beoordeling): Promise<Beoordeling> => {
    const createdBeoordeling = await database.beoordeling.create({
        data: {
            score: newBeoordeling.getScore(),
            opmerkingen: newBeoordeling.getOpmerkingen(),
            userId: newBeoordeling.getUserId(),
        },
    });

    return new Beoordeling({
        beoordelingId: createdBeoordeling.beoordelingId,
        score: createdBeoordeling.score,
        opmerkingen: createdBeoordeling.opmerkingen,
        userId: createdBeoordeling.userId,
    });
};

const deleteBeoordelingById = async (id: number): Promise<boolean> => {
    try {
        await database.beoordeling.delete({
            where: { beoordelingId: id },
        });
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
};
const getBeoordelingenByUserId = async (userId: number): Promise<Beoordeling[]> => {
    const beoordelingenPrisma = await database.beoordeling.findMany({
        where: { userId: userId },
    });

    return beoordelingenPrisma.map(beoordelingPrisma => new Beoordeling({
        beoordelingId: beoordelingPrisma.beoordelingId,
        score: beoordelingPrisma.score,
        opmerkingen: beoordelingPrisma.opmerkingen,
        userId: beoordelingPrisma.userId,
    }));
};

export default {
    getAllBeoordelingen,
    getBeoordelingById,
    createBeoordeling,
    deleteBeoordelingById,
    getBeoordelingenByUserId,
};
