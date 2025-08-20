"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploader = void 0;
const multer_1 = __importDefault(require("multer"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const error_handler_middleware_1 = __importDefault(require("./error-handler.middleware"));
const uploader = () => {
    const fileSize = 5 * 1024 * 1024;
    const allowedExts = ['jpg', 'png', 'webp', 'gif', 'svg', 'jpeg', 'pdf'];
    const myStorage = multer_1.default.diskStorage({
        destination: (req, file, cb) => {
            const uploadPath = 'uploads/';
            if (!fs_1.default.existsSync(uploadPath)) {
                fs_1.default.mkdirSync(uploadPath, { recursive: true });
            }
            cb(null, uploadPath);
        },
        filename: (req, file, cb) => {
            //file.jpg
            const uniqueName = Date.now() + '-' + file.originalname;
            cb(null, uniqueName);
        }
    });
    const fileFilter = (req, file, cb) => {
        const ext = path_1.default.extname(file.originalname).replace('.', '');
        if (allowedExts.includes(ext)) {
            cb(null, true);
        }
        else {
            const err = new error_handler_middleware_1.default(`The file format ${ext} isn't allowed`, 400);
            cb(err);
        }
    };
    const upload = (0, multer_1.default)({ storage: myStorage,
        limits: { fileSize },
        fileFilter
    });
    return upload;
};
exports.uploader = uploader;
