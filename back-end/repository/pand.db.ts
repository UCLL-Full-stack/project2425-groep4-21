import { Pand } from '../model/pand';
import { Opdracht } from '../model/opdracht';
import { Media } from '../model/media';
import { Beoordeling } from '../model/beoordeling';
import database from '../util/database';

const panden = [
    new Pand({
        id: 1,
        adres: 'Main Street 123',
        beschrijving: 'Beautiful apartment in the center',
        userIdMakelaar: 456,
        opdrachten: [new Opdracht({
            opdrachtnummer: 1,
            datum: new Date(),
            // beoordeling: new Beoordeling({
            //     beoordelingId: 1,
            //     score: 9,
            //     opmerkingen: 'Good work',
            //     userId: 1,
            // }),
            puntentotaal: 95,
            status: 'Done',
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
        id: 2,
        adres: 'Baker Street 221B',
        beschrijving: 'Historical residence',
        userIdMakelaar: 789,
        opdrachten: [new Opdracht({
            opdrachtnummer: 2,
            datum: new Date(),
            // beoordeling: new Beoordeling({
            //     beoordelingId: 2,
            //     score: 10,
            //     opmerkingen: 'Good work',
            //     userId: 2,
            // }),
            puntentotaal: 100,
            status: 'In progress',
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
        id: 3,
        adres: 'Elm Street 13',
        beschrijving: 'Spacious house',
        userIdMakelaar: 333,
        opdrachten: [new Opdracht({
            opdrachtnummer: 3,
            datum: new Date(),
            // beoordeling: new Beoordeling({
            //     beoordelingId: 3,
            //     score: 7,
            //     opmerkingen: 'Ok work',
            //     userId: 3,
            // }),
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

const getAllPanden = async (): Promise<Pand[]> => {
    //async & promise omdat ge nu met een database werkt
    console.log('DATABASE_URL:', process.env.DATABASE_URL);

    const pandenPrisma = await database.pand.findMany({
        //findmany staat voor vind alles
        include: {
            user: true, //de info van pand moet er ook bij zitten
        },
    });
    return pandenPrisma.map((pandPrisma) => Pand.from(pandPrisma));
};

const getPandById = (id: number): Pand | null => {
    const pand = panden.find((p) => p.getPandId() === id);
    return pand || null;
};

const createPand = async (newPandData: any): Promise<Pand> => {
    // Transform newPandData into a Pand instance
    const newPand = new Pand({
        id: newPandData.pandId,
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




const deletePandById = (id: number): boolean => {
    const pandIndex = panden.findIndex((p) => p.getPandId() === id);
    if (pandIndex !== -1) {
        panden.splice(pandIndex, 1);
        return true;
    }
    return false;
};

// const updatePand = async (pandId: number, updatedPandData: Partial<Pand>): Promise<Pand | null> => {
//     const index = panden.findIndex((pand) => pand.getPandId() === pandId);
//     if (index === -1) {
//         return null;
//     }
//
//     const existingPand = panden[index];
//     const updatedPand = new Pand({
//         id: existingPand.getPandId(),
//         adres: updatedPandData.adres || existingPand.getAdres(),
//         beschrijving: updatedPandData.beschrijving || existingPand.getBeschrijving(),
//         userIdMakelaar: updatedPandData.userIdMakelaar || existingPand.getUserIdMakelaar(),
//         opdrachten: updatedPandData.opdrachten || existingPand.getOpdracht(),
//     });
//
//     panden[index] = updatedPand;
//     return updatedPand;
// };

export default {
    getAllPanden,
    getPandById,
    createPand,
    deletePandById,
  //  updatePand,
};
