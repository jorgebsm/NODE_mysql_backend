import { Request, Response, NextFunction } from 'express';
import { KEY_AUTHORIZATION } from '../global/environment';

class AuthAPI {

    public async validator(req: Request, res: Response, next: NextFunction): Promise<void> {        

        if ( req.headers.key_authorization != KEY_AUTHORIZATION ) {
            res.status(403).send({message: 'No tiene autorización'});
        } else {            
            next();
        }
    }

}

const authAPI = new AuthAPI;
export default authAPI;