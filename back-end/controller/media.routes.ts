import express, { NextFunction, Request, Response } from 'express';
import { MediaService } from '../service/media.service';
import { Media } from '../model/media';

const mediaRouter = express.Router();

/**
 * @swagger
 *   components:
 *    securitySchemes:
 *     bearerAuth:
 *      type: http
 *      scheme: bearer
 *      bearerFormat: JWT
 *    schemas:
 *      Media:
 *          type: object
 *          properties:
 *            type:
 *              type: string
 *              description: Type of media, e.g., 'image' or 'video'.
 *            bestandslocatie:
 *              type: string
 *              description: Location of the media file.
 *            uploadDatum:
 *              type: string
 *              format: date-time
 *              description: The upload date of the media.
 *            opdrachtId:
 *              type: integer
 *              description: ID of the assignment to which the media belongs.
 */

/**
 * @swagger
 * /media:
 *   get:
 *     summary: Get a list of all media files
 *     tags:
 *       - Media
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of media files
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Media'
 *       500:
 *         description: Server error
 */
mediaRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const media = await MediaService.getMedia();
        res.status(200).json(media);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /media/{id}:
 *   get:
 *     summary: Get a specific media file by ID
 *     tags:
 *       - Media
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the media file to retrieve
 *     responses:
 *       200:
 *         description: Media file details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Media'
 *       404:
 *         description: Media not found
 *       500:
 *         description: Server error
 */
mediaRouter.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = parseInt(req.params.id, 10);
        const media = await MediaService.getMediaById(id);
        if (media) {
            res.status(200).json(media);
        } else {
            res.status(404).json({ message: 'Media not found' });
        }
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /media:
 *   post:
 *     summary: Create a new media
 *     tags:
 *       - Media
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Media'
 *     responses:
 *       200:
 *         description: Media created successfully
 *       500:
 *         description: Server error
 */
mediaRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { mediaId, type, bestandslocatie, uploadDatum, opdrachtId } = req.body;

        const parsedUploadDatum = new Date(uploadDatum);

        if (isNaN(parsedUploadDatum.getTime())) {
            return res.status(400).json({ message: 'Invalid uploadDatum format' });
        }

        const newMedia = new Media({
            mediaId: mediaId,
            type: type,
            bestandslocatie: bestandslocatie,
            uploadDatum: parsedUploadDatum,
            opdrachtId: opdrachtId,
        });

        const media = await MediaService.createMedia(newMedia);

        res.status(200).json(media);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /media/{id}:
 *   delete:
 *     summary: Delete a media by ID
 *     tags:
 *       - Media
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the media to delete
 *     responses:
 *       200:
 *         description: Media deleted successfully
 *       404:
 *         description: Media not found
 *       500:
 *         description: Server error
 */
mediaRouter.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = parseInt(req.params.id, 10);
        const success = await MediaService.deleteMediaById(id);
        if (success) {
            res.status(200).json({ message: 'Media deleted successfully' });
        } else {
            res.status(404).json({ message: 'Media not found' });
        }
    } catch (error) {
        next(error);
    }
});

// /**
//  * @swagger
//  * /media/property/{propertyId}:
//  *   get:
//  *     summary: Retrieve all media from a property
//  *     tags:
//  *       - Media
//  *     security:
//  *       - bearerAuth: []
//  *     parameters:
//  *       - in: path
//  *         name: propertyId
//  *         schema:
//  *           type: integer
//  *         required: true
//  *         description: ID property
//  *     responses:
//  *       200:
//  *         description: List of media of the property
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: array
//  *               items:
//  *                 $ref: '#/components/schemas/Media'
//  *       400:
//  *         description: Invalid property ID
//  *       404:
//  *         description: Pand not found or no media available
//  *       500:
//  *         description: Serverfout
//  */
// mediaRouter.get('/property/:propertyId', async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         const propertyId = parseInt(req.params.propertyId, 10);
//         if (isNaN(propertyId)) {
//             return res.status(400).json({ message: 'Invalid property ID' });
//         }

//         const mediaList = await MediaService.getMediaByPropertyId(propertyId);
//         if (mediaList === null) {
//             return res.status(404).json({ message: 'Pand not found' });
//         } else if (mediaList.length === 0) {
//             return res.status(404).json({ message: 'No media found for this pand' });
//         }

//         res.status(200).json(mediaList);
//     } catch (error) {
//         next(error);
//     }
// });

//Todo: - `PUT /media/:mediaId/approve`: Keur media goed (door makelaar).
// jwt token voor nodig (later)
//Todo - `GET /media/notifications`: Haal notificaties op voor de ingelogde piloot.
// jwt token voor nodig (later)

export { mediaRouter };
