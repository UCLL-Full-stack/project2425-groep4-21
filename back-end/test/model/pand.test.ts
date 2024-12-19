import { Pand } from '../../model/pand';
import { Opdracht } from '../../model/opdracht';
import { Media } from '../../model/media';
import { Beoordeling } from '../../model/beoordeling';

const beoordeling = new Beoordeling({
    beoordelingId: 1,
    score: 9,
    opmerkingen: 'Goed uitgevoerd',
    userId: 1,
});

const media = new Media({
    type: 'video',
    bestandslocatie: 'https://example.com/video.mp4',
    uploadDatum: new Date(),
    opdrachtId: 101,
});

const opdracht = new Opdracht({
    opdrachtnummer: 101,
    datum: new Date(),
    puntentotaal: 95,
    status: 'Afgerond',
    medias: [media],
    realtorId: 456,
    pilotId: 789,
});

const pandData = {
    id: 101,
    adres: 'Main Street 123',
    beschrijving: 'Mooi appartement in het centrum',
    userIdMakelaar: 456,
    opdrachten: [opdracht],
};

test('given: valid pand data, when: pand is created, then: pand has the correct properties', () => {
    // given
    const pandData = {
        id: 101,
        adres: 'Main Street 123',
        beschrijving: 'Mooi appartement in het centrum',
        userIdMakelaar: 456,
        opdrachten: [opdracht],
    };

    // when
    const pand = new Pand(pandData);

    // then
    expect(pand.getPandId()).toEqual(pandData.id);
    expect(pand.getAdres()).toEqual(pandData.adres);
    expect(pand.getBeschrijving()).toEqual(pandData.beschrijving);
    expect(pand.getUserIdMakelaar()).toEqual(pandData.userIdMakelaar);
    expect(pand.getOpdracht()).toEqual([opdracht]);
});

test('given: an existing pand, when: adding an opdracht, then: opdracht is added to pand', () => {
    // given
    const pand = new Pand({
        id: 102,
        adres: 'Baker Street 221B',
        beschrijving: 'Historical residence',
        userIdMakelaar: 789,
        opdrachten: [opdracht],
    });

    const newMedia = new Media({
        type: 'image',
        bestandslocatie: 'https://example.com/image.jpg',
        uploadDatum: new Date(),
        opdrachtId: 202,
    });

    const newOpdracht = new Opdracht({
        opdrachtnummer: 202,
        datum: new Date(),
        puntentotaal: 100,
        status: 'Voltooid',
        medias: [newMedia],
        realtorId: 789,
        pilotId: 456,
    });

    // when
    pand.addOpdrachtToPand(newOpdracht);

    // then
    expect(pand.getOpdracht()).toContain(newOpdracht);
});

test('given: two identical panden, when: comparing them, then: equals returns true', () => {
    // given
    const pandData = {
        id: 103,
        adres: 'Elm Street 13',
        beschrijving: 'Spacious house',
        userIdMakelaar: 333,
        opdrachten: [opdracht],
    };

    const pand1 = new Pand(pandData);
    const pand2 = new Pand(pandData);

    // when
    const areEqual = pand1.equals(pand2);

    // then
    expect(areEqual).toBe(true);
});

test('given: pand with invalid adres, when: creating pand, then: an error is thrown', () => {
    expect(() => new Pand({ ...pandData, adres: '' })).toThrow(
        'Address must be a non-empty string.'
    );
    expect(() => new Pand({ ...pandData, adres: '123' })).toThrow(
        'Address must be at least 5 characters long.'
    );
});

test('given: pand with invalid beschrijving, when: creating pand, then: an error is thrown', () => {
    expect(() => new Pand({ ...pandData, beschrijving: '' })).toThrow(
        'Description must be a non-empty string.'
    );
    expect(() => new Pand({ ...pandData, beschrijving: 'a'.repeat(1001) })).toThrow(
        'Description must not exceed 1000 characters.'
    );
});

test('given: pand with invalid userIdMakelaar, when: creating pand, then: an error is thrown', () => {
    expect(() => new Pand({ ...pandData, userIdMakelaar: 0 })).toThrow(
        'Realtor ID must be a positive integer.'
    );
    expect(() => new Pand({ ...pandData, userIdMakelaar: -1 })).toThrow(
        'Realtor ID must be a positive integer.'
    );
    expect(() => new Pand({ ...pandData, userIdMakelaar: 1.5 })).toThrow(
        'Realtor ID must be a positive integer.'
    );
});

test('given: pand is created, when: changing the adres, then: adres is updated', () => {
    // given
    const pand = new Pand(pandData);

    // when
    pand.setAdres('New Address 456');

    // then
    expect(pand.getAdres()).toEqual('New Address 456');
});

test('given: pand is created, when: changing the beschrijving, then: beschrijving is updated', () => {
    // given
    const pand = new Pand(pandData);

    // when
    pand.setBeschrijving('Nieuwe beschrijving voor het pand.');

    // then
    expect(pand.getBeschrijving()).toEqual('Nieuwe beschrijving voor het pand.');
});
