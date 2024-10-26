import express, { NextFunction, Request, Response } from 'express';
import { BeoordelingService } from '../service/beoordeling.service';

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
 *            beoordelingId:
 *              type: number
 *              format: int64
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
beoordelingRouter.post('/', (req: Request, res: Response, next: NextFunction) => {
    try {
        const newBeoordeling = req.body;
        const beoordeling = BeoordelingService.createBeoordeling(newBeoordeling);
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
beoordelingRouter.delete('/:id', (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = parseInt(req.params.id, 10);
        const success = BeoordelingService.deleteBeoordelingById(id);
        if (success) {
            res.status(200).json({ message: 'Beoordeling deleted successfully' });
        } else {
            res.status(404).json({ message: 'Beoordeling not found' });
        }
    } catch (error) {
        next(error);
    }
});



export { beoordelingRouter };
