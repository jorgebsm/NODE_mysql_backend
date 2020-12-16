import { Request, Response } from 'express';
import pool from '../database';
import { _users } from '../name_tables/tables';
const moment = require('moment');
const bcrypt = require('bcrypt');
const TOKEN_KEY = "Token-Auth";
const jwt = require('jsonwebtoken');
import { decode } from 'jsonwebtoken';
import { KEY_ENCRYPT } from '../global/environment'
const Cryptr = require('cryptr');
const cryptr = new Cryptr(KEY_ENCRYPT);


class UserController {

    public async list(req: Request, res: Response): Promise<void> {
        const users = await pool.query('SELECT * FROM '+ _users +'');
        res.json(users);
    }

    public async getOne(req: Request, res: Response): Promise<any> {
        const { id } = req.params;
        const decryptedId = cryptr.decrypt(id);
        const users = await pool.query('SELECT * FROM '+ _users +' WHERE id = ?', [decryptedId]);
        if (users.length > 0) {
            return res.json(users[0]);
        }
        res.status(404).json({ text: "The user doesn't exits" });
    }

    public async getByEmailUser(req: Request, res: Response): Promise<any> {
        const { email } = req.params;
        const users = await pool.query('SELECT * FROM '+ _users +' WHERE email = ?', [email]);
        if (users.length > 0) {
            return res.json(users[0]);
        }
        res.status(404).json({ text: "The user doesn't exits" });
    }

    public async register(req: Request, res: Response): Promise<void> {    
        req.body.password = bcrypt.hashSync(req.body.password, 10);

        const email = req.body.email;
        const users =  await pool.query('SELECT * FROM '+ _users +' WHERE email = ?', [email]);

        if ( users.length > 0 ) {
            res.status(404).json({ text: "Ya existe una cuenta con el email ingresado" });
        } else {
            await pool.query('INSERT INTO '+ _users +' set ?', [req.body]);
            res.json({ message: 'Saved' });
        }
    }


    public async login(req: Request, res: Response): Promise<any> {    
        const email = req.body.email;        
        const users = await pool.query('SELECT * FROM '+ _users +' WHERE email = ?', [email]);
        
        if (users.length <= 0) {
            res.status(404).json({ text: "El email ingresado no es válido" });
        } else {
            const equals = bcrypt.compareSync(req.body.password, users[0].password);
            if ( !equals ) {                
                res.status(404).json({ text: "La contraseña ingresada no es válida" });
            } else {
                let payload = {
                    // id: users[0].id,
                    // id: bcrypt.hashSync(users[0].id.toString(), 10),
                    id: cryptr.encrypt(users[0].id),
                    createdAt: moment().unix(),
                    expiresAt: moment().add(1, 'day').unix()
                }                
                res.json({
                    token: jwt.sign(payload, TOKEN_KEY),
                    done: 'Login correct'
                });
            }
        }
    }

    public async dataToken(req: Request, res: Response): Promise<any> {        
        const { token } = req.params;
        const payload  = decode(token);               
        return res.json(payload);
    }


    public async update(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        // const decryptedId = cryptr.decrypt(id);        

        if ( req.body.password ) req.body.password = bcrypt.hashSync(req.body.password, 10);
        
        if ( req.body.email ) {

            const email = req.body.email;
            const users =  await pool.query('SELECT * FROM '+ _users +' WHERE email = ?', [email]);
    
            if ( users.length > 0 ) {
                res.status(404).json({ text: "Ya existe una cuenta con el email ingresado" });
            } else {
                await pool.query('UPDATE '+ _users +' set ? WHERE id = ?', [req.body, id]);
                res.json({ message: "The user was Updated" });
            }

        } else {

            await pool.query('UPDATE '+ _users +' set ? WHERE id = ?', [req.body, id]);
            res.json({ message: "The user was Updated" });

        }
        
        
    }

    public async delete(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        // const decryptedId = cryptr.decrypt(id);

        await pool.query('DELETE FROM '+ _users +' WHERE id = ?', [id]);
        res.json({ message: "The user was deleted" });
    }

    public async upload(req: Request, res: Response): Promise<void> {

        const { id } = req.params;   
        // const decryptedId = cryptr.decrypt(id);

        const newFile = {
            nameFile: req.file.filename,
        }        
        await pool.query('UPDATE '+ _users +' SET photo = "'+ newFile.nameFile +'" WHERE id = '+ id);
        res.json({ message: 'Saved' });
    }

    public async verifyPassword(req: Request, res: Response): Promise<any> {
        const { id, password } = req.params;        
        // const decryptedId = cryptr.decrypt(id);
        const users = await pool.query('SELECT * FROM '+ _users +' WHERE id = ?', [id]);

        if (users.length > 0) {
            const equals = bcrypt.compareSync(password, users[0].password);
            if ( equals ) {
                return res.json(true);
            } else {
                return res.json(false);
            }
        }
        res.status(404).json({ text: "The user doesn't exits" });
    }

}

const userController = new UserController;
export default userController;