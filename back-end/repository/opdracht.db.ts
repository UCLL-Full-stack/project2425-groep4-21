import { Opdracht } from '../model/opdracht';
import { Media } from '../model/media';
import { Beoordeling } from '../model/beoordeling';
import database from "../util/database";

const opdrachten: Opdracht[] = [
    new Opdracht({
        datum: new Date(),
        puntentotaal: 95,
        status: 'Pending',
        medias: [
            new Media({
                type: 'image',
                bestandslocatie: 'https://example.com/image1.jpg',
                uploadDatum: new Date(),
                opdrachtId: 1,
            }),
        ],
        realtorId: 1,
        pilotId: 1,
    }),
    new Opdracht({
        datum: new Date(),
        puntentotaal: 100,
        status: 'In Progress',
        medias: [
            new Media({
                type: 'video',
                bestandslocatie: 'https://example.com/video1.mp4',
                uploadDatum: new Date(),
                opdrachtId: 2,
            }),
        ],
        realtorId: 2,
        pilotId: 2,
    }),
    new Opdracht({
        datum: new Date(),
        puntentotaal: 70,
        status: 'Completed',
        medias: [
            new Media({
                type: 'image',
                bestandslocatie: 'https://example.com/image2.jpg',
                uploadDatum: new Date(),
                opdrachtId: 3,
            }),
        ],
        realtorId: 3,
        pilotId: 3,
    }),
];

const getAllOpdrachten = async (): Promise<Opdracht[]> => {
    const opdrachtenPrisma = await database.opdracht.findMany({
        include: {
            medias: true,
        },
    });
    return opdrachtenPrisma.map((opdrachtPrisma) => Opdracht.from(opdrachtPrisma));
}


const getOpdrachtById = async (id: number): Promise<Opdracht | null> => {
    const opdrachtPrisma = await database.opdracht.findUnique({
        where: { opdrachtnummer: id },
        include: { medias: true },
    });

    if (!opdrachtPrisma) {
        return null;
    }

    return Opdracht.from(opdrachtPrisma);
};
const createOpdracht = async (newOpdrachtData: any): Promise<Opdracht> => {
    if (newOpdrachtData.realtorId === undefined) {
        throw new Error('realtorId is required');
    }
    if (newOpdrachtData.userId === undefined) {
        throw new Error('userId is required');
    }
    if (newOpdrachtData.pandId === undefined) {
        throw new Error('pandId is required');
    }
    if (newOpdrachtData.pilotId === undefined) {
        throw new Error('pilotId is required');
    }

    const newOpdracht = new Opdracht({
        opdrachtnummer: newOpdrachtData.opdrachtnummer,
        datum: newOpdrachtData.datum,
        puntentotaal: newOpdrachtData.puntentotaal,
        status: newOpdrachtData.status,
        medias: newOpdrachtData.medias?.map(
            (mediaData: any) =>
                new Media({
                    type: mediaData.type,
                    bestandslocatie: mediaData.bestandslocatie,
                    uploadDatum: new Date(mediaData.uploadDatum),
                    opdrachtId: newOpdrachtData.opdrachtnummer,
                })
        ),
        realtorId: newOpdrachtData.realtorId,
        pilotId: newOpdrachtData.pilotId,
    });

    const createdOpdrachtPrisma = await database.opdracht.create({
        data: {
            opdrachtnummer: newOpdracht.getOpdrachtnummer(),
            datum: newOpdracht.getDatum(),
            puntentotaal: newOpdracht.getPuntentotaal(),
            status: newOpdracht.getStatus(),
            realtorId: newOpdracht.getRealtorId()!,
            pilotId: newOpdracht.getPilotId()!,
            userId: newOpdrachtData.userId,
            pandId: newOpdrachtData.pandId,
            medias: {
                create: newOpdracht.getMedias().map((media) => ({
                    type: media.getType(),
                    bestandslocatie: media.getBestandslocatie(),
                    uploadDatum: media.getUploadDatum(),
                })),
            },
        },
        include: {
            medias: true,
        },
    });

    return new Opdracht({
        opdrachtnummer: createdOpdrachtPrisma.opdrachtnummer,
        datum: createdOpdrachtPrisma.datum,
        puntentotaal: createdOpdrachtPrisma.puntentotaal,
        status: createdOpdrachtPrisma.status,
        medias: createdOpdrachtPrisma.medias.map((mediaPrisma: any) => new Media({
            mediaId: mediaPrisma.id,
            type: mediaPrisma.type,
            bestandslocatie: mediaPrisma.bestandslocatie,
            uploadDatum: mediaPrisma.uploadDatum,
            opdrachtId: mediaPrisma.opdrachtId,
        })),
        realtorId: createdOpdrachtPrisma.realtorId,
        pilotId: createdOpdrachtPrisma.pilotId,
    });
};

const deleteOpdrachtById = async (id: number): Promise<boolean> => {
    try {
        await database.opdracht.delete({
            where: { opdrachtnummer: id },
        });
        return true;
    } catch (error) {
        console.error('Error deleting Opdracht:', error);
        return false;
    }
};

const getOpdrachtenByRealtorId = (realtorId: number): Opdracht[] => {
    return opdrachten.filter(opdracht => opdracht.getRealtorId() === realtorId);
};

//TODO: fix this
const getCompletedOpdrachtenByPilotId = async (pilotId: number): Promise<Opdracht[]> => {
    const opdrachtenPrisma = await database.opdracht.findMany({
        where: {
            pilotId: pilotId,
            status: 'Completed',
        },
        include: {
            medias: true,
        },
    });
    return opdrachtenPrisma.map((opdrachtPrisma) => Opdracht.from(opdrachtPrisma));
};
const updateOpdracht = (updatedOpdracht: Opdracht): Opdracht => {
    const index = opdrachten.findIndex((o) => o.getOpdrachtnummer() === updatedOpdracht.getOpdrachtnummer());
    if (index !== -1) {
        opdrachten[index] = updatedOpdracht;
    }
    return updatedOpdracht;
};

const getAssignmentById = async (OpdrachtId: number): Promise<Opdracht | null> => {
    const opdracht = opdrachten.find(a => a.getOpdrachtnummer() === OpdrachtId);
    return opdracht || null;
};

export default {
    getAllOpdrachten,
    getOpdrachtById,
    createOpdracht,
    deleteOpdrachtById,
    getOpdrachtenByRealtorId,
    getCompletedOpdrachtenByPilotId,
    updateOpdracht,
    getAssignmentById
};
