import { Router } from 'express';
import Game from '../models/Game';

export default Router()
  .post('/', async (req, res, next) => {
    try {
      const game = await Game.insert(req.body);

      res.send(game);
    } catch (error) {
      next(error);
    }
  });
