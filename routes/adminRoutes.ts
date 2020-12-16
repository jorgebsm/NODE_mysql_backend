import express, { Router } from 'express';

import adminController from '../controllers/adminController';

class AdminRouter {

    router: Router = Router();

    constructor() {
        this.config();
    }

    config() {
        this.router.get('/numActivities', adminController.getNumActivities);
        this.router.get('/numPresentations', adminController.getNumPresentations);
        this.router.get('/numQuizzes', adminController.getNumQuizzes);
        this.router.get('/numFastQuestions', adminController.getNumFastQuestions);
        this.router.get('/numQuestions', adminController.getNumQuestions);
        this.router.get('/numQuestionsVf', adminController.getNumQuestionsVf);
        this.router.get('/numQuestionsSu', adminController.getNumQuestionsSu);
        this.router.get('/numQuestionsRc', adminController.getNumQuestionsRc);
        this.router.get('/numAnswersVf', adminController.getNumAnswersVf);
        this.router.get('/numAnswersSu', adminController.getNumAnswersSu);
        this.router.get('/numAnswersRc', adminController.getNumAnswersRc);

        this.router.get('/numActivitiesByIdProfesor/:id_usuario', adminController.getNumActivitiesByIdProfesor);
        this.router.get('/numPresentationsByIdProfesor/:id_usuario', adminController.getNumPresentationsByIdProfesor);
        this.router.get('/numQuizzesByIdProfesor/:id_usuario', adminController.getNumQuizzesByIdProfesor);
        this.router.get('/numFastQuestionsByIdProfesor/:id_usuario', adminController.getNumFastQuestionsByIdProfesor);
        this.router.get('/numQuestionsByIdProfesor/:id_usuario', adminController.getNumQuestionsByIdProfesor);
        this.router.get('/numQuestionsVfByIdProfesor/:id_usuario', adminController.getNumQuestionsVfByIdProfesor);
        this.router.get('/numQuestionsSuByIdProfesor/:id_usuario', adminController.getNumQuestionsSuByIdProfesor);
        this.router.get('/numQuestionsRcByIdProfesor/:id_usuario', adminController.getNumQuestionsRcByIdProfesor);
    }

}

export default new AdminRouter().router;

