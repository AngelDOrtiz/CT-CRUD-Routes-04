import pool from '../utils/pool';

export default class Vehicle {
    id;
    name;
    wheels;
    speed;
  
    constructor(row) {
      this.id = row.id;
      this.name = row.name;
      this.wheels = row.wheels;
      this.speed = row.speed;
    }
  
    static async insert({ name, wheels, speed }) {
      const { rows } = await pool.query(
        'INSERT INTO vehicles (name, wheels, speed) VALUES ($1, $2, $3) RETURNING *',
        [name, wheels, speed]
      );
  
      return new Vehicle(rows[0]);
    }
  
    static async findAll() {
      const { rows } = await pool.query('SELECT * FROM vehicles');
  
      return rows.map(row => new Vehicle(row));
    }
   
    static async findById(id) {
      const { rows } = await pool.query('SELECT * FROM vehicles WHERE id = $1', [id]);
  
      if (!rows[0]) return null;
  
      return new Vehicle(rows[0]);
    }
  
    static async update(vehicle, id) {
      const { rows } = await pool.query(
        `UPDATE vehicles
         SET name = $1,
             wheels = $2,
             speed = $3
         WHERE id = $4
         RETURNING *`,
        [vehicle.name, vehicle.wheels, vehicle.speed, id]
      );
      return new Vehicle(rows[0]);
    }
  
    static async delete(id) {
      const { rows } = await pool.query(
        `DELETE FROM vehicles
         WHERE id = $1
         RETURNING *`,
        [id]
      );
      return new Vehicle(rows[0]);
    }
}
