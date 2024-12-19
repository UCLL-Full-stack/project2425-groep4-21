// // Dummy data
import { Media } from '../../model/media';

const mediaData = {
    type: 'video',
    bestandslocatie: 'https://example.com/video.mp4',
    uploadDatum: new Date(),
    opdrachtId: 1,
};

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

test('given: media with invalid type, when: creating media, then: an error is thrown', () => {
    expect(() => new Media({ ...mediaData, type: '' })).toThrow('Type must be a non-empty string.');
    expect(() => new Media({ ...mediaData, type: 'unknown' })).toThrow(
        'Type must be one of the following: image, video, document.'
    );
});

test('given: media with invalid bestandslocatie, when: creating media, then: an error is thrown', () => {
    expect(() => new Media({ ...mediaData, bestandslocatie: '' })).toThrow(
        'File location must be a non-empty string.'
    );
});

test('given: media with future upload date, when: creating media, then: an error is thrown', () => {
    const futureDate = new Date(Date.now() + 1000 * 60 * 60 * 24);
    expect(() => new Media({ ...mediaData, uploadDatum: futureDate })).toThrow(
        'Upload date cannot be in the future.'
    );
});

test('given: media with invalid opdrachtId, when: creating media, then: an error is thrown', () => {
    expect(() => new Media({ ...mediaData, opdrachtId: 0 })).toThrow(
        'Assignment ID must be a positive integer.'
    );
    expect(() => new Media({ ...mediaData, opdrachtId: -1 })).toThrow(
        'Assignment ID must be a positive integer.'
    );
    expect(() => new Media({ ...mediaData, opdrachtId: 1.5 })).toThrow(
        'Assignment ID must be a positive integer.'
    );
});

test('given: media is created, when: calling getters, then: getters return correct values', () => {
    // given
    const media = new Media(mediaData);

    // then
    expect(media.getMediaId()).toBeUndefined(); // since mediaId is optional
    expect(media.getType()).toEqual(mediaData.type);
    expect(media.getBestandslocatie()).toEqual(mediaData.bestandslocatie);
    expect(media.getUploadDatum()).toEqual(mediaData.uploadDatum);
    expect(media.getOpdrachtId()).toEqual(mediaData.opdrachtId);
});
