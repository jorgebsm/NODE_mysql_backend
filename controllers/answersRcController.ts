import { Request, Response } from 'express';
import pool from '../database';
import { _answers_rc } from '../name_tables/tables';

class AnswerRcController {

    public async list(req: Request, res: Response): Promise<void> {
        const answers_rc = await pool.query('SELECT * FROM '+ _answers_rc +'');
        res.json(answers_rc);
    }

    public async getOne(req: Request, res: Response): Promise<any> {
        const { id } = req.params;
        const answers_rc = await pool.query('SELECT * FROM '+ _answers_rc +' WHERE id = ?', [id]);
        console.log(answers_rc.length);
        if (answers_rc.length > 0) {
            return res.json(answers_rc[0]);
        }
        res.status(404).json({ text: "The answer doesn't exits" });
    }

    public async getbyIdQuestion(req: Request, res: Response): Promise<any> {
        const { id_question } = req.params;
        const answers_rc = await pool.query('SELECT * FROM '+ _answers_rc +' WHERE ttr_question_id = ?', [id_question]);
        console.log(answers_rc.length);
        if (answers_rc.length > 0) {
            return res.json(answers_rc);
        }
        res.status(404).json({ text: "The answers_rc doesn't exits" });
    }

    public async getbyIdQuestionAndAttempt(req: Request, res: Response): Promise<any> {
        const { id_question } = req.params;
        const { attempt } = req.params;
        const answers_rc = await pool.query('SELECT * FROM '+ _answers_rc +' WHERE ttr_question_id = ' + [id_question] + ' AND attempt = ' + [attempt]);
        console.log(answers_rc.length);
        if (answers_rc.length > 0) {
            return res.json(answers_rc);
        }
        res.status(404).json({ text: "The answers_rc doesn't exits" });
    }

    public async getIDsUsuariosbyIdQuestionAndAttempt(req: Request, res: Response): Promise<any> {
        const { id_question } = req.params;
        const { attempt } = req.params;
        const id_users = await pool.query('SELECT usuario_id FROM '+ _answers_rc +' WHERE ttr_question_id = ' + [id_question] + ' AND attempt = ' + [attempt]);
        console.log(id_users.length);
        if (id_users.length > 0) {
            return res.json(id_users);
        }
        res.status(404).json({ text: "The id doesn't exits" });
    }

    public async getAnswerRcByIdQuestionAndIdUsuarioAndAttempt(req: Request, res: Response): Promise<any> {

        const { id_question, id_usuario, attempt } = req.params;
        const answers_rc = await pool.query('SELECT * FROM '+ _answers_rc +' WHERE ttr_question_id = ' + [id_question] + ' AND usuario_id = "' + [id_usuario] + '" AND attempt = ' + [attempt]);

        if (answers_rc.length > 0) {
            return res.json(answers_rc[answers_rc.length-1]);
        }
        res.status(404).json({ text: "The answer doesn't exits" });
    }

    public async create(req: Request, res: Response): Promise<void> {
        await pool.query('INSERT INTO '+ _answers_rc +' set ?', [req.body]);
        res.json({ message: 'answer Saved' });
    }

    public async update(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const oldAnswer = req.body;
        await pool.query('UPDATE '+ _answers_rc +' set ? WHERE id = ?', [req.body, id]);
        res.json({ message: "The answer was Updated" });
    }

    public async delete(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        await pool.query('DELETE FROM '+ _answers_rc +' WHERE id = ?', [id]);
        res.json({ message: "The answer was deleted" });
    }

}

const answerRcController = new AnswerRcController;
export default answerRcController;
