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

  it('gets all games via GET', async () => {
    const game1 = await Game.insert({ name: 'Dungeons and Dragons', medium: 'Tabletop Roleplay Game', genre: 'fantasy adventure' });
    const game2 = await Game.insert({ name: 'Pathfinder', medium: 'Tabletop Roleplay Game', genre: 'fantasy adventure' });
    const res = await request(app).get('/api/v1/games');

    expect(res.body).toEqual([game1, game2]);
  });

  it('updates a game by id via PUT', async () => {
    const game1 = await Game.insert({ name: 'Dung and Drons', medium: 'Tabletop Roleplay Game', genre: 'fantasy adventure' });
    const update = { name: 'Dungeons and Dragons', medium: 'Tabletop Roleplay Game', genre: 'fantasy adventure' };
    const res = await await request(app).put(`/api/v1/games/${game1.id}`).send(update);

    expect(res.body).toEqual({ id: '1', ...update });
  });

  it('deletes a game by id via DELETE', async () => {
    const game = await Game.insert({ name: 'Dungeons and Dragons', medium: 'Tabletop Roleplay Game', genre: 'fantasy adventure' });
    const res = await request(app).delete(`/api/v1/games/${game.id}`);

    expect(res.body).toEqual({ success: true });
  });
});
