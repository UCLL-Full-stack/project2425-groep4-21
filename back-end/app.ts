import * as dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import * as bodyParser from 'body-parser';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { beoordelingRouter } from './controller/beoordeling.routes';
import { mediaRouter } from './controller/media.routes';
import { opdrachtRouter } from './controller/opdracht.routes';
import { pandRouter } from './controller/pand.routes';
import { userRouter } from './controller/user.routes';

const app = express();
dotenv.config();
const port = process.env.APP_PORT || 3001;

app.use(cors());
app.use(bodyParser.json());

app.get('/status', (req, res) => {
    res.json({ message: 'Back-end is running...' });
});

//zorgen dat endpoints correct zijn geimplementeerd
app.use('/beoordelingen', beoordelingRouter);
app.use('/media', mediaRouter);
app.use('/opdrachten', opdrachtRouter);
app.use('/panden', pandRouter);
app.use('/users', userRouter);

//Swagger documentatie
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

app.listen(port || 3000, () => {
    console.log(`Back-end is running on port ${port}.`);
});
