import { Request, Response } from 'express';
import pool from '../database';
import { _answers_su } from '../name_tables/tables';

class AnswerSuController {

    public async list(req: Request, res: Response): Promise<void> {
        const answers_su = await pool.query('SELECT * FROM '+ _answers_su +'');
        res.json(answers_su);
    }

    public async getOne(req: Request, res: Response): Promise<any> {
        const { id } = req.params;
        const answers_su = await pool.query('SELECT * FROM '+ _answers_su +' WHERE id = ?', [id]);
        console.log(answers_su.length);
        if (answers_su.length > 0) {
            return res.json(answers_su[0]);
        }
        res.status(404).json({ text: "The answer doesn't exits" });
    }

    public async getbyIdOptionQuestionSu(req: Request, res: Response): Promise<any> {
        const { id_option_question_su } = req.params;
        const answers_su = await pool.query('SELECT * FROM '+ _answers_su +' WHERE ttr_option_question_su_id = ?', [id_option_question_su]);
        console.log(answers_su.length);
        if (answers_su.length > 0) {
            return res.json(answers_su);
        }
        res.status(404).json({ text: "The answers_su doesn't exits" });
    }

    public async getbyIdOptionQuestionSuAndAttempt(req: Request, res: Response): Promise<any> {
        const { id_option_question_su } = req.params;
        const { attempt } = req.params;
        const answers_su = await pool.query('SELECT * FROM '+ _answers_su +' WHERE ttr_option_question_su_id = ' + [id_option_question_su] + ' AND attempt = ' + [attempt]);
        console.log(answers_su.length);
        if (answers_su.length > 0) {
            return res.json(answers_su);
        }
        res.status(404).json({ text: "The answers_su doesn't exits" });
    }

    public async getIDsUsuariosbyIdOptionQuestionSuAndAttempt(req: Request, res: Response): Promise<any> {
        const { id_option_question_su } = req.params;
        const { attempt } = req.params;
        const id_users = await pool.query('SELECT usuario_id FROM '+ _answers_su +' WHERE ttr_option_question_su_id = ' + [id_option_question_su] + ' AND attempt = ' + [attempt]);
        if (id_users.length > 0) {
            return res.json(id_users);
        }
        res.status(404).json({ text: "The id doesn't exits" });
    }

    public async getAnswerSuByIdOptionQuestionSuAndIdUsuarioAndAttempt(req: Request, res: Response): Promise<any> {

        const { id_option_question_su, id_usuario, attempt } = req.params;
        const answers_su = await pool.query('SELECT * FROM '+ _answers_su +' WHERE ttr_option_question_su_id = ' + [id_option_question_su] + ' AND usuario_id = "' + [id_usuario] + '" AND attempt = ' + [attempt]);

        if (answers_su.length > 0) {
            return res.json(answers_su[answers_su.length-1]);
        }
        res.status(404).json({ text: "The answer doesn't exits" });
    }

    public async getAnswerSuByIdOptionQuestionSuAndIdUsuarioAndAttempt2(req: Request, res: Response): Promise<any> {

        const { id_option_question_su, id_usuario, attempt } = req.params;
        const answers_su = await pool.query('SELECT * FROM '+ _answers_su +' WHERE ttr_option_question_su_id = ' + [id_option_question_su] + ' AND usuario_id = "' + [id_usuario] + '" AND attempt = ' + [attempt]);

        if (answers_su.length > 0) {
            return res.json(answers_su[0]);
        }
        res.status(404).json({ text: "The answer doesn't exits" });
    }

    public async create(req: Request, res: Response): Promise<void> {
        await pool.query('INSERT INTO '+ _answers_su +' set ?', [req.body]);
        res.json({ message: 'answer Saved' });
    }

    public async update(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const oldAnswer = req.body;
        await pool.query('UPDATE '+ _answers_su +' set ? WHERE id = ?', [req.body, id]);
        res.json({ message: "The answer was Updated" });
    }

    public async delete(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        await pool.query('DELETE FROM '+ _answers_su +' WHERE id = ?', [id]);
        res.json({ message: "The answer was deleted" });
    }

}

const answerSuController = new AnswerSuController;
export default answerSuController;