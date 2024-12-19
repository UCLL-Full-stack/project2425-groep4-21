import { Opdracht } from '../../model/opdracht';
import { Media } from '../../model/media';

const media = new Media({
    type: 'video',
    bestandslocatie: 'https://example.com/video.mp4',
    uploadDatum: new Date(),
    opdrachtId: 101,
});

const newMedia = new Media({
    type: 'image',
    bestandslocatie: 'https://example.com/image.jpg',
    uploadDatum: new Date(),
    opdrachtId: 101,
});

const opdrachtData = {
    opdrachtnummer: 101,
    datum: new Date(),
    puntentotaal: 95,
    status: 'Completed',
    medias: [media],
    realtorId: 1,
    pilotId: 2,
};

test('given: valid opdracht data, when: opdracht is created, then: opdracht has the correct properties', () => {
    // given
    const opdracht = new Opdracht(opdrachtData);

    // then
    expect(opdracht.getOpdrachtnummer()).toEqual(opdrachtData.opdrachtnummer);
    expect(opdracht.getDatum()).toEqual(opdrachtData.datum);
    expect(opdracht.getPuntentotaal()).toEqual(opdrachtData.puntentotaal);
    expect(opdracht.getStatus()).toEqual(opdrachtData.status);
    expect(opdracht.getMedias()).toContain(media);
    expect(opdracht.getRealtorId()).toEqual(opdrachtData.realtorId);
    expect(opdracht.getPilotId()).toEqual(opdrachtData.pilotId);
});

test('given: an existing opdracht, when: adding a media, then: media is added to opdracht', () => {
    // given
    const opdracht = new Opdracht(opdrachtData);

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

test('given: opdrachten with different properties, when: comparing them, then: equals returns false', () => {
    // given
    const opdracht1 = new Opdracht(opdrachtData);
    const differentOpdrachtData = {
        ...opdrachtData,
        puntentotaal: 80,
    };
    const opdracht2 = new Opdracht(differentOpdrachtData);

    // when
    const areEqual = opdracht1.equals(opdracht2);

    // then
    expect(areEqual).toBe(false);
});

test('given: opdracht with invalid puntentotaal, when: creating opdracht, then: an error is thrown', () => {
    expect(() => new Opdracht({ ...opdrachtData, puntentotaal: -1 })).toThrow(
        'Total points must be between 0 and 100.'
    );
    expect(() => new Opdracht({ ...opdrachtData, puntentotaal: 101 })).toThrow(
        'Total points must be between 0 and 100.'
    );
});

test('given: opdracht with completed status and no media, when: creating opdracht, then: an error is thrown', () => {
    expect(() => new Opdracht({ ...opdrachtData, medias: [], status: 'Completed' })).toThrow(
        'A completed assignment must have at least one media item.'
    );
});

test('given: opdracht is created, when: calling getters, then: getters return correct values', () => {
    // given
    const opdracht = new Opdracht(opdrachtData);

    // then
    expect(opdracht.getOpdrachtnummer()).toEqual(opdrachtData.opdrachtnummer);
    expect(opdracht.getDatum()).toEqual(opdrachtData.datum);
    expect(opdracht.getPuntentotaal()).toEqual(opdrachtData.puntentotaal);
    expect(opdracht.getStatus()).toEqual(opdrachtData.status);
    expect(opdracht.getMedias()).toEqual(opdrachtData.medias);
    expect(opdracht.getRealtorId()).toEqual(opdrachtData.realtorId);
    expect(opdracht.getPilotId()).toEqual(opdrachtData.pilotId);
});

test('given: opdracht is created, when: changing the status, then: status is updated', () => {
    // given
    const opdracht = new Opdracht(opdrachtData);

    // when
    opdracht.setStatus('In Progress');

    // then
    expect(opdracht.getStatus()).toEqual('In Progress');
});

test('given: opdracht is created, when: setting pilot ID, then: pilot ID is updated', () => {
    // given
    const opdracht = new Opdracht(opdrachtData);

    // when
    opdracht.setPilotId(3);

    // then
    expect(opdracht.getPilotId()).toEqual(3);
});
