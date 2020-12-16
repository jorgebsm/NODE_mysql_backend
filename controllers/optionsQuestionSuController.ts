import { Request, Response } from 'express';
import pool from '../database';
import { _options_question_su } from '../name_tables/tables';

class OptionsQuestionSuController {

    public async list(req: Request, res: Response): Promise<void> {
        const options_question_su = await pool.query('SELECT * FROM '+ _options_question_su +'');
        res.json(options_question_su);
    }

    public async getOne(req: Request, res: Response): Promise<any> {
        const { id } = req.params;
        const options_question_su = await pool.query('SELECT * FROM '+ _options_question_su +' WHERE id = ?', [id]);
        console.log(options_question_su.length);
        if (options_question_su.length > 0) {
            return res.json(options_question_su[0]);
        }
        res.status(404).json({ text: "The option doesn't exits" });
    }

    public async getOneByIdQuestion(req: Request, res: Response): Promise<any> {
        const { id_question } = req.params;
        const options_question_su = await pool.query('SELECT * FROM '+ _options_question_su +' WHERE ttr_question_id = ?', [id_question]);
        console.log(options_question_su.length);
        if (options_question_su.length > 0) {
            return res.json(options_question_su);
        }
        res.status(404).json({ text: "The option doesn't exits" });
    }

    public async create(req: Request, res: Response): Promise<void> {
        await pool.query('INSERT INTO '+ _options_question_su +' set ?', [req.body]);
        res.json({ message: 'Saved' });
        // const last_id = await pool.query('SELECT LAST_INSERT_ID() AS lid;');
        
        // if (last_id.length > 0) {
        //     return res.json(last_id[0].lid);
        // }
    }

    public async update(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const oldQuestion = req.body;
        await pool.query('UPDATE '+ _options_question_su +' set ? WHERE id = ?', [req.body, id]);
        res.json({ message: "The option was Updated" });
    }

    public async delete(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        await pool.query('DELETE FROM '+ _options_question_su +' WHERE id = ?', [id]);
        res.json({ message: "The option was deleted" });
    }
}

const optionsQuestionSuController = new OptionsQuestionSuController;
export default optionsQuestionSuController;