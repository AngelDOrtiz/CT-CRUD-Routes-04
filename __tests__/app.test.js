import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';
import dogs from '../lib/controllers/dogs.js';
import Dog from '../lib/models/Dogs.js';

describe('dog routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('creates a dog via post', async () => {
    const res = await request(app)
      .post('/api/v1/dogs')
      .send({ name: 'bucky', age: 4, weight: '15 lbs' });

    expect(res.body).toEqual({
      id: '1',
      name: 'bucky',
      age: 4,
      weight: '15 lbs',
    });
  });

  it('finds all dogs via get', async () => {
    const Nero = await Dog.insert({
      name: 'Nero',
      age: 3,
      weight: '30 lbs'
    });

    const Bandit = await Dog.insert({
      name: 'Bandit',
      age: 1,
      weight: '3 lbs'
    });

    const Tiberius = await Dog.insert({
      name: 'Tiberius',
      age: 54,
      weight: '300 lbs'
    });

    const res = await request(app).get('/api/v1/dogs');
    expect(res.body).toEqual([Nero, Bandit, Tiberius]);
  });
});

it('finds a dog via ID', async () => {
  
  const dog = await Dog.insert({
    name: 'Nero',
    age: 3,
    weight: '30 lbs'
  });

  const res = await request(app).get(`/api/v1/dogs/${dog.id}`);
  expect(res.body).toEqual(dog);
});
