import express, { Router } from 'express';
import userController from '../controllers/usersController';
import multer from '../libs/multerPhoto'
import authAPI from '../libs/authAPI';

class UserRouter {

    router: Router = Router();

    constructor() {
        this.config();
    }

    config() {
        this.router.get('/', authAPI.validator, userController.list);
        this.router.get('/:id', authAPI.validator, userController.getOne);
        this.router.get('/byEmail/:email', authAPI.validator, userController.getByEmailUser);
        this.router.post('/register', authAPI.validator, userController.register);
        this.router.post('/login', authAPI.validator, userController.login);
        this.router.put('/:id', userController.update);
        this.router.delete('/:id', authAPI.validator, userController.delete);
        this.router.get('/dataToken/:token', authAPI.validator, userController.dataToken);
        this.router.put('/upload/:id', multer.single('file'), userController.upload);
        this.router.get('/:id/pass/:password', authAPI.validator, userController.verifyPassword);

    }

}

export default new UserRouter().router;

