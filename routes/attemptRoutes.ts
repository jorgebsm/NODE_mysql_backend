import express, { Router } from 'express';

import attemptController from '../controllers/attemptController';

class ActivityRouter {

    router: Router = Router();

    constructor() {
        this.config();
    }

    config() {
        this.router.get('/', attemptController.list);
        this.router.get('/:id', attemptController.getOne);
        this.router.get('/byIdActivity/:id_activity', attemptController.getByIdActivity);
        this.router.get('/ultimoAttemptByIdActivity/:id_activity', attemptController.getUltimoAttemptByIdActivity);
        this.router.get('/byNumAttempt/:num', attemptController.getByNumAttempt);
        this.router.post('/', attemptController.create);
        this.router.put('/:id', attemptController.update);
        this.router.delete('/:id', attemptController.delete);
    }
}

export default new ActivityRouter().router;

