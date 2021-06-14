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

  it('finds all candies via GET', async () => {
   
    const Skittles = await Candy.insert({
      name: 'Skittles',
      category: 'Chewy',
      flavor: 'Assorted'
    });

    const MnM = await Candy.insert({
      name: 'M&Ms',
      category: 'Chocolate',
      flavor: 'Chocolate'
    });

    const Smarties = await Candy.insert({
      name: 'Smarties',
      category: 'Tablet',
      flavor: 'Assorted'
    });

    const res = await request(app).get('/api/v1/candies');
    expect(res.body).toEqual([Skittles, MnM, Smarties]);
  });

  it('finds a candy via ID', async () => {
  
    const candy = await Candy.insert({
      name: 'Skittles',
      category: 'Chewy',
      flavor: 'Assorted'
    });
  
    const res = await request(app).get(`/api/v1/candies/${candy.id}`);
    expect(res.body).toEqual(candy);
  });

});
