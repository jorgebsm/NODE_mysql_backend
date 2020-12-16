import express, { Router } from 'express';

import countryController from '../controllers/countryController';

class CountryRouter {

    router: Router = Router();

    constructor() {
        this.config();
    }

    config() {
        this.router.get('/', countryController.list);
        this.router.get('/:id', countryController.getOne);
    }

}

export default new CountryRouter().router;

