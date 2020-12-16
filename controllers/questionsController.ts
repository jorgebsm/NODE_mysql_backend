import { Request, Response } from 'express';
import pool from '../database';
import { _questions } from '../name_tables/tables';

class QuestionsController {

    public async list(req: Request, res: Response): Promise<void> {
        const questions = await pool.query('SELECT * FROM '+ _questions +'');        
        res.json(questions);
    }

    public async getOne(req: Request, res: Response): Promise<any> {
        const { id } = req.params;
        const questions = await pool.query('SELECT * FROM '+ _questions +' WHERE id = ?', [id]);
        if (questions.length > 0) {
            return res.json(questions[0]);
        }
        res.status(404).json({ text: "The question doesn't exits" });
    }

    public async getOneByIdActivity(req: Request, res: Response): Promise<any> {
        const { id_activity } = req.params;
        const questions = await pool.query('SELECT * FROM '+ _questions +' WHERE ttr_activity_id = ?', [id_activity]);
        if (questions.length > 0) {
            return res.json(questions[0]);
        }
        res.status(404).json({ text: "The questions doesn't exits" });
    }

    public async getAllByIdQuiz(req: Request, res: Response): Promise<any> {
        const { id_quiz } = req.params;
        const questions = await pool.query('SELECT * FROM '+ _questions +' WHERE ttr_quiz_id = ?', [id_quiz]);
        if (questions.length > 0) {
            return res.json(questions);
        }
        res.status(404).json({ text: "The question doesn't exits" });
    }

    public async getAllByIdPresentation(req: Request, res: Response): Promise<any> {
        const { id_presentation } = req.params;
        const questions = await pool.query('SELECT * FROM '+ _questions +' WHERE ttr_presentation_id = ?', [id_presentation]);
        if (questions.length > 0) {
            return res.json(questions);
        }
        res.status(404).json({ text: "The question doesn't exits" });
    }

    public async getAllByIdSlideQuestion(req: Request, res: Response): Promise<any> {
        const { id_slide_question } = req.params;
        const questions = await pool.query('SELECT * FROM '+ _questions +' WHERE ttr_slide_question_id = ?', [id_slide_question]);
        if (questions.length > 0) {
            return res.json(questions);
        }
        res.status(404).json({ text: "The question doesn't exits" });
    }

    public async byIdPresentationAndNSlide(req: Request, res: Response): Promise<any> {
        const { id_presentation } = req.params;   
        const { n_slide } = req.params;     

        const questions = await pool.query('SELECT * FROM '+ _questions +' WHERE ttr_presentation_id = ' + [id_presentation] + ' AND n_slide = ' + [n_slide]);

        if (questions.length > 0) {
            return res.json(questions);
        }
        res.status(404).json({ text: "The quiz doesn't exits" });
    }

    public async create(req: Request, res: Response): Promise<void> {
        await pool.query('INSERT INTO '+ _questions +' set ?', [req.body]);
        res.json({ message: 'Saved' });
        // const last_id = await pool.query('SELECT LAST_INSERT_ID() AS lid;');
        
        // if (last_id.length > 0) {
        //     return res.json(last_id[0].lid);
        // }
    }

    public async update(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const oldQuestion = req.body;
        await pool.query('UPDATE '+ _questions +' set ? WHERE id = ?', [req.body, id]);
        res.json({ message: "The Question was Updated" });
    }

    public async delete(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        await pool.query('DELETE FROM '+ _questions +' WHERE id = ?', [id]);
        res.json({ message: "The question was deleted" });
    }

    public async upload(req: Request, res: Response): Promise<void> {                        

        const newFile = { nameFile: req.file.filename }
        res.json({ nameFile: newFile.nameFile });

    }
}

const questionsController = new QuestionsController;
export default questionsController;