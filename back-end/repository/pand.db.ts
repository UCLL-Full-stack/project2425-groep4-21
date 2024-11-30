import { Pand } from '../model/pand';
import { Opdracht } from '../model/opdracht';
import { Media } from '../model/media';
import { Beoordeling } from '../model/beoordeling';
import database from '../util/database';


const getAllPanden = async (): Promise<Pand[]> => {
    console.log('DATABASE_URL:', process.env.DATABASE_URL);

    const pandenPrisma = await database.pand.findMany({
        include: {
            user: true,
        },
    });
    return pandenPrisma.map((pandPrisma) => Pand.from(pandPrisma));
};

const getPandById = async (id: number): Promise<Pand | null> => {
    try {
        const pandPrisma = await database.pand.findUnique({
            where: { id: id },
            include: {
                user: true,
                opdrachten: true,
            },
        });

        if (!pandPrisma) {
            return null;
        }

        return new Pand({
            id: pandPrisma.id,
            adres: pandPrisma.adres,
            beschrijving: pandPrisma.beschrijving,
            userIdMakelaar: pandPrisma.userIdMakelaar,
            opdrachten: pandPrisma.opdrachten.map(
                (opdrachtPrisma) => new Opdracht(opdrachtPrisma)
            ),
        });
    } catch (error) {
        console.error('Error fetching Pand by ID:', error);
        return null;
    }
};

const createPand = async (newPandData: any): Promise<Pand> => {
    const newPand = new Pand({
        adres: newPandData.adres,
        beschrijving: newPandData.beschrijving,
        userIdMakelaar: newPandData.userIdMakelaar,
        opdrachten: newPandData.opdrachten?.map(
            (opdrachtData: any) =>
                new Opdracht({
                    opdrachtnummer: opdrachtData.opdrachtnummer,
                    datum: opdrachtData.datum,
                    puntentotaal: opdrachtData.puntentotaal,
                    status: opdrachtData.status,
                    medias: opdrachtData.medias?.map(
                        (mediaData: any) =>
                            new Media({
                                type: mediaData.type,
                                bestandslocatie: mediaData.bestandslocatie,
                                uploadDatum: new Date(mediaData.uploadDatum),
                                opdrachtId: opdrachtData.opdrachtnummer,
                            })
                    ),
                    realtorId: opdrachtData.realtorId,
                    pilotId: opdrachtData.pilotId,
                })
        ) || [],
    });

    const createdPandPrisma = await database.pand.create({
        data: {
            adres: newPand.getAdres(),
            beschrijving: newPand.getBeschrijving(),
            userIdMakelaar: newPand.getUserIdMakelaar(),
        },
        include: {
            user: true,
            opdrachten: true,
        },
    });

    return new Pand({
        id: createdPandPrisma.id,
        adres: createdPandPrisma.adres,
        beschrijving: createdPandPrisma.beschrijving,
        userIdMakelaar: createdPandPrisma.userIdMakelaar,
        opdrachten: createdPandPrisma.opdrachten.map(
            (opdrachtPrisma) => new Opdracht(opdrachtPrisma)
        ),
    });
};


const deletePandById = async (id: number): Promise<boolean> => {
    try {
        await database.pand.delete({
            where: { id: id },
        });
        return true;
    } catch (error) {
        console.error('Error deleting Pand:', error);
        return false;
    }
};

//TODO fix update pand problem with userIdmakelaar
const updatePand = async (pandId: number, updatedPandData: any): Promise<Pand | null> => {
    try {
        const updatedPandPrisma = await database.pand.update({
            where: { id: pandId },
            data: {
                adres: updatedPandData.adres,
                beschrijving: updatedPandData.beschrijving,
                userIdMakelaar: updatedPandData.userIdMakelaar,
            },
            include: {
                user: true,
                opdrachten: true,
            },
        });

        return new Pand({
            id: updatedPandPrisma.id,
            adres: updatedPandPrisma.adres,
            beschrijving: updatedPandPrisma.beschrijving,
            userIdMakelaar: updatedPandPrisma.userIdMakelaar,
            opdrachten: updatedPandPrisma.opdrachten.map(
                (opdrachtPrisma) => new Opdracht(opdrachtPrisma)
            ),
        });
    } catch (error) {
        console.error('Error updating Pand:', error);
        return null;
    }
};

export default {
    getAllPanden,
    getPandById,
    createPand,
    deletePandById,
   updatePand,
};
