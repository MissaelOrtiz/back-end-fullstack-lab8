import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';
// import Game from '../lib/models/Game';

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
});
