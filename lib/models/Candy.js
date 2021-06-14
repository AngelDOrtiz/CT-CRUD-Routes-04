import pool from '../utils/pool';

export default class Candy {
    id;
    name;
    category;
    flavor;

    constructor(row) {
      this.id = row.id;
      this.name = row.name;
      this.category = row.category;
      this.flavor = row.flavor;
    }

    static async insert({ name, category, flavor }) {
      const { rows } = await pool.query(
        'INSERT INTO candies (name, category, flavor) VALUES ($1, $2, $3) RETURNING *',
        [name, category, flavor]
      );
      return new Candy(rows[0]);
    }

    static async findAll() {
      const { rows } = await pool.query('SELECT * FROM candies');

      return rows.map(row => new Candy(row));
    }

    static async findById(id) {
      const { rows } = await pool.query('SELECT * FROM candies WHERE id = $1', [id]);

      if (!rows[0]) return null;

      return new Candy(rows[0]);
    }

    static async update(candy, id) {
      const { rows } = await pool.query(
        `UPDATE candies
            SET name = $1,
            category = $2,
            flavor = $3
            WHERE id = $4
            RETURNING *`,
        [candy.name, candy.category, candy.flavor, id]
      );
      return new Candy(rows[0]);
    }

    static async delete(id) {
      const { rows } = await pool.query(
        `DELETE FROM candies
            WHERE id = $1
            RETURNING *`,
        [id]
      );
      return new Candy(rows[0]);
    }
}
