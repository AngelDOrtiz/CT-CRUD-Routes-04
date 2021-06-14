import { Router } from 'express';
import Vehicle from '../models/Vehicles';

export default Router()
  .post('/api/v1/vehicles', async (req, res) => {
    try {
      const vehicle = await Vehicle.insert(req.body);
      res.send(vehicle);
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  })

  .get('/api/v1/vehicles', async (req, res) => {
    try {
      const vehicle = await Vehicle.findAll();
      res.send(vehicle);
    } catch (err) {
      res.send.status(500).send({ error: err.message });
    }
  })

  .get('/api/v1/vehicles/:id', async (req, res) => {
    try {
      const vehicle = await Vehicle.findById(req.params.id);
      res.send(vehicle);
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  })

  .put('/api/v1/vehicles/:id', async (req, res) => {
    try {
      const vehicle = await Vehicle.update(req.body, req.params.id);
      res.send(vehicle);
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  })

  .delete('/api/v1/vehicles/:id', async (req, res) => {
    try {
      const vehicle = await Vehicle.delete(req.params.id);
      res.send(vehicle);
    } catch (err){
      res.status(500).send({ error: err.message });
    }
  });
