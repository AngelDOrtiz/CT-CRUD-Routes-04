import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';
import Pokemon from '../lib/models/Pokemons.js';

describe('pokemon routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it.skip('creates a pokemon via POST', async () => {
    const res = await request(app)
      .post('/api/v1/pokemons')
      .send({ name: 'Pikachu', type: 'Electric', canEvolve: 'Yes' });

    expect(res.body).toEqual({
      id: '1',
      name: 'Pikachu',
      type: 'Electric',
      canEvolve: 'Yes'
    });
  });

  it('finds all pokemons via GET', async () => {
   
    const pikachu = await Pokemon.insert({
      name: 'Pikachu',
      type: 'Electric',
      canEvolve: 'Yes'
    });

    const charizard = await Pokemon.insert({
      name: 'Charizard',
      type: 'Fire',
      canEvolve: 'No'
    });

    const weedle = await Pokemon.insert({
      name: 'Weedle',
      type: 'Bug',
      canEvolve: 'Yes'
    });

    const res = await request(app).get('/api/v1/pokemons');
    expect(res.body).toEqual([pikachu, charizard, weedle]);
  });

  it('finds a pokemon via ID', async () => {
  
    const pokemon = await Pokemon.insert({
      name: 'Weedle',
      type: 'Bug',
      canEvolve: 'Yes'
    });
  
    const res = await request(app).get(`/api/v1/pokemons/${pokemon.id}`);
    expect(res.body).toEqual(pokemon);
  });

  it('UPDATES a pokemon via PUT', async () => {
    const pokemon = await Pokemon.insert({
      id: 1,
      name: 'Weedle',
      type: 'Bug',
      canEvolve: 'Yes'
    });
  
    pokemon.name = 'Stupid';
  
    const res = await request(app).put(`/api/v1/pokemons/${pokemon.id}`)
      .send(pokemon);
    expect(res.body).toEqual(pokemon);
  });


});
