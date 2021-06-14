import pool from '../utils/pool';

export default class Drink {
  id;
  name;
  alcohol;
  flavor;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.alcohol = row.alcohol;
    this.flavor = row.flavor;
  }

  static async insert({ name, alcohol, flavor }) {
    const { rows } = await pool.query(
      'INSERT INTO drinks (name, alcohol, flavor) VALUES ($1, $2, $3) RETURNING *',
      [name, alcohol, flavor]
    );

    return new Drink(rows[0]);
  }

  static async findAll() {
    const { rows } = await pool.query('SELECT * FROM drinks');

    return rows.map(row => new Drink(row));
  }
 
  static async findById(id) {
    const { rows } = await pool.query('SELECT * FROM drinks WHERE id = $1', [id]);

    if (!rows[0]) return null;

    return new Drink(rows[0]);
  }

  static async update(drink, id) {
    const { rows } = await pool.query(
      `UPDATE drinks
       SET name = $1,
           alcohol = $2,
           flavor = $3
       WHERE id = $4
       RETURNING *`,
      [drink.name, drink.alcohol, drink.flavor, id]
    );
    return new Drink(rows[0]);
  }

  static async delete(id) {
    const { rows } = await pool.query(
      `DELETE FROM drinks
       WHERE id = $1
       RETURNING *`,
      [id]
    );
    return new Drink(rows[0]);
  }
}

