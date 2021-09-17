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

    static async getById(id) {
        const { rows } = await pool.query('SELECT * FROM games WHERE id=$1', [id]);

        return new Game(rows[0]);
    }

    static async getAll() {
        const { rows } = await pool.query('SELECT * FROM games');

        return rows.map((row) => new Game(row));
    }

    static async updateById(id, { name, medium, genre }) {
        const existingGame = await Game.getById(id);
        const newName = name ?? existingGame.name;
        const newMedium = medium ?? existingGame.medium;
        const newGenre = genre ?? existingGame.genre;

        const { rows } = await pool.query('UPDATE games SET name=$1, medium=$2, genre=$3 WHERE id=$4 RETURNING *', [newName, newMedium, newGenre, id]);
        return new Game(rows[0]);
    }
}
