import { Pand } from '../../model/pand';
import { Opdracht } from '../../model/opdracht';
import { Media } from '../../model/media';

// Dummy data
const opdracht = new Opdracht({
    opdrachtnummer: 101,
    datum: new Date(),
    beoordeling: 'Goed uitgevoerd',
    puntentotaal: 95,
    status: 'Afgerond',
    medias: [
        new Media({
            type: 'video',
            bestandslocatie: 'https://example.com/video.mp4',
            uploadDatum: new Date(),
        }),
    ],
});

// Pand tests

test('given: valid pand data, when: pand is created, then: pand has the correct properties', () => {
    // given
    const pandData = {
        pandId: 101,
        adres: 'Main Street 123',
        beschrijving: 'Mooi appartement in het centrum',
        userIdMakelaar: 456,
        opdracht,
    };

    // when
    const pand = new Pand(pandData);

    // then
    expect(pand.getPandId()).toEqual(pandData.pandId);
    expect(pand.getAdres()).toEqual(pandData.adres);
    expect(pand.getBeschrijving()).toEqual(pandData.beschrijving);
    expect(pand.getUserIdMakelaar()).toEqual(pandData.userIdMakelaar);
    expect(pand.getOpdracht()).toEqual(opdracht);
});

test('given: an existing pand, when: updating the opdracht, then: opdracht is updated correctly', () => {
    // given
    const pand = new Pand({
        pandId: 102,
        adres: 'Baker Street 221B',
        beschrijving: 'Historical residence',
        userIdMakelaar: 789,
        opdracht,
    });

    const newOpdracht = new Opdracht({
        opdrachtnummer: 202,
        datum: new Date(),
        beoordeling: 'Excellent',
        puntentotaal: 100,
        status: 'Voltooid',
        medias: [
            new Media({
                type: 'image',
                bestandslocatie: 'https://example.com/image.jpg',
                uploadDatum: new Date(),
            }),
        ],
    });

    // when
    pand.addOpdrachtToPand(newOpdracht);

    // then
    expect(pand.getOpdracht()).toEqual(newOpdracht);
});

test('given: two identical panden, when: comparing them, then: equals returns true', () => {
    // given
    const pandData = {
        pandId: 103,
        adres: 'Elm Street 13',
        beschrijving: 'Spacious house',
        userIdMakelaar: 333,
        opdracht,
    };

    const pand1 = new Pand(pandData);
    const pand2 = new Pand(pandData);

    // when
    const areEqual = pand1.equals(pand2);

    // then
    expect(areEqual).toBe(true);
});
