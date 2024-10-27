import { Opdracht } from '../model/opdracht';
import { Media } from '../model/media';
import { Beoordeling } from '../model/beoordeling';

const opdrachten: Opdracht[] = [
    new Opdracht({
        opdrachtnummer: 1,
        datum: new Date(),
        beoordeling: new Beoordeling({
            beoordelingId: 1,
            score: 9,
            opmerkingen: 'Goed uitgevoerd',
            userId: 1,
        }),
        puntentotaal: 95,
        status: 'Afgerond',
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
        opdrachtnummer: 2,
        datum: new Date(),
        beoordeling: new Beoordeling({
            beoordelingId: 2,
            score: 10,
            opmerkingen: 'Uitstekend',
            userId: 2,
        }),
        puntentotaal: 100,
        status: 'In Behandeling',
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
        opdrachtnummer: 3,
        datum: new Date(),
        beoordeling: new Beoordeling({
            beoordelingId: 3,
            score: 7,
            opmerkingen: 'Matig',
            userId: 3,
        }),
        puntentotaal: 70,
        status: 'Open',
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

const getAllOpdrachten = (): Opdracht[] => {
    return opdrachten;
};

const getOpdrachtById = async (id: number): Promise<Opdracht | null> => {
    const opdrachtData = opdrachten.find((o) => o.opdrachtnummer === id);
    if (opdrachtData) {
        return new Opdracht(opdrachtData);
    } else {
        return null;
    }
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
    return opdrachten.filter(opdracht => opdracht.realtorId === realtorId);
};

const getCompletedOpdrachtenByPilotId = (pilotId: number): Opdracht[] => {
    return opdrachten.filter(opdracht => opdracht.pilotId === pilotId && opdracht.status === 'Afgerond');
};

const updateOpdracht = (updatedOpdracht: Opdracht): Opdracht => {
    const index = opdrachten.findIndex((o) => o.opdrachtnummer === updatedOpdracht.getOpdrachtnummer());
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
