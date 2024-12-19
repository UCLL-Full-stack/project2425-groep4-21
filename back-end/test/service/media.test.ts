// import { MediaService } from '../../service/media.service';
// import { Media } from '../../model/media';
// import mediaDb from '../../repository/media.db';
// import pandDb from '../../repository/pand.db';

// jest.mock('../../repository/media.db', () => ({
//     getAllMedia: jest.fn(),
//     getMediaById: jest.fn(),
//     createMedia: jest.fn(),
//     deleteMediaById: jest.fn(),
// }));

// jest.mock('../../repository/pand.db', () => ({
//     getPandById: jest.fn(),
// }));

// describe('MediaService', () => {
//     test('retrieves all media', async () => {
//         const mediaList = [new Media({ type: 'image', bestandslocatie: 'https://example.com/image1.jpg', uploadDatum: new Date(), opdrachtId: 1 })];
//         (mediaDb.getAllMedia as jest.Mock).mockResolvedValue(mediaList);

//         const result = await MediaService.getMedia();
//         expect(result).toEqual(mediaList);
//     });

//     test('retrieves media by ID', async () => {
//         const media = new Media({ type: 'image', bestandslocatie: 'https://example.com/image1.jpg', uploadDatum: new Date(), opdrachtId: 1 });
//         (mediaDb.getMediaById as jest.Mock).mockResolvedValue(media);

//         const result = await MediaService.getMediaById(1);
//         expect(result).toEqual(media);
//     });

//     test('throws an error if media by ID is not found', async () => {
//         (mediaDb.getMediaById as jest.Mock).mockResolvedValue(null);

//         await expect(MediaService.getMediaById(1)).rejects.toThrow('Media 1 not found');
//     });

//     test('creates a new media', () => {
//         const newMedia = new Media({ type: 'image', bestandslocatie: 'https://example.com/image1.jpg', uploadDatum: new Date(), opdrachtId: 1 });
//         (mediaDb.createMedia as jest.Mock).mockReturnValue(newMedia);

//         const result = MediaService.createMedia(newMedia);
//         expect(result).toEqual(newMedia);
//     });

//     test('deletes media by ID', () => {
//         (mediaDb.deleteMediaById as jest.Mock).mockReturnValue(true);

//         const result = MediaService.deleteMediaById(1);
//         expect(result).toBe(true);
//     });

//     test('retrieves media by property ID', async () => {
//         const mockMedia = new Media({
//             type: 'image',
//             bestandslocatie: 'https://example.com/image1.jpg',
//             uploadDatum: new Date(),
//             opdrachtId: 1
//         });

//         const pand = {
//             getOpdracht: jest.fn().mockReturnValue([
//                 {
//                     getMedias: jest.fn().mockReturnValue([mockMedia])
//                 }
//             ])
//         };

//         (pandDb.getPandById as jest.Mock).mockResolvedValue(pand);

//         const result = await MediaService.getMediaByPropertyId(1);
//         expect(result).toHaveLength(1);
//         expect(result).toEqual([mockMedia]);
//     });

//     test('returns null if property ID is not found', async () => {
//         (pandDb.getPandById as jest.Mock).mockResolvedValue(null);

//         const result = await MediaService.getMediaByPropertyId(1);
//         expect(result).toBeNull();
//     });

//     test('returns empty array if property has no assignments', async () => {
//         const pand = { getOpdracht: jest.fn().mockReturnValue([]) };
//         (pandDb.getPandById as jest.Mock).mockResolvedValue(pand);

//         const result = await MediaService.getMediaByPropertyId(1);
//         expect(result).toEqual([]);
//     });
// });
