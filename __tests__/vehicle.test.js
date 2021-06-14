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

  it('finds all vehicles via get', async () => {
    
    const bike = await Vehicle.insert({
      name: 'Bike', 
      wheels: 2, 
      speed: '12 mph'
    });

    const car = await Vehicle.insert({
      name: 'Car', 
      wheels: 4, 
      speed: '60 mph'
    });

    const motorBike = await Vehicle.insert({
      name: 'Motor Bike', 
      wheels: 2, 
      speed: '70 mph'
    });

    const res = await request(app).get('/api/v1/vehicles');
    expect(res.body).toEqual([bike, car, motorBike]);
  });
});


