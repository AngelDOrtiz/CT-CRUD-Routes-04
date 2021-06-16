import { Router } from 'express';
import Pokemon from '../models/Pokemons';

export default Router()
  .post('/api/v1/pokemons', async (req, res) => {
    try {
      const pokemon = await Pokemon.insert(req.body);
      console.log(pokemon);
      res.send(pokemon);
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  })

  .get('/api/v1/pokemons', async (req, res) => {
    try{
      const pokemon = await Pokemon.findAll();
      res.send(pokemon);
    } catch (err) {
      res.send.status(500).send({ error: err.message });
    }
      
  })

  .get('/api/v1/pokemons/:id', async (req, res) => {
    try {
      const pokemon = await Pokemon.findById(req.params.id);
      res.send(pokemon);
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  })

  .put('/api/v1/pokemons/:id', async (req, res) => {
    try {
      const pokemon = await Pokemon.update(req.body, req.params.id);
      res.send(pokemon);
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  })

  .delete('/api/v1/pokemons/:id', async (req, res) => {
    try {
      const pokemon = await Pokemon.delete(req.params.id);
      res.send(pokemon);
    } catch (err){
      res.status(500).send({ error: err.message });
    }
  });
