import { Router } from 'express';
import Drink from '../models/Drinks';

export default Router()
  .post('/api/v1/drinks', async (req, res) => {
    try {
      const drink = await Drink.insert(req.body);
      res.send(drink);
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  })

  .get('/api/v1/drinks', async (req, res) => {
    try{
      const drink = await Drink.findAll();
      res.send(drink);
    } catch (err) {
      res.send.status(500).send({ error: err.message });
    }
      
  })

  .get('/api/v1/drinks/:id', async (req, res) => {
    try {
      const drink = await Drink.findById(req.params.id);
      res.send(drink);
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  })

  .put('/api/v1/drinks/:id', async (req, res) => {
    try {
      const drink = await Drink.update(req.body, req.params.id);
      res.send(drink);
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  })

  .delete('/api/v1/drinks/:id', async (req, res) => {
    try {
      const drink = await Drink.delete(req.params.id);
      res.send(drink);
    } catch (err){
      res.status(500).send({ error: err.message });
    }
  });
