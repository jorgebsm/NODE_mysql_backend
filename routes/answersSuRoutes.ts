import express, { Router } from 'express';

import answersSuController from '../controllers/answersSuController';

class answersSuRoutes {

    router: Router = Router();

    constructor() {
        this.config();
    }

    config() {
        this.router.get('/', answersSuController.list);
        this.router.get('/:id', answersSuController.getOne);
        this.router.get('/byIdOptionQuestionSu/:id_option_question_su', answersSuController.getbyIdOptionQuestionSu);
        this.router.get('/byIdOptionQuestionSu/:id_option_question_su/attempt/:attempt', answersSuController.getbyIdOptionQuestionSuAndAttempt);
        this.router.get('/byIdOptionQuestionSu/:id_option_question_su/idUsuario/:id_usuario/attempt/:attempt', answersSuController.getAnswerSuByIdOptionQuestionSuAndIdUsuarioAndAttempt);
        this.router.get('/byIdOptionQuestionSu2/:id_option_question_su/idUsuario/:id_usuario/attempt/:attempt', answersSuController.getAnswerSuByIdOptionQuestionSuAndIdUsuarioAndAttempt2);
        this.router.post('/', answersSuController.create);
        this.router.put('/:id', answersSuController.update);
        this.router.delete('/:id', answersSuController.delete);
        this.router.get('/IDsByIdOptionQuestionSu/:id_option_question_su/attempt/:attempt', answersSuController.getIDsUsuariosbyIdOptionQuestionSuAndAttempt);
    }

}

export default new answersSuRoutes().router;

