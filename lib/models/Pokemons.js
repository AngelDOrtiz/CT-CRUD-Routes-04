import pool from '../utils/pool';

export default class Pokemon {
    id;
    name;
    type;
    canEvolve;

    constructor(row) {
      this.id = row.id;
      this.name = row.name;
      this.type = row.type;
      this.canEvolve = row.canEvolve;
    }

    static async insert({ name, type, canEvolve }) {
      const { rows } = await pool.query(
        'INSERT INTO pokemons (name, type, canEvolve) VALUES ($1, $2, $3) RETURNING *',
        [name, type, canEvolve]
      );
      return new Pokemon(rows[0]);
    }

    static async findAll() {
      const { rows } = await pool.query('SELECT * FROM pokemons');

      return rows.map(row => new Pokemon(row));
    }

    static async findById(id) {
      const { rows } = await pool.query('SELECT * FROM pokemons WHERE id = $1', [id]);

      if (!rows[0]) return null;

      return new Pokemon(rows[0]);
    }

    static async update(pokemon, id) {
      const { rows } = await pool.query(
        `UPDATE pokemons
            SET name = $1,
            type = $2,
            canEvolve = $3
            WHERE id = $4
            RETURNING *`,
        [pokemon.name, pokemon.type, pokemon.canEvolve, id]
      );
      return new Pokemon(rows[0]);
    }

    static async delete(id) {
      const { rows } = await pool.query(
        `DELETE FROM pokemon
            WHERE id = $1
            RETURNING *`,
        [id]
      );
      return new Pokemon(rows[0]);
    }
}
