import { Request, Response } from 'express';
import pool from '../database';
import { _activities } from '../name_tables/tables';

class ActivityController {

    public async list(req: Request, res: Response): Promise<void> {
        const activities = await pool.query('SELECT * FROM '+ _activities +'');
        res.json(activities);
    }

    public async getOne(req: Request, res: Response): Promise<any> {
        const { id } = req.params;
        const activities = await pool.query('SELECT * FROM '+ _activities +' WHERE id = ?', [id]);
        // console.log(activities.length);
        if (activities.length > 0) {
            return res.json(activities[0]);
        }
        res.status(404).json({ text: "The activity doesn't exits" });
    }

    public async getOneByTypeActivity(req: Request, res: Response): Promise<any> {
        const { type_activity } = req.params;
        const activities = await pool.query('SELECT * FROM '+ _activities +' WHERE type_activity = ?', [type_activity]);
        // console.log(activities.length);
        if (activities.length > 0) {
            return res.json(activities);
        }
        res.status(404).json({ text: "The activity doesn't exits" });
    }

    public async getOneByPin(req: Request, res: Response): Promise<any> {
        const { pin } = req.params;
        const activities = await pool.query('SELECT * FROM '+ _activities +' WHERE pin = ?', [pin]);
        if (activities.length > 0) {
            return res.json(activities[0]);
        }
        res.status(404).json({ text: "The activity doesn't exits" });
    }

    public async existePin(req: Request, res: Response): Promise<any> {
        const { pin } = req.params;
        const activities = await pool.query('SELECT * FROM '+ _activities +' WHERE pin = ?', [pin]);
        if (activities.length > 0) {
            return res.json(true);
        } else {
            return res.json(false);
        }
        res.status(404).json({ text: "The activity doesn't exits" });
    }

    public async getAllByIdUser(req: Request, res: Response): Promise<any> {
        const { id_usuario } = req.params;
        const activities = await pool.query('SELECT * FROM '+ _activities +' WHERE ttr_user_id = ?', [id_usuario]);
        if (activities.length > 0) {
            return res.json(activities);
        }
        res.status(404).json({ text: "The activity doesn't exits" });
    }

    public async getAllByMid(req: Request, res: Response): Promise<any> {
        const { mid } = req.params;
        const activities = await pool.query('SELECT * FROM '+ _activities +' WHERE modulo_id = ?', [mid]);
        if (activities.length > 0) {
            return res.json(activities);
        }
        // res.status(404).json({ text: "The activity doesn't exits" });
    }

    public async create(req: Request, res: Response): Promise<void> {
        await pool.query('INSERT INTO '+ _activities +' set ?', [req.body]);
        res.json({ message: 'Saved' });
        // const insert = await pool.query('INSERT INTO activities set ?', [req.body]);
        // const last_id = await pool.query('SELECT LAST_INSERT_ID();');
        
        // if (last_id.length > 0) {
        //     return res.json(last_id[0]);
        // }
    }

    public async update(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const oldActivity = req.body;
        await pool.query('UPDATE '+ _activities +' set ? WHERE id = ?', [req.body, id]);
        res.json({ message: "The activity was Updated" });
    }

    public async delete(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        await pool.query('DELETE FROM '+ _activities +' WHERE id = ?', [id]);
        res.json({ message: "The activity was deleted" });
    }
}

const activityController = new ActivityController;
export default activityController;