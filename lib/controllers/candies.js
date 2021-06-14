import { Router } from 'express';
import Candy from '../models/Candy';

export default Router()
  .post('/api/v1/candies', async (req, res) => {
    try {
      const candy = await Candy.insert(req.body);
      res.send(candy);
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  })

  .get('/api/v1/candies', async (req, res) => {
    try{
      const candy = await Candy.findAll();
      res.send(candy);
    } catch (err) {
      res.send.status(500).send({ error: err.message });
    }
      
  })

  .get('/api/v1/candies/:id', async (req, res) => {
    try {
      const candy = await Candy.findById(req.params.id);
      res.send(candy);
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  });
