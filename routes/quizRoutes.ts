import express, { Router } from 'express';

import quizController from '../controllers/quizController';

class QuizRoutes {

    router: Router = Router();

    constructor() {
        this.config();
    }

    config() {
        this.router.get('/', quizController.list);
        this.router.get('/:id', quizController.getOne);
        this.router.get('/byIdActivity/:id_activity', quizController.getOneByIdActivity);
        this.router.post('/', quizController.create);
        this.router.put('/:id', quizController.update);
        this.router.delete('/:id', quizController.delete);
    }

}

export default new QuizRoutes().router;

