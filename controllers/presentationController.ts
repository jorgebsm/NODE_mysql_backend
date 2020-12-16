import { Request, Response } from 'express';
import pool from '../database';
import { _presentations } from '../name_tables/tables';

// import * as fs from 'fs';
// var CloudmersiveConvertApiClient = require('cloudmersive-convert-api-client');
// var defaultClient = CloudmersiveConvertApiClient.ApiClient.instance;
// var apiInstance = new CloudmersiveConvertApiClient.ConvertDocumentApi();

class PresentationController {

    public async list(req: Request, res: Response) {
        const presentations = await pool.query('SELECT * FROM '+ _presentations +'');
        res.json(presentations);
    }

    public async getOne(req: Request, res: Response): Promise<any> {
        const { id } = req.params;
        const presentations = await pool.query('SELECT * FROM '+ _presentations +' WHERE id = ?', [id]);
        if (presentations.length > 0) {
            return res.json(presentations[0]);
        }
        res.status(404).json({ text: "The presentation doesn't exits" });
    }

    public async getOneByIdActivity(req: Request, res: Response): Promise<any> {
        const { id_activity } = req.params;
        const presentations = await pool.query('SELECT * FROM '+ _presentations +' WHERE ttr_activity_id = ?', [id_activity]);
        console.log(presentations.length);
        if (presentations.length > 0) {
            return res.json(presentations[0]);
        }
        res.status(404).json({ text: "The presentation doesn't exits" });
    }

    public async create(req: Request, res: Response): Promise<void> {
        await pool.query('INSERT INTO '+ _presentations +' set ?', [req.body]);
        res.json({ message: 'Saved' });
        // const insert = await pool.query('INSERT INTO presentations set ?', [req.body]);
        // const last_id = await pool.query('SELECT LAST_INSERT_ID();');
        
        // if (last_id.length > 0) {
        //     return res.json(last_id[0]);
        // }
    }
    
    public async update(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const oldPresentation = req.body;
        await pool.query('UPDATE '+ _presentations +' set ? WHERE id = ?', [req.body, id]);
        res.json({ message: "The presentation was Updated" });
    }

    public async delete(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        await pool.query('DELETE FROM '+ _presentations +' WHERE id = ?', [id]);
        res.json({ message: "The presentation was deleted" });
    }

    public async upload(req: Request, res: Response): Promise<void> {        

        const { id } = req.params;   
        const newFile = {
            nameFile: req.file.filename,
        }
        await pool.query('UPDATE '+ _presentations +' SET path = "'+ newFile.nameFile +'" WHERE id = '+ id);
        res.json({ message: 'Saved' });

    }
}

const presentationController = new PresentationController;
export default presentationController;