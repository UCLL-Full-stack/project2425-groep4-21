import express, { NextFunction, Request, Response } from 'express';
import { OpdrachtService } from '../service/opdracht.service';
import '../types/index';


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
 * /opdrachten/hired-pilots:
 *   get:
 *     summary: Get all hired drone pilots for a realtor
 *     tags:
 *       - Opdrachten
 *     responses:
 *       200:
 *         description: List of hired drone pilots
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   name:
 *                     type: string
 *                   rating:
 *                     type: number
 *       500:
 *         description: Server error
 */
opdrachtRouter.get('/hired-pilots', async (req: Request, res: Response, next: NextFunction) => {
    // needs also jwt token
    try {
        //temporarily hardcoded realtorId
        const realtorId = 3; // Replace with the realtorId you want to test
        const pilots = await OpdrachtService.getHiredPilots(realtorId);
        if (pilots && pilots.length > 0) {
            res.status(200).json(pilots);
        } else {
            res.status(404).json({ message: 'No hired pilots found' });
        }
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

/**
 * @swagger
 * /opdrachten/book:
 *   post:
 *     summary: Book a drone pilot
 *     tags:
 *       - Opdrachten
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               pilotId:
 *                 type: integer
 *                 description: ID of the drone pilot to book
 *               opdrachtnummer:
 *                 type: integer
 *                 description: ID of the assignment
 *     responses:
 *       201:
 *         description: Drone pilot booked successfully
 *       500:
 *         description: Server error
 */
// opdrachtRouter.post('/book', async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         const { pilotId, opdrachtnummer } = req.body;
//         const opdracht = await OpdrachtService.bookDronePilot({ pilotId, opdrachtnummer });
//         res.status(201).json(opdracht);
//     } catch (error) {
//         next(error);
//     }
// });


/**
 * @swagger
 * /opdrachten/completed-assignments:
 *   get:
 *     summary: Get completed assignments and reviews for a drone pilot
 *     tags:
 *       - Opdrachten
 *     responses:
 *       200:
 *         description: List of completed assignments and reviews
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   opdrachtDetails:
 *                     type: object
 *                   review:
 *                     type: string
 *                   points:
 *                     type: number
 *       500:
 *         description: Server error
 */
opdrachtRouter.get('/completed-assignments', async (req: Request, res: Response, next: NextFunction) => {
    // zonder jwt token gaat dit niet werken
    try {
        if (!req.user) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        const assignments = await OpdrachtService.getCompletedAssignments(req.user.id);
        res.status(200).json(assignments);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /opdrachten/{opdrachtId}/beoordeling:
 *   get:
 *     summary: Get the assessment of a specific assignment
 *     tags:
 *       - Opdrachten
 *     parameters:
 *       - in: path
 *         name: opdrachtId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the opdracht
 *     responses:
 *       200:
 *         description: Assignment assessment
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Beoordeling'
 *       404:
 *         description: Assignment or assessment not found
 *       400:
 *         description: Invalid order ID
 *       500:
 *         description: Serverfout
 */

// opdrachtRouter.get('/:opdrachtId/beoordeling', async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         const opdrachtId = parseInt(req.params.opdrachtId, 10);
//         if (isNaN(opdrachtId)) {
//             return res.status(400).json({ message: 'Invalid order ID' });
//         }
//
//         const beoordeling = await OpdrachtService.getBeoordelingByAssignmentId(opdrachtId);
//         if (!beoordeling) {
//             return res.status(404).json({ message: 'Rating not found for this assignment' });
//         }
//
//         res.status(200).json(beoordeling);
//     } catch (error) {
//         next(error);
//     }
// });

export { opdrachtRouter };
