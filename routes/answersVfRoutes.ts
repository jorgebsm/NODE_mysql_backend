import express, { Router } from 'express';

import answersVfController from '../controllers/answersVfController';

class answersVfRoutes {

    router: Router = Router();

    constructor() {
        this.config();
    }

    config() {
        this.router.get('/', answersVfController.list);
        this.router.get('/:id', answersVfController.getOne);
        this.router.get('/byIdOptionQuestionVf/:id_option_question_vf', answersVfController.getbyIdOptionQuestionVf);
        this.router.get('/byIdOptionQuestionVf/:id_option_question_vf/attempt/:attempt', answersVfController.getbyIdOptionQuestionVfAndAttempt);
        this.router.get('/byIdOptionQuestionVf/:id_option_question_vf/idUsuario/:id_usuario/attempt/:attempt', answersVfController.getAnswerVfByIdOptionQuestionVfAndIdUsuarioAndAttempt);
        this.router.get('/byIdOptionQuestionVf2/:id_option_question_vf/idUsuario/:id_usuario/attempt/:attempt', answersVfController.getAnswerVfByIdOptionQuestionVfAndIdUsuarioAndAttempt2);
        this.router.post('/', answersVfController.create);
        this.router.put('/:id', answersVfController.update);
        this.router.delete('/:id', answersVfController.delete);
        this.router.get('/IDsByIdOptionQuestionVf/:id_option_question_vf/attempt/:attempt', answersVfController.getIDsUsuariosbyIdOptionQuestionVfAndAttempt);
    }

}

export default new answersVfRoutes().router;

