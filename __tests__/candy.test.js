import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';
import Candy from '../lib/models/Candy.js';

describe('candy routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('creates a candy via POST', async () => {
    const res = await request(app)
      .post('/api/v1/candies')
      .send({ name: 'Skittles', category: 'Chewy', flavor: 'Assorted' });

    expect(res.body).toEqual({
      id: '1',
      name: 'Skittles',
      category: 'Chewy',
      flavor: 'Assorted'
    });
  });



});
