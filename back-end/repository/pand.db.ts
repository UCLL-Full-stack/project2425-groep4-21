import { Pand } from '../model/pand';
import { Opdracht } from '../model/opdracht';
import { Media } from '../model/media';
import { Beoordeling } from '../model/beoordeling';

const panden = [
    new Pand({
        pandId: 1,
        adres: 'Main Street 123',
        beschrijving: 'Mooi appartement in het centrum',
        userIdMakelaar: 456,
        opdrachten: [new Opdracht({
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
            realtorId: 456,
            pilotId: 1,
        })],
    }),
    new Pand({
        pandId: 2,
        adres: 'Baker Street 221B',
        beschrijving: 'Historical residence',
        userIdMakelaar: 789,
        opdrachten: [new Opdracht({
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
            realtorId: 789,
            pilotId: 2,
        })],
    }),
    new Pand({
        pandId: 3,
        adres: 'Elm Street 13',
        beschrijving: 'Spacious house',
        userIdMakelaar: 333,
        opdrachten: [new Opdracht({
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
            realtorId: 333,
            pilotId: 3,
        })],
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

const updatePand = async (pandId: number, updatedPandData: Partial<Pand>): Promise<Pand | null> => {
    const index = panden.findIndex((pand) => pand.getPandId() === pandId);
    if (index === -1) {
        return null;
    }

    const existingPand = panden[index];
    const updatedPand = new Pand({
        pandId: existingPand.getPandId(),
        adres: updatedPandData.adres || existingPand.getAdres(),
        beschrijving: updatedPandData.beschrijving || existingPand.getBeschrijving(),
        userIdMakelaar: updatedPandData.userIdMakelaar || existingPand.getUserIdMakelaar(),
        opdrachten: updatedPandData.opdrachten || existingPand.getOpdracht(),
    });

    panden[index] = updatedPand;
    return updatedPand;
};

export default {
    getAllPanden,
    getPandById,
    createPand,
    deletePandById,
    updatePand,
};
