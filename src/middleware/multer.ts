import multer from "multer";
import mime from "mime";
import { randomUUID } from "crypto";

export const generateFileName = (mimeType: string) => {
    const randomFilename = `${randomUUID()}-${Date.now()}`;
    const fileExtension = mime.getExtension(mimeType);
    const fileName = `${randomFilename}.${fileExtension}`;
    return fileName;
}

const storage = multer.diskStorage({
    destination: 'uploads/',
    filename: (req, file, cb) => {
        return cb(null, generateFileName(file.mimetype))
    }
});

// to restrict file size

 const MAX_FILE_SIZE = 6 * 1024 * 1024;

// to restrict file types
// define file type array
const FILE_TYPES = ["image/png", "image/jpeg"];

const fileFilter: multer.Options["fileFilter"] = (req, file, cb) => {
    if (FILE_TYPES.includes(file.mimetype)) {
        cb(null,true)
    } else {
        cb(new Error("Error: file uploads must be in 'png' or 'JPEG'"))
    }
}

export const multerOptions:any = {
    fileFilter,
    limits: {
        filSize:MAX_FILE_SIZE
    }
};

export const initMulterMiddleware = () => {
    return multer({ storage, ...multerOptions });
};