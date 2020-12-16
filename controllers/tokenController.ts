import { Request, Response } from 'express';
import { decode } from 'jsonwebtoken';


class TokenController {

    public async validator(req: Request, res: Response): Promise<any> {
        const { token } = req.params;
        const payload  = decode(token);       
        return res.json(payload);
    }


}

const tokenController = new TokenController;
export default tokenController;