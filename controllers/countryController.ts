import { Request, Response } from 'express';
import pool from '../database';
import { _countries } from '../name_tables/tables';

class ActivityController {

    public async list(req: Request, res: Response): Promise<void> {
        const activities = await pool.query('SELECT * FROM '+ _countries +'');
        res.json(activities);
    }

    public async getOne(req: Request, res: Response): Promise<any> {
        const { id } = req.params;
        const countries = await pool.query('SELECT * FROM '+ _countries +' WHERE id = ?', [id]);
        if (countries.length > 0) {
            return res.json(countries[0]);
        }
        res.status(404).json({ text: "The country doesn't exits" });
    }

}

const activityController = new ActivityController;
export default activityController;