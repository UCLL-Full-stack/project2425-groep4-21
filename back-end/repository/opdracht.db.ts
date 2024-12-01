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



const createOpdracht = (newOpdrachtData: any): Opdracht => {
    const newOpdracht = new Opdracht(newOpdrachtData);
    opdrachten.push(newOpdracht);
    return newOpdracht;
};

const deleteOpdrachtById = (id: number): boolean => {
    const opdrachtIndex = opdrachten.findIndex((o) => o.getOpdrachtnummer() === id);
    if (opdrachtIndex !== -1) {
        opdrachten.splice(opdrachtIndex, 1);
        return true;
    }
    return false;
};

const getOpdrachtenByRealtorId = (realtorId: number): Opdracht[] => {
    return opdrachten.filter(opdracht => opdracht.getRealtorId() === realtorId);
};

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
