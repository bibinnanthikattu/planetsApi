"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initMulterMiddleware = exports.multerOptions = exports.generateFileName = void 0;
const multer_1 = __importDefault(require("multer"));
const mime_1 = __importDefault(require("mime"));
const crypto_1 = require("crypto");
const generateFileName = (mimeType) => {
    const randomFilename = `${(0, crypto_1.randomUUID)()}-${Date.now()}`;
    const fileExtension = mime_1.default.getExtension(mimeType);
    const fileName = `${randomFilename}.${fileExtension}`;
    return fileName;
};
exports.generateFileName = generateFileName;
const storage = multer_1.default.diskStorage({
    destination: 'uploads/',
    filename: (req, file, cb) => {
        return cb(null, (0, exports.generateFileName)(file.mimetype));
    }
});
// to restrict file size
const MAX_FILE_SIZE = 6 * 1024 * 1024;
// to restrict file types
// define file type array
const FILE_TYPES = ["image/png", "image/jpeg"];
const fileFilter = (req, file, cb) => {
    if (FILE_TYPES.includes(file.mimetype)) {
        cb(null, true);
    }
    else {
        cb(new Error("Error: file uploads must be in 'png' or 'JPEG'"));
    }
};
exports.multerOptions = {
    fileFilter,
    limits: {
        filSize: MAX_FILE_SIZE
    }
};
const initMulterMiddleware = () => {
    return (0, multer_1.default)({ storage, ...exports.multerOptions });
};
exports.initMulterMiddleware = initMulterMiddleware;
