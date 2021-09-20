import pool from '../utils/pool.js';

export default class Game {
    id;
    title;
    medium;
    genre;

    constructor(row) {
        this.id = row.id;
        this.title = row.title;
        this.medium= row.medium;
        this.genre = row.genre;
    }

    static async insert({ title, medium, genre }) {
        const { rows } = await pool.query('INSERT INTO games (title, medium, genre) VALUES ($1, $2, $3) RETURNING *', [title, medium, genre]);
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

    static async updateById(id, { title, medium, genre }) {
        const existingGame = await Game.getById(id);
        const newtitle = title ?? existingGame.title;
        const newMedium = medium ?? existingGame.medium;
        const newGenre = genre ?? existingGame.genre;

        const { rows } = await pool.query('UPDATE games SET title=$1, medium=$2, genre=$3 WHERE id=$4 RETURNING *', [newtitle, newMedium, newGenre, id]);
        return new Game(rows[0]);
    }

    static async deleteById(id) {
        const { rows } = await pool.query('DELETE FROM games WHERE id=$1 RETURNING *', [id]);

        return new Game(rows[0]);
    }
}
