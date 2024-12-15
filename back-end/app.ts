import * as dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import * as bodyParser from 'body-parser';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import helmet from 'helmet';
import { beoordelingRouter } from './controller/beoordeling.routes';
import { mediaRouter } from './controller/media.routes';
import { opdrachtRouter } from './controller/opdracht.routes';
import { pandRouter } from './controller/pand.routes';
import { userRouter } from './controller/user.routes';
import { expressjwt } from 'express-jwt';
import { Request, Response, NextFunction } from 'express';

const app = express();
dotenv.config();
const port = process.env.APP_PORT || 3000;

// Use Helmet to secure HTTP headers
app.use(helmet());

// Configure CORS to allow requests from http://localhost:8080
app.use(cors({
    origin: 'http://localhost:8080',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(
    expressjwt({
        secret: process.env.JWT_SECRET || 'default_secret',
        algorithms: ['HS256'],
    }).unless({
        path: [
            '/api-docs',
            /^\/api-docs\/.*/,
            '/users/login',
            '/users/signup',
            '/users/register',
            '/status',
        ],
    })
);

app.use(bodyParser.json());

app.get('/status', (req, res) => {
    res.json({ message: 'Back-end is running...' });
});

// Ensure endpoints are correctly implemented
app.use('/beoordelingen', beoordelingRouter);
app.use('/media', mediaRouter);
app.use('/opdrachten', opdrachtRouter);
app.use('/panden', pandRouter);
app.use('/users', userRouter);

// Swagger documentation
const swaggerOpts = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Courses API',
            version: '1.0.0',
        },
    },
    apis: ['./controller/*.routes.ts'],
};
const swaggerSpec = swaggerJSDoc(swaggerOpts);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err.name === 'UnauthorizedError') {
        res.status(401).json({
            status: 'unauthorized',
            message: err.message,
        });
    } else if (err.name === 'MRTyperError') {
        res.status(400).json({ status: 'domain error', message: err.message });
    } else if (err.name === 'ValidationError') {
        res.status(422).json({ status: 'validation error', message: err.message });
    } else {
        res.status(500).json({
            status: 'application error',
            message: err.message,
        });
    }
});

app.listen(port || 3000, () => {
    console.log(`Back-end is running on port ${port}.`);
});
