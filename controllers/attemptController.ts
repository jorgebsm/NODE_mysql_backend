import { Request, Response } from 'express';
import pool from '../database';
import { _attempts } from '../name_tables/tables';

class AttemptController {

    public async list(req: Request, res: Response): Promise<void> {
        const attempts = await pool.query('SELECT * FROM '+ _attempts +'');
        res.json(attempts);
    }

    public async getOne(req: Request, res: Response): Promise<any> {
        const { id } = req.params;
        const attempts = await pool.query('SELECT * FROM '+ _attempts +' WHERE id = ?', [id]);
        console.log(attempts.length);
        if (attempts.length > 0) {
            return res.json(attempts[0]);
        }
        res.status(404).json({ text: "The attempt doesn't exits" });
    }

    public async getByIdActivity(req: Request, res: Response): Promise<any> {
        const { id_activity } = req.params;
        const attempts = await pool.query('SELECT * FROM '+ _attempts +' WHERE ttr_activity_id = ?', [id_activity]);
        console.log(attempts.length);
        if (attempts.length > 0) {
            return res.json(attempts);
        }
        res.status(404).json({ text: "The attempt doesn't exits" });
    }

    public async getUltimoAttemptByIdActivity(req: Request, res: Response): Promise<any> {
        const { id_activity } = req.params;
        const attempts = await pool.query('SELECT * FROM '+ _attempts +' WHERE (SELECT max(n_attempt) FROM attempts) AND ttr_activity_id = ?', [id_activity]);
        
        console.log(attempts.length);
        if (attempts.length > 0) {
            return res.json(attempts);
        }

        res.status(404).json({ text: "The attempt doesn't exits" });
    }

    public async getByNumAttempt(req: Request, res: Response): Promise<any> {
        const { num } = req.params;
        const attempts = await pool.query('SELECT * FROM '+ _attempts +' WHERE n_attempt = ?', [num]);
        console.log(attempts.length);
        if (attempts.length > 0) {
            return res.json(attempts[0]);
        }
        res.status(404).json({ text: "The attempt doesn't exits" });
    }

    public async create(req: Request, res: Response): Promise<void> {
        await pool.query('INSERT INTO '+ _attempts +' set ?', [req.body]);
        res.json({ message: 'Saved' });
        // await pool.query('INSERT INTO attempts set ?', [req.body]);
        // const last_id = await pool.query('SELECT LAST_INSERT_ID() AS lid;');
        
        // if (last_id.length > 0) {
        //     return res.json(last_id[0].lid);
        // }
    }

    public async update(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const oldAttempt = req.body;
        await pool.query('UPDATE '+ _attempts +' set ? WHERE id = ?', [req.body, id]);
        res.json({ message: "The attempt was Updated" });
    }

    public async delete(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        await pool.query('DELETE FROM '+ _attempts +' WHERE id = ?', [id]);
        res.json({ message: "The attempt was deleted" });
    }
}

const attemptController = new AttemptController;
export default attemptController;