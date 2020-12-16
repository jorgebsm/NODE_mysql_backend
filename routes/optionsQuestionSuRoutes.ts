import express, { Router } from 'express';

import optionsQuestionSuController from '../controllers/optionsQuestionSuController';

class questionsVfRoutes {

    router: Router = Router();

    constructor() {
        this.config();
    }

    config() {
        this.router.get('/', optionsQuestionSuController.list);
        this.router.get('/:id', optionsQuestionSuController.getOne);
        this.router.get('/byIdQuestion/:id_question', optionsQuestionSuController.getOneByIdQuestion);
        this.router.post('/', optionsQuestionSuController.create);
        this.router.put('/:id', optionsQuestionSuController.update);
        this.router.delete('/:id', optionsQuestionSuController.delete);
    }

}

export default new questionsVfRoutes().router;

