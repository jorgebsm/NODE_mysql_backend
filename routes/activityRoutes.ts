import express, { Router } from 'express';

import activityController from '../controllers/activityController';

class ActivityRouter {

    router: Router = Router();

    constructor() {
        this.config();
    }

    config() {
        this.router.get('/', activityController.list);
        this.router.get('/:id', activityController.getOne);
        this.router.get('/byTypeActivity/:type_activity', activityController.getOneByTypeActivity);
        this.router.get('/byIdUser/:id_usuario', activityController.getAllByIdUser);
        this.router.get('/byMid/:mid', activityController.getAllByMid);
        this.router.get('/byPin/:pin', activityController.getOneByPin);
        this.router.get('/existePin/:pin', activityController.existePin);
        this.router.post('/', activityController.create);
        this.router.put('/:id', activityController.update);
        this.router.delete('/:id', activityController.delete);
    }

}

export default new ActivityRouter().router;

