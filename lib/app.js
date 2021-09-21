import express from 'express';
import notFoundMiddleware from './middleware/not-found.js';
import errorMiddleware from './middleware/error.js';
import gamesController from '../lib/controllers/games.js';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/v1/games', gamesController);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

export default app;
