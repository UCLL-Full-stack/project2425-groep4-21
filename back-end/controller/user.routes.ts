// Controller - UserController.ts
import express, { NextFunction, Request, Response } from 'express';
import { UserService } from '../service/user.service';
import {User} from "../model/user";

const userRouter = express.Router();

/**
 * @swagger
 *   components:
 *    securitySchemes:
 *     bearerAuth:
 *      type: http
 *      scheme: bearer
 *      bearerFormat: JWT
 *    schemas:
 *      User:
 *          type: object
 *          properties:
 *            voornaam:
 *              type: string
 *              description: First name of the user.
 *            naam:
 *              type: string
 *              description: Last name of the user.
 *            gebruikersnaam:
 *              type: string
 *              description: Username of the user.
 *            rol:
 *              type: string
 *              description: Role of the user, e.g., 'admin', 'user'.
 *            emailadres:
 *              type: string
 *              description: Email address of the user.
 *            portfolio:
 *              type: string
 *              description: Portfolio link of the user.
 *            niveau:
 *              type: string
 *              description: User's expertise level.
 *            bevoegdheden:
 *              type: string
 *              description: Permissions of the user.
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get a list of all users
 *     tags:
 *       - Users
 *     responses:
 *       200:
 *         description: A list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       500:
 *         description: Server error
 */
userRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await UserService.getUsers();
        res.status(200).json(users);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /users/pilots:
 *   get:
 *     summary: Get a list of all pilots, with filtering options
 *     tags:
 *       - Users
 *     parameters:
 *       - in: query
 *         name: minRating
 *         schema:
 *           type: number
 *         required: false
 *         description: Filter pilots by minimum rating
 *       - in: query
 *         name: niveau
 *         schema:
 *           type: string
 *         required: false
 *         description: Filter pilots by level
 *     responses:
 *       200:
 *         description: List of pilots
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/PilotResponse'
 *       400:
 *         description: Invalid query parameters
 *       500:
 *         description: Server error
 */
userRouter.get('/pilots', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { minRating, niveau } = req.query;
        const ratingFilter = minRating ? parseFloat(minRating as string) : undefined;
        const pilots = await UserService.getPilots({ minRating: ratingFilter, niveau: niveau as string });
        res.status(200).json(pilots);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Get a specific user by ID
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the user to retrieve
 *     responses:
 *       200:
 *         description: User details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */
userRouter.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = parseInt(req.params.id, 10);
        const user = await UserService.getUserById(id);
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Create a new user
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: User created successfully
 *       500:
 *         description: Server error
 */
userRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const newUser = new User(req.body);
        const user = await UserService.createUser(newUser);
        res.status(201).json(user);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Delete a user by ID
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the user to delete
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */
userRouter.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = parseInt(req.params.id, 10);
        const user = await UserService.deleteUserById(id);
        if (user) {
            res.status(200).json({ message: 'User deleted successfully' });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        next(error);
    }
});

//Todo endpoints jwt
// POST /users/register: Registreer een nieuwe gebruiker.
// POST /users/login: Authenticeer een gebruiker en geef een JWT-token terug.
// GET /users/profile: Haal het profiel van de ingelogde gebruiker op.
// PUT /users/profile: Werk het profiel van de ingelogde gebruiker bij.
// PUT /users/:id/verify: Verifieer een gebruiker (alleen voor beheerders).


export { userRouter };
