import express, { Router } from 'express';

import optionsQuestionVfController from '../controllers/optionsQuestionVfController';

class optionsQuestionsVfRoutes {

    router: Router = Router();

    constructor() {
        this.config();
    }

    config() {
        this.router.get('/', optionsQuestionVfController.list);
        this.router.get('/:id', optionsQuestionVfController.getOne);
        this.router.get('/byIdQuestion/:question_id', optionsQuestionVfController.getOneByIdQuestion);
        this.router.post('/', optionsQuestionVfController.create);
        this.router.put('/:id', optionsQuestionVfController.update);
        this.router.delete('/:id', optionsQuestionVfController.delete);
    }

}

export default new optionsQuestionsVfRoutes().router;
