import { Request, Response } from 'express';
import pool from '../database';
import { _activities } from '../name_tables/tables';
import { _questions } from '../name_tables/tables';
import { _answers_vf } from '../name_tables/tables' 
import { _answers_su } from '../name_tables/tables' 
import { _answers_rc } from '../name_tables/tables' 

class AdminController {

    public async getNumActivities(req: Request, res: Response): Promise<void> {
        const numActivities = await pool.query('SELECT count(*) AS nActivities FROM '+ _activities +'');
        res.json(numActivities[0].nActivities);
    }

    public async getNumPresentations(req: Request, res: Response): Promise<void> {
        const numPresentations = await pool.query('SELECT count(*) AS nPresentations FROM '+ _activities +' WHERE type_activity=1');
        res.json(numPresentations[0].nPresentations);
    }

    public async getNumQuizzes(req: Request, res: Response): Promise<void> {
        const numQuizzes = await pool.query('SELECT count(*) AS nQuizzes FROM '+ _activities +' WHERE type_activity=2');
        res.json(numQuizzes[0].nQuizzes);
    }

    public async getNumFastQuestions(req: Request, res: Response): Promise<void> {
        const numFastQuestions = await pool.query('SELECT count(*) AS nFastQuestions FROM '+ _activities +' WHERE type_activity=3');
        res.json(numFastQuestions[0].nFastQuestions);
    }

    public async getNumQuestions(req: Request, res: Response): Promise<void> {
        const numQuestions = await pool.query('SELECT count(*) AS nQuestions FROM '+ _questions +'');
        res.json(numQuestions[0].nQuestions);
    }

    public async getNumQuestionsVf(req: Request, res: Response): Promise<void> {
        const numQuestionsVf = await pool.query('SELECT count(*) AS nQuestionsVf FROM '+ _questions +' WHERE type_question=1');
        res.json(numQuestionsVf[0].nQuestionsVf);
    }

    public async getNumQuestionsSu(req: Request, res: Response): Promise<void> {
        const numQuestionsSu = await pool.query('SELECT count(*) nQuestionsSu FROM '+ _questions +' WHERE type_question=2');
        res.json(numQuestionsSu[0].nQuestionsSu);
    }

    public async getNumQuestionsRc(req: Request, res: Response): Promise<void> {
        const numQuestionsRc = await pool.query('SELECT count(*) AS nQuestionsRc FROM '+ _questions +' WHERE type_question=3');
        res.json(numQuestionsRc[0].nQuestionsRc);
    }

    public async getNumAnswersVf(req: Request, res: Response): Promise<void> {
        const numAnswersVf = await pool.query('SELECT count(*) AS nAnswersVf FROM '+ _answers_vf +'');
        res.json(numAnswersVf[0].nAnswersVf);
    }

    public async getNumAnswersSu(req: Request, res: Response): Promise<void> {
        const numAnswersSu = await pool.query('SELECT count(*) AS nAnswersSu FROM '+ _answers_su +'');
        res.json(numAnswersSu[0].nAnswersSu);
    }

    public async getNumAnswersRc(req: Request, res: Response): Promise<void> {
        const numAnswersRc = await pool.query('SELECT count(*) AS nAnswersRc FROM '+ _answers_rc +'');
        res.json(numAnswersRc[0].nAnswersRc);
    }

    /****************************************************************************************/

    public async getNumActivitiesByIdProfesor(req: Request, res: Response): Promise<void> {
        const { id_usuario } = req.params;
        const numActivities = await pool.query('SELECT count(*) AS nActivities FROM '+ _activities +' WHERE usuario_id = '+ id_usuario +'');
        res.json(numActivities[0].nActivities);
    }

    public async getNumPresentationsByIdProfesor(req: Request, res: Response): Promise<void> {
        const { id_usuario } = req.params;
        const numPresentations = await pool.query('SELECT count(*) AS nPresentations FROM '+ _activities +' WHERE type_activity=1');
        res.json(numPresentations[0].nPresentations);
    }

    public async getNumQuizzesByIdProfesor(req: Request, res: Response): Promise<void> {
        const { id_usuario } = req.params;
        const numQuizzes = await pool.query('SELECT count(*) AS nQuizzes FROM '+ _activities +' WHERE type_activity=2');
        res.json(numQuizzes[0].nQuizzes);
    }

    public async getNumFastQuestionsByIdProfesor(req: Request, res: Response): Promise<void> {
        const { id_usuario } = req.params;
        const numFastQuestions = await pool.query('SELECT count(*) AS nFastQuestions FROM '+ _activities +' WHERE type_activity=3');
        res.json(numFastQuestions[0].nFastQuestions);
    }

    public async getNumQuestionsByIdProfesor(req: Request, res: Response): Promise<void> {
        const { id_usuario } = req.params;
        const numQuestions = await pool.query('SELECT count(*) AS nQuestions FROM '+ _questions +'');
        res.json(numQuestions[0].nQuestions);
    }

    public async getNumQuestionsVfByIdProfesor(req: Request, res: Response): Promise<void> {
        const { id_usuario } = req.params;
        const numQuestionsVf = await pool.query('SELECT count(*) AS nQuestionsVf FROM '+ _questions +' WHERE type_question=1');
        res.json(numQuestionsVf[0].nQuestionsVf);
    }

    public async getNumQuestionsSuByIdProfesor(req: Request, res: Response): Promise<void> {
        const { id_usuario } = req.params;
        const numQuestionsSu = await pool.query('SELECT count(*) nQuestionsSu FROM '+ _questions +' WHERE type_question=2');
        res.json(numQuestionsSu[0].nQuestionsSu);
    }

    public async getNumQuestionsRcByIdProfesor(req: Request, res: Response): Promise<void> {
        const { id_usuario } = req.params;
        const numQuestionsRc = await pool.query('SELECT count(*) AS nQuestionsRc FROM '+ _questions +' WHERE type_question=3');
        res.json(numQuestionsRc[0].nQuestionsRc);
    }
}

const adminController = new AdminController;
export default adminController;