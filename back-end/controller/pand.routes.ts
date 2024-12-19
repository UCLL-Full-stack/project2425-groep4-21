import express, { NextFunction, Request, Response } from 'express';
import { PandService } from '../service/pand.service';

const pandRouter = express.Router();

/**
 * @swagger
 *   components:
 *    securitySchemes:
 *     bearerAuth:
 *      type: http
 *      scheme: bearer
 *      bearerFormat: JWT
 *    schemas:
 *      Pand:
 *          type: object
 *          properties:
 *            adres:
 *              type: string
 *              description: Address of the pand.
 *            beschrijving:
 *              type: string
 *              description: Description of the pand.
 *            userIdMakelaar:
 *              type: number
 *              description: ID of the makelaar (broker) responsible for the pand.
 *            opdracht:
 *              $ref: '#/components/schemas/Opdracht'
 */

/**
 * @swagger
 * /panden:
 *   get:
 *     summary: Get a list of all panden
 *     tags:
 *       - Panden
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of panden
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Pand'
 *       500:
 *         description: Server error
 */
pandRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const panden = await PandService.getPanden();
        res.status(200).json(panden);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /panden/{id}:
 *   get:
 *     summary: Get a specific pand by ID
 *     tags:
 *       - Panden
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the pand to retrieve
 *     responses:
 *       200:
 *         description: Pand details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Pand'
 *       404:
 *         description: Pand not found
 *       500:
 *         description: Server error
 */
pandRouter.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = parseInt(req.params.id, 10);
        const pand = await PandService.getPandById(id);
        if (pand) {
            res.status(200).json(pand);
        } else {
            res.status(404).json({ message: 'Pand not found' });
        }
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /panden:
 *   post:
 *     summary: Create a new pand
 *     tags:
 *       - Panden
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Pand'
 *     responses:
 *       200:
 *         description: Pand created successfully
 *       500:
 *         description: Server error
 */
pandRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const newPand = req.body;
        const pand = await PandService.createPand(newPand);
        res.status(200).json(pand);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /panden/{id}:
 *   delete:
 *     summary: Delete a pand by ID
 *     tags:
 *       - Panden
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the pand to delete
 *     responses:
 *       200:
 *         description: Pand deleted successfully
 *       404:
 *         description: Pand not found
 *       500:
 *         description: Server error
 */
pandRouter.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = parseInt(req.params.id, 10);
        const success = await PandService.deletePandById(id);
        if (success) {
            res.status(200).json({ message: 'Pand deleted successfully' });
        } else {
            res.status(404).json({ message: 'Pand not found' });
        }
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /panden/{id}:
 *   put:
 *     summary: Update a pand by ID
 *     tags:
 *       - Panden
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the property to be updated
 *     requestBody:
 *       description: The updated data of the property
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Pand'
 *     responses:
 *       200:
 *         description: Property successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Pand'
 *       400:
 *         description: Invalid property ID or invalid data
 *       401:
 *         description: Not authorized
 *       404:
 *         description: Pand not found
 *       500:
 *         description: Serverfout
 */
pandRouter.put('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const pandId = parseInt(req.params.id, 10);
        if (isNaN(pandId)) {
            return res.status(400).json({ message: 'Invalid property ID' });
        }

        console.log(`Updating Pand with ID: ${pandId}`);

        const updatedPandData = req.body;

        const updatedPand = await PandService.updatePand(pandId, updatedPandData);
        res.status(200).json(updatedPand);
    } catch (error) {
        console.error('Error in PUT /panden/:id:', error); // Debugging
        if (error instanceof Error && error.message.includes('not found')) {
            res.status(404).json({ message: error.message });
        } else {
            next(error);
        }
    }
});

export { pandRouter };
