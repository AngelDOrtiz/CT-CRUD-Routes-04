import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';
import Drink from '../lib/models/Drinks.js';

describe('drink routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('creates a drink via POST', async () => {
    const res = await request(app)
      .post('/api/v1/drinks')
      .send({ name: 'OJ', alcohol: 'No', flavor: 'Orange' });

    expect(res.body).toEqual({
      id: '1',
      name: 'OJ',
      alcohol: 'No',
      flavor: 'Orange'
    });
  });


});
