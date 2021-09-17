import pool from '../utils/pool';

export default class Game {
    id;
    name;
    medium;
    genre;

    constructor(row) {
        this.id = row.id;
        this.name = row.name;
        this.medium= row.medium;
        this.genre = row.genre;
    }

    static async insert({ name, medium, genre }) {
        const { rows } = await pool.query('INSERT INTO games (name, medium, genre) VALUES ($1, $2, $3) RETURNING *', [name, medium, genre]);
        return new Game(rows[0]);
    }
}
