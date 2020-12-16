import { Request, Response } from 'express';
import pool from '../database';
import { _quizzes } from '../name_tables/tables';

class QuizController {

    public async list(req: Request, res: Response) {
        const quizzes = await pool.query('SELECT * FROM '+ _quizzes +'');
        res.json(quizzes);
    }

    public async getOne(req: Request, res: Response): Promise<any> {
        const { id } = req.params;
        const quizzes = await pool.query('SELECT * FROM '+ _quizzes +' WHERE id = ?', [id]);
        console.log(quizzes.length);
        if (quizzes.length > 0) {
            return res.json(quizzes[0]);
        }
        res.status(404).json({ text: "The quiz doesn't exits" });
    }

    public async getOneByIdActivity(req: Request, res: Response): Promise<any> {
        const { id_activity } = req.params;
        const quizzes = await pool.query('SELECT * FROM '+ _quizzes +' WHERE ttr_activity_id = ?', [id_activity]);
        console.log(quizzes.length);
        if (quizzes.length > 0) {
            return res.json(quizzes[0]);
        }
        res.status(404).json({ text: "The quiz doesn't exits" });
    }

    public async create(req: Request, res: Response): Promise<void> {
        await pool.query('INSERT INTO '+ _quizzes +' set ?', [req.body]);
        res.json({ message: 'Saved' });
        // const last_id = await pool.query('SELECT LAST_INSERT_ID() AS lid;');
        
        // if (last_id.length > 0) {
        //     return res.json(last_id[0].lid);
        // }
    }
    
    public async update(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const oldQuiz = req.body;
        await pool.query('UPDATE '+ _quizzes +' set ? WHERE id = ?', [req.body, id]);
        res.json({ message: "The quiz was Updated" });
    }

    public async delete(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        await pool.query('DELETE FROM '+ _quizzes +' WHERE id = ?', [id]);
        res.json({ message: "The quiz was deleted" });
    }
}

const quizController = new QuizController;
export default quizController;