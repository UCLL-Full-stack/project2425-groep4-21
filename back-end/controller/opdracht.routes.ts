import express, { NextFunction, Request, Response } from 'express';
import { OpdrachtService } from '../service/opdracht.service';

const opdrachtRouter = express.Router();

/**
 * @swagger
 *   components:
 *    securitySchemes:
 *     bearerAuth:
 *      type: http
 *      scheme: bearer
 *      bearerFormat: JWT
 *    schemas:
 *      Opdracht:
 *          type: object
 *          properties:
 *            opdrachtnummer:
 *              type: number
 *              format: int64
 *              description: Unique identifier for the opdracht.
 *            datum:
 *              type: string
 *              format: date-time
 *              description: Date of the opdracht.
 *            beoordeling:
 *              type: string
 *              description: The beoordeling of the opdracht.
 *            puntentotaal:
 *              type: number
 *              description: Total points given to the opdracht.
 *            status:
 *              type: string
 *              description: Current status of the opdracht.
 *            medias:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Media'
 */

/**
 * @swagger
 * /opdrachten:
 *   get:
 *     summary: Get a list of all opdrachten
 *     tags:
 *       - Opdrachten
 *     responses:
 *       200:
 *         description: A list of opdrachten
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Opdracht'
 *       500:
 *         description: Server error
 */
opdrachtRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const opdrachten = await OpdrachtService.getOpdrachten();
        res.status(200).json(opdrachten);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /opdrachten/{id}:
 *   get:
 *     summary: Get a specific opdracht by ID
 *     tags:
 *       - Opdrachten
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the opdracht to retrieve
 *     responses:
 *       200:
 *         description: Opdracht details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Opdracht'
 *       404:
 *         description: Opdracht not found
 *       500:
 *         description: Server error
 */
opdrachtRouter.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = parseInt(req.params.id, 10);
        const opdracht = await OpdrachtService.getOpdrachtById(id);
        if (opdracht) {
            res.status(200).json(opdracht);
        } else {
            res.status(404).json({ message: 'Opdracht not found' });
        }
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /opdrachten:
 *   post:
 *     summary: Create a new opdracht
 *     tags:
 *       - Opdrachten
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Opdracht'
 *     responses:
 *       200:
 *         description: Opdracht created successfully
 *       500:
 *         description: Server error
 */
opdrachtRouter.post('/', (req: Request, res: Response, next: NextFunction) => {
    try {
        const newOpdracht = req.body;
        const opdracht = OpdrachtService.createOpdracht(newOpdracht);
        res.status(200).json(opdracht);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /opdrachten/{id}:
 *   delete:
 *     summary: Delete an opdracht by ID
 *     tags:
 *       - Opdrachten
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the opdracht to delete
 *     responses:
 *       200:
 *         description: Opdracht deleted successfully
 *       404:
 *         description: Opdracht not found
 *       500:
 *         description: Server error
 */
opdrachtRouter.delete('/:id', (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = parseInt(req.params.id, 10);
        const success = OpdrachtService.deleteOpdrachtById(id);
        if (success) {
            res.status(200).json({ message: 'Opdracht deleted successfully' });
        } else {
            res.status(404).json({ message: 'Opdracht not found' });
        }
    } catch (error) {
        next(error);
    }
});

export { opdrachtRouter };
