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

  it('finds all drinks via GET', async () => {
   
    const OJ = await Drink.insert({
      name: 'OJ',
      alcohol: 'No',
      flavor: 'Orange'
    });

    const Corona = await Drink.insert({
      name: 'Corona',
      alcohol: 'Yes',
      flavor: 'Hops and lime'
    });

    const chocoMilk = await Drink.insert({
      name: 'Chocolate Milk',
      alcohol: 'No',
      flavor: 'Chocolate'
    });

    const res = await request(app).get('/api/v1/drinks');
    expect(res.body).toEqual([OJ, Corona, chocoMilk]);
  });


});