import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';
import Vehicle from '../lib/models/Vehicles.js';

describe('vehicle routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
    
  it('creates a vehicle via POST', async () => {
    const res = await request(app)
      .post('/api/v1/vehicles')
      .send({ name: 'Bike', wheels: 2, speed: '12 mph' });

    expect(res.body).toEqual({
      id: '1',
      name: 'Bike', 
      wheels: 2, 
      speed: '12 mph'
    });
  });



});
