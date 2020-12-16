import express, { Router } from 'express';
import questionsController from '../controllers/questionsController';
import multer from '../libs/multerImageQuestion';
import authAPI from '../libs/authAPI';

class questionsRoutes {

    router: Router = Router();

    constructor() {
        this.config();
    }

    config() {
        this.router.get('/', authAPI.validator, questionsController.list);
        this.router.get('/:id', authAPI.validator, questionsController.getOne);
        this.router.get('/byIdActivity/:id_activity', authAPI.validator, questionsController.getOneByIdActivity);
        this.router.get('/byIdQuiz/:id_quiz', authAPI.validator, questionsController.getAllByIdQuiz);
        this.router.get('/byIdPresentation/:id_presentation', authAPI.validator, questionsController.getAllByIdPresentation);
        this.router.get('/bydIdSlideQuestion/:id_slide_question', authAPI.validator, questionsController.getAllByIdSlideQuestion);
        this.router.get('/byIdPresentationAndNSlide/:id_presentation/:n_slide', authAPI.validator, questionsController.byIdPresentationAndNSlide);
        this.router.post('/', authAPI.validator, questionsController.create);
        this.router.put('/:id', authAPI.validator, questionsController.update);
        this.router.delete('/:id', authAPI.validator, questionsController.delete);
        this.router.post('/upload', multer.single('file'), questionsController.upload);
    }

}

export default new questionsRoutes().router;