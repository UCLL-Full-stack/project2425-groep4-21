// Controller - UserController.ts
import express, { NextFunction, Request, Response } from 'express';
import { UserService } from '../service/user.service';
import {User} from "../model/user";
import {UserInput} from "../types";

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
 *            password:
 *              type: string
 *              description: Password of the user.
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
        const newUser: UserInput = req.body;
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

/**
 * @swagger
 * /users/register:
 *   post:
 *     summary: Register a new user
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
 *         description: User registered successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Server error
 */
userRouter.post('/register', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const newUser: UserInput = req.body;
        const user = await UserService.createUser(newUser);
        res.status(201).json(user);
    } catch (error) {
        if (error instanceof Error) {
            if (error.message.includes('already registered')) {
                res.status(400).json({ message: error.message });
            } else {
                next(error);
            }
        } else {
            next(new Error('Unknown error occurred'));
        }
    }
});

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary:  login a user
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               gebruikersnaam:
 *                 type: string
 *                 description: Username of the user
 *                 example: johndoe
 *               password:
 *                 type: string
 *                 description: Password of the user
 *                 example: password123
 *     responses:
 *       200:
 *         description: Authentication successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Authentication successful
 *                 token:
 *                   type: string
 *                   description: JWT token
 *                 username:
 *                   type: string
 *                   description: Username of the authenticated user
 *                 fullname:
 *                   type: string
 *                   description: Full name of the authenticated user
 *                 role:
 *                   type: string
 *                   description: Role of the authenticated user
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */

userRouter.post('/login', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userInput: UserInput = req.body;
        const response = await UserService.authenticate(userInput);
        res.status(200).json({ message: 'Authentication successful', ...response });
    } catch (error) {
        next(error);
    }
});

//Todo endpoints jwt
// POST /users/login: Authenticeer een gebruiker en geef een JWT-token terug.
// GET /users/profile: Haal het profiel van de ingelogde gebruiker op.
// PUT /users/profile: Werk het profiel van de ingelogde gebruiker bij.
// PUT /users/:id/verify: Verifieer een gebruiker (alleen voor beheerders).


export { userRouter };
