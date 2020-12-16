import express, { Router } from 'express';

import optionsQuestionRcController from '../controllers/optionsQuestionRcController';

class questionsRcRoutes {

    router: Router = Router();

    constructor() {
        this.config();
    }

    config() {
        this.router.get('/', optionsQuestionRcController.list);
        this.router.get('/:id', optionsQuestionRcController.getOne);
        this.router.get('/byIdQuestion/:id_question', optionsQuestionRcController.getByIdQuestion);
        this.router.post('/', optionsQuestionRcController.create);
        this.router.put('/:id', optionsQuestionRcController.update);
        this.router.delete('/:id', optionsQuestionRcController.delete);
    }

}

export default new questionsRcRoutes().router;
