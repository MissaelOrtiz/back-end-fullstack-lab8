import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';
import Game from '../lib/models/Game';

describe('game routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('creates a game via POST', async () => {
    const game = { name: 'Dungeons and Dragons', medium: 'Tabletop Roleplay Game', genre: 'fantasy adventure' };
    const res = await request(app).post('/api/v1/games').send(game);

    expect(res.body).toEqual({ id: '1', ...game });
  });

  it('gets a game by id via GET', async () => {
    const info = { name: 'Dungeons and Dragons', medium: 'Tabletop Roleplay Game', genre: 'fantasy adventure' };
    const game = await Game.insert(info);
    const res = await request(app).get(`/api/v1/games/${game.id}`);

    expect(res.body).toEqual(game);
  });
});
