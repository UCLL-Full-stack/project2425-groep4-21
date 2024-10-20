import { Opdracht } from '../model/opdracht';
import { Media } from '../model/media';

const opdrachten = [
    new Opdracht({
        opdrachtnummer: 1,
        datum: new Date(),
        beoordeling: 'Goed uitgevoerd',
        puntentotaal: 95,
        status: 'Afgerond',
        medias: [
            new Media({
                type: 'image',
                bestandslocatie: 'https://example.com/image1.jpg',
                uploadDatum: new Date(),
            }),
        ],
    }),
    new Opdracht({
        opdrachtnummer: 2,
        datum: new Date(),
        beoordeling: 'Uitstekend',
        puntentotaal: 100,
        status: 'In Behandeling',
        medias: [
            new Media({
                type: 'video',
                bestandslocatie: 'https://example.com/video1.mp4',
                uploadDatum: new Date(),
            }),
        ],
    }),
    new Opdracht({
        opdrachtnummer: 3,
        datum: new Date(),
        beoordeling: 'Matig',
        puntentotaal: 70,
        status: 'Open',
        medias: [
            new Media({
                type: 'image',
                bestandslocatie: 'https://example.com/image2.jpg',
                uploadDatum: new Date(),
            }),
        ],
    }),
];

const getAllOpdrachten = (): Opdracht[] => {
    return opdrachten;
};

const getOpdrachtById = (id: number): Opdracht | null => {
    const opdracht = opdrachten.find((o) => o.getOpdrachtnummer() === id);
    return opdracht || null;
};

const createOpdracht = (newOpdracht: Opdracht): Opdracht => {
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

export default {
    getAllOpdrachten,
    getOpdrachtById,
    createOpdracht,
    deleteOpdrachtById,
};
