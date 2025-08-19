"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFiles = exports.uploadFile = void 0;
const cloudinary_config_1 = __importDefault(require("../config/cloudinary.config"));
const error_handler_middleware_1 = __importDefault(require("../middlewares/error-handler.middleware"));
const fs_1 = __importDefault(require("fs"));
const uploadFile = (path_1, ...args_1) => __awaiter(void 0, [path_1, ...args_1], void 0, function* (path, dir = "/") {
    try {
        const { public_id, secure_url } = yield cloudinary_config_1.default.uploader.upload(path, {
            unique_filename: true,
            folder: "MERN_CLASS_PROJECT" + dir,
            // allowed_formats:[]
        });
        //delete image from uploads
        if (fs_1.default.existsSync(path)) {
            fs_1.default.unlinkSync(path);
        }
        return {
            public_id,
            path: secure_url,
        };
    }
    catch (err) {
        console.error("Cloudinary upload error", err);
        throw new error_handler_middleware_1.default(`Error uploading file.`, 500);
    }
});
exports.uploadFile = uploadFile;
const deleteFiles = (public_ids) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //Promise.all(arr_of_promises)
        const promiseRes = public_ids.map((public_id) => __awaiter(void 0, void 0, void 0, function* () {
            return yield cloudinary_config_1.default.uploader.destroy(public_id);
        }));
        const res = yield Promise.all(promiseRes);
        return true;
    }
    catch (_a) {
        throw new error_handler_middleware_1.default(`File delete error`, 500);
    }
});
exports.deleteFiles = deleteFiles;
