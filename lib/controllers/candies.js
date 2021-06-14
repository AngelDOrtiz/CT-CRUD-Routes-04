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
  });
