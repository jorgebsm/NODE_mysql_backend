import { Request, Response } from 'express';
import pool from '../database';
import { _answers_vf } from '../name_tables/tables';

class AnswerVfController {

    public async list(req: Request, res: Response): Promise<void> {
        const answers_vf = await pool.query('SELECT * FROM '+ _answers_vf +'');
        res.json(answers_vf);
    }

    public async getOne(req: Request, res: Response): Promise<any> {
        const { id } = req.params;
        const answers_vf = await pool.query('SELECT * FROM '+ _answers_vf +' WHERE id = ?', [id]);
        console.log(answers_vf.length);
        if (answers_vf.length > 0) {
            return res.json(answers_vf[0]);
        }
        res.status(404).json({ text: "The answer doesn't exits" });
    }

    public async getbyIdOptionQuestionVf(req: Request, res: Response): Promise<any> {
        const { id_option_question_vf } = req.params;
        const answers_vf = await pool.query('SELECT * FROM '+ _answers_vf +' WHERE ttr_option_question_vf_id = ?', [id_option_question_vf]);
        console.log(answers_vf.length);
        if (answers_vf.length > 0) {
            return res.json(answers_vf);
        }
        res.status(404).json({ text: "The answers_vf doesn't exits" });
    }

    public async getbyIdOptionQuestionVfAndAttempt(req: Request, res: Response): Promise<any> {
        const { id_option_question_vf } = req.params;
        const { attempt } = req.params;
        const answers_vf = await pool.query('SELECT * FROM '+ _answers_vf +' WHERE ttr_option_question_vf_id = ' + [id_option_question_vf] + ' AND attempt = ' + [attempt]);
        console.log(answers_vf.length);
        if (answers_vf.length > 0) {
            return res.json(answers_vf);
        }
        res.status(404).json({ text: "The answers_vf doesn't exits" });
    }

    public async getIDsUsuariosbyIdOptionQuestionVfAndAttempt(req: Request, res: Response): Promise<any> {
        const { id_option_question_vf } = req.params;
        const { attempt } = req.params;
        const id_users = await pool.query('SELECT usuario_id FROM '+ _answers_vf +' WHERE ttr_option_question_vf_id = ' + [id_option_question_vf] + ' AND attempt = ' + [attempt]);
        console.log(id_users.length);
        if (id_users.length > 0) {
            return res.json(id_users);
        }
        res.status(404).json({ text: "The id doesn't exits" });
    }

    public async getAnswerVfByIdOptionQuestionVfAndIdUsuarioAndAttempt(req: Request, res: Response): Promise<any> {

        const { id_option_question_vf, id_usuario, attempt } = req.params;
        const answers_vf = await pool.query('SELECT * FROM '+ _answers_vf +' WHERE ttr_option_question_vf_id = ' + [id_option_question_vf] + ' AND usuario_id = "' + [id_usuario] + '" AND attempt = ' + [attempt]);

        if (answers_vf.length > 0) {
            return res.json(answers_vf[answers_vf.length-1]);
        }
        res.status(404).json({ text: "The answer doesn't exits" });
    }

    public async getAnswerVfByIdOptionQuestionVfAndIdUsuarioAndAttempt2(req: Request, res: Response): Promise<any> {

        console.log(req.params);
        

        const { id_option_question_vf, id_usuario, attempt } = req.params;
        const answers_vf = await pool.query('SELECT * FROM '+ _answers_vf +' WHERE ttr_option_question_vf_id = ' + [id_option_question_vf] + ' AND usuario_id = "' + [id_usuario] + '" AND attempt = ' + [attempt]);

        if (answers_vf.length > 0) {
            return res.json(answers_vf[0]);
        }
        res.status(404).json({ text: "The answer doesn't exits" });
    }

    public async create(req: Request, res: Response): Promise<void> {
        await pool.query('INSERT INTO '+ _answers_vf +' set ?', [req.body]);
        res.json({ message: 'answer Saved' });
    }

    public async update(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const oldAnswer = req.body;
        await pool.query('UPDATE '+ _answers_vf +' set ? WHERE id = ?', [req.body, id]);
        res.json({ message: "The answer was Updated" });
    }

    public async delete(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        await pool.query('DELETE FROM '+ _answers_vf +' WHERE id = ?', [id]);
        res.json({ message: "The answer was deleted" });
    }
    
}

const answerVfController = new AnswerVfController;
export default answerVfController;