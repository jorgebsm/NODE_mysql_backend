import express, { Router } from 'express';

import tokenController from '../controllers/tokenController';

class TokenRouter {

    router: Router = Router();

    constructor() {
        this.config();
    }

    config() {
        this.router.get('/:token', tokenController.validator);
    }

}

export default new TokenRouter().router;

