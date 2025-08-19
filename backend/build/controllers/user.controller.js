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
exports.registerUser = exports.getById = exports.deleteUser = exports.getAll = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const error_handler_middleware_1 = __importDefault(require("../middlewares/error-handler.middleware"));
// get all users
const getAll = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield user_model_1.default.find({});
        res.status(200).json({
            message: `Users fetched`,
            success: true,
            status: "success",
            data: users
        });
    }
    catch (err) {
        next(err);
    }
});
exports.getAll = getAll;
//delete user
const deleteUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const users = yield user_model_1.default.findByIdAndDelete(id);
        if (!user_model_1.default) {
            throw new error_handler_middleware_1.default('User not found', 404);
        }
        res.status(200).json({
            message: `User deleted`,
            success: true,
            status: "success",
            data: users
        });
    }
    catch (err) {
        next(err);
    }
});
exports.deleteUser = deleteUser;
//get user by id
const getById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const users = yield user_model_1.default.findById(id);
        if (!user_model_1.default) {
            throw new error_handler_middleware_1.default('User not found', 404);
        }
        res.status(200).json({
            message: `User fetched`,
            success: true,
            status: "success",
            data: users
        });
    }
    catch (err) {
        next(err);
    }
});
exports.getById = getById;
//register user
const registerUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { firstName, lastName, email, password, phone, role } = req.body;
        const user = yield user_model_1.default.create({ firstName, lastName, email, password, phone, role });
        res.status(200).json({
            message: `User fetched`,
            success: true,
            status: "success",
            data: user
        });
    }
    catch (err) {
        next(err);
    }
});
exports.registerUser = registerUser;
//test comment for git
