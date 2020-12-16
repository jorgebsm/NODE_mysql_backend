import multer from 'multer'
import path from 'path'
import { v4 as uuid } from 'uuid';
const fileSize = 1 * 1000 * 1000;

// Settings, básicamente para cambiar el nombre
const storage = multer.diskStorage({
    destination: 'uploads/images-questions',
    filename: (req, file, cb) => {
        cb(null, uuid() + path.extname(file.originalname));
    }
});

const fileFilter = (req: any, file: any, cb: any) => {
        

    if (file.mimetype === "image/jpg" || file.mimetype ==="image/jpeg" || file.mimetype ===  "image/png" || file.mimetype ===  "image/gif" ){
        cb (null, true);
    } else {
      cb (new Error("El archivo debe ser una imagen"), false);
    }
}

export default multer({storage, fileFilter, limits: { fileSize: fileSize }});