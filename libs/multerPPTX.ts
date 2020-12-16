import multer from 'multer'
import path from 'path'
import { v4 as uuid } from 'uuid';

// Settings, básicamente para cambiar el nombre
const storage = multer.diskStorage({
    destination: 'uploads',
    filename: (req, file, cb) => {
        cb(null, uuid() + path.extname(file.originalname));
    }
});

const fileFilter = (req: any, file: any, cb: any) => {    
    
    if (file.mimetype === "application/pdf"){
        cb (null, true);
    } else {
      cb (new Error("El archivo debe estar en formato PDF (Ej: Presentación.pdf)"), false);
    }
}

export default multer({storage, fileFilter});

// else if (file.mimetype === "application/vnd.openxmlformats-officedocument.presentationml.presentation") {
//     cb (null, true);