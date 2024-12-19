import express, { NextFunction, Request, Response } from 'express';
import { BeoordelingService } from '../service/beoordeling.service';
import { Beoordeling } from '../model/beoordeling';

const beoordelingRouter = express.Router();

/**
 * @swagger
 *   components:
 *    securitySchemes:
 *     bearerAuth:
 *      type: http
 *      scheme: bearer
 *      bearerFormat: JWT
 *    schemas:
 *      Beoordeling:
 *          type: object
 *          properties:
 *            score:
 *              type: number
 *              description: Score given in the beoordeling.
 *            opmerkingen:
 *              type: string
 *              description: Remarks given in the beoordeling.
 *            userId:
 *              type: number
 *              description: ID of the user who provided the beoordeling.
 */

/**
 * @swagger
 * /beoordelingen:
 *   get:
 *     summary: Get a list of all beoordelingen
 *     tags:
 *       - Beoordelingen
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of beoordelingen
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Beoordeling'
 *       500:
 *         description: Server error
 */
beoordelingRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const beoordelingen = await BeoordelingService.getBeoordelingen();
        res.status(200).json(beoordelingen);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /beoordelingen/{id}:
 *   get:
 *     summary: Get a specific beoordeling by ID
 *     tags:
 *       - Beoordelingen
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the beoordeling to retrieve
 *     responses:
 *       200:
 *         description: Beoordeling details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Beoordeling'
 *       404:
 *         description: Beoordeling not found
 *       500:
 *         description: Server error
 */
beoordelingRouter.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = parseInt(req.params.id, 10);
        const beoordeling = await BeoordelingService.getBeoordelingById(id);
        if (beoordeling) {
            res.status(200).json(beoordeling);
        } else {
            res.status(404).json({ message: 'Beoordeling not found' });
        }
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /beoordelingen:
 *   post:
 *     summary: Create a new beoordeling
 *     tags:
 *       - Beoordelingen
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Beoordeling'
 *     responses:
 *       200:
 *         description: Beoordeling created successfully
 *       500:
 *         description: Server error
 */
beoordelingRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const newBeoordeling = new Beoordeling({
            beoordelingId: req.body.beoordelingId,
            score: req.body.score,
            opmerkingen: req.body.opmerkingen,
            userId: req.body.userId,
        });

        const beoordeling = await BeoordelingService.createBeoordeling(newBeoordeling);

        res.status(200).json(beoordeling);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /beoordelingen/{id}:
 *   delete:
 *     summary: Delete a beoordeling by ID
 *     tags:
 *       - Beoordelingen
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the beoordeling to delete
 *     responses:
 *       200:
 *         description: Beoordeling deleted successfully
 *       404:
 *         description: Beoordeling not found
 *       500:
 *         description: Server error
 */
beoordelingRouter.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = parseInt(req.params.id, 10);
        const success = await BeoordelingService.deleteBeoordelingById(id);
        if (success) {
            res.status(200).json({ message: 'Beoordeling deleted successfully' });
        } else {
            res.status(404).json({ message: 'Beoordeling not found' });
        }
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /beoordelingen/pilot/{pilotId}:
 *   get:
 *     summary: Get all beoordeling for a specific pilot
 *     tags:
 *       - Beoordelingen
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: pilotId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the piloot
 *     responses:
 *       200:
 *         description: List of beoordelingen
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Beoordeling'
 *       404:
 *         description: Pilot not found
 *       500:
 *         description: Serverfout
 */
beoordelingRouter.get(
    '/pilot/:pilotId',
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const pilotId = parseInt(req.params.pilotId, 10);
            if (isNaN(pilotId)) {
                return res.status(400).json({ message: 'Invalid pilot ID' });
            }

            const beoordelingen = await BeoordelingService.getBeoordelingenByPilotId(pilotId);
            if (beoordelingen.length === 0) {
                return res.status(404).json({ message: 'No beoordelingen found for this pilot' });
            }

            res.status(200).json(beoordelingen);
        } catch (error) {
            next(error);
        }
    }
);

export { beoordelingRouter };
