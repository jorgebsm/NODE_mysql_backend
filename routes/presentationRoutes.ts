import express, { Router } from 'express';
import presentationController from '../controllers/presentationController';
import multer from '../libs/multer';
import authAPI from '../libs/authAPI';

class PresentationRoutes {

    router: Router = Router();

    constructor() {
        this.config();
    }

    config() {
        this.router.get('/',authAPI.validator, presentationController.list);
        this.router.get('/:id', authAPI.validator, presentationController.getOne);
        this.router.get('/byIdActivity/:id_activity', authAPI.validator, presentationController.getOneByIdActivity);
        this.router.post('/', authAPI.validator, presentationController.create);
        this.router.put('/:id', authAPI.validator, presentationController.update);
        this.router.delete('/:id', authAPI.validator, presentationController.delete);
        this.router.put('/upload/:id', multer.single('file'), presentationController.upload);
    }

}

export default new PresentationRoutes().router;

