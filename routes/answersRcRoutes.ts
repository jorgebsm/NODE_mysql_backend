import express, { Router } from 'express';

import answersRcController from '../controllers/answersRcController';

class answersRcRoutes {

    router: Router = Router();
    
    constructor() {
        this.config();
    }

    config() {
        this.router.get('/', answersRcController.list);
        this.router.get('/:id', answersRcController.getOne);
        this.router.get('/byIdQuestion/:id_question', answersRcController.getbyIdQuestion);
        this.router.get('/byIdQuestion/:id_question/attempt/:attempt', answersRcController.getbyIdQuestionAndAttempt);
        this.router.get('/idUsuarioByIdQuestion/:id_question/attempt/:attempt', answersRcController.getIDsUsuariosbyIdQuestionAndAttempt);
        this.router.get('/idQuestion/:id_question/idUsuario/:id_usuario/attempt/:attempt', answersRcController.getAnswerRcByIdQuestionAndIdUsuarioAndAttempt);
        this.router.post('/', answersRcController.create);
        this.router.put('/:id', answersRcController.update);
        this.router.delete('/:id', answersRcController.delete);
    }

}

export default new answersRcRoutes().router;