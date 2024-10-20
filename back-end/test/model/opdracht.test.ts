import { Opdracht } from '../../model/opdracht';
import { Media } from '../../model/media';

// Dummy data
const media = new Media({
    type: 'video',
    bestandslocatie: 'https://example.com/video.mp4',
    uploadDatum: new Date(),
});

const opdrachtData = {
    opdrachtnummer: 101,
    datum: new Date(),
    beoordeling: 'Goed uitgevoerd',
    puntentotaal: 95,
    status: 'Afgerond',
    medias: [media],
};

// Opdracht testen

test('given: valid opdracht data, when: opdracht is created, then: opdracht has the correct properties', () => {
    // given
    const opdracht = new Opdracht(opdrachtData);

    // then
    expect(opdracht.getOpdrachtnummer()).toEqual(opdrachtData.opdrachtnummer);
    expect(opdracht.getDatum()).toEqual(opdrachtData.datum);
    expect(opdracht.getBeoordeling()).toEqual(opdrachtData.beoordeling);
    expect(opdracht.getPuntentotaal()).toEqual(opdrachtData.puntentotaal);
    expect(opdracht.getStatus()).toEqual(opdrachtData.status);
    expect(opdracht.getMedias()).toContain(media);
});

test('given: an existing opdracht, when: adding a media, then: media is added to opdracht', () => {
    // given
    const opdracht = new Opdracht(opdrachtData);
    const newMedia = new Media({
        type: 'image',
        bestandslocatie: 'https://example.com/image.jpg',
        uploadDatum: new Date(),
    });

    // when
    opdracht.addMediaToOpdracht(newMedia);

    // then
    expect(opdracht.getMedias()).toContain(newMedia);
});

test('given: two identical opdrachten, when: comparing them, then: equals returns true', () => {
    // given
    const opdracht1 = new Opdracht(opdrachtData);
    const opdracht2 = new Opdracht(opdrachtData);

    // when
    const areEqual = opdracht1.equals(opdracht2);

    // then
    expect(areEqual).toBe(true);
});
