import { Pand } from '../model/pand';
import { Opdracht } from '../model/opdracht';
import { Media } from '../model/media';

const panden = [
    new Pand({
        pandId: 1,
        adres: 'Main Street 123',
        beschrijving: 'Mooi appartement in het centrum',
        userIdMakelaar: 456,
        opdracht: new Opdracht({
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
    }),
    new Pand({
        pandId: 2,
        adres: 'Baker Street 221B',
        beschrijving: 'Historical residence',
        userIdMakelaar: 789,
        opdracht: new Opdracht({
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
    }),
    new Pand({
        pandId: 3,
        adres: 'Elm Street 13',
        beschrijving: 'Spacious house',
        userIdMakelaar: 333,
        opdracht: new Opdracht({
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
    }),
];

const getAllPanden = (): Pand[] => {
    return panden;
};

const getPandById = (id: number): Pand | null => {
    const pand = panden.find((p) => p.getPandId() === id);
    return pand || null;
};

const createPand = (newPand: Pand): Pand => {
    panden.push(newPand);
    return newPand;
};

const deletePandById = (id: number): boolean => {
    const pandIndex = panden.findIndex((p) => p.getPandId() === id);
    if (pandIndex !== -1) {
        panden.splice(pandIndex, 1);
        return true;
    }
    return false;
};

export default {
    getAllPanden,
    getPandById,
    createPand,
    deletePandById,
};
