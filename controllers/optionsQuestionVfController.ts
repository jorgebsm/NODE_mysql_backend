import { Request, Response } from 'express';
import pool from '../database';
import { _options_question_vf } from '../name_tables/tables';

class OptionsQuestionVfController {

    public async list(req: Request, res: Response): Promise<void> {
        const option_question_vf = await pool.query('SELECT * FROM '+ _options_question_vf +'');
        res.json(option_question_vf);
    }

    public async getOne(req: Request, res: Response): Promise<any> {
        const { id } = req.params;
        const option_question_vf = await pool.query('SELECT * FROM '+ _options_question_vf +' WHERE id = ?', [id]);
        console.log(option_question_vf.length);
        if (option_question_vf.length > 0) {
            return res.json(option_question_vf[0]);
        }
        res.status(404).json({ text: "The option doesn't exits" });
    }

    public async getOneByIdQuestion(req: Request, res: Response): Promise<any> {
        const { question_id } = req.params;
        const option_question_vf = await pool.query('SELECT * FROM '+ _options_question_vf +' WHERE ttr_question_id = ?', [question_id]);
        console.log(option_question_vf.length);
        if (option_question_vf.length > 0) {
            return res.json(option_question_vf[0]);
        }
        res.status(404).json({ text: "The option doesn't exits" });
    }

    public async create(req: Request, res: Response): Promise<void> {
        await pool.query('INSERT INTO '+ _options_question_vf +' set ?', [req.body]);
        res.json({ message: 'Saved' });
        // const last_id = await pool.query('SELECT LAST_INSERT_ID() AS lid;');
        
        // if (last_id.length > 0) {
        //     return res.json(last_id[0].lid);
        // }
    }

    public async update(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const oldQuestion = req.body;
        await pool.query('UPDATE '+ _options_question_vf +' set ? WHERE id = ?', [req.body, id]);
        res.json({ message: "The option was Updated" });
    }

    public async delete(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        await pool.query('DELETE FROM '+ _options_question_vf +' WHERE id = ?', [id]);
        res.json({ message: "The option was deleted" });
    }
}

const optionsQuestionVfController = new OptionsQuestionVfController;
export default optionsQuestionVfController;
