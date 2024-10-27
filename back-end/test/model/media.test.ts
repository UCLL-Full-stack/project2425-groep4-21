// Dummy data
import { Media } from '../../model/media';

const mediaData = {
    type: 'video',
    bestandslocatie: 'https://example.com/video.mp4',
    uploadDatum: new Date(),
    opdrachtId: 1,
};

// Media tests
test('given: valid media data, when: media is created, then: media has the correct properties', () => {
    // given
    const media = new Media(mediaData);

    // then
    expect(media.getType()).toEqual(mediaData.type);
    expect(media.getBestandslocatie()).toEqual(mediaData.bestandslocatie);
    expect(media.getUploadDatum()).toEqual(mediaData.uploadDatum);
    expect(media.getOpdrachtId()).toEqual(mediaData.opdrachtId);
});

test('given: two identical media instances, when: comparing them, then: equals returns true', () => {
    // given
    const media1 = new Media(mediaData);
    const media2 = new Media(mediaData);

    // when
    const areEqual = media1.equals(media2);

    // then
    expect(areEqual).toBe(true);
});

test('given: media with different properties, when: comparing them, then: equals returns false', () => {
    // given
    const media1 = new Media(mediaData);
    const differentMedia = new Media({
        type: 'image',
        bestandslocatie: 'https://example.com/different.jpg',
        uploadDatum: new Date(),
        opdrachtId: 2,
    });

    // when
    const areEqual = media1.equals(differentMedia);

    // then
    expect(areEqual).toBe(false);
});
