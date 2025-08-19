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
exports.updateCategory = exports.getCategoryById = exports.removeCategory = exports.getAllCategory = exports.registerCategory = void 0;
const category_model_1 = require("./../models/category.model");
const error_handler_middleware_1 = __importDefault(require("../middlewares/error-handler.middleware"));
//* Category registration
const registerCategory = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, description } = req.body;
        if (!name) {
            throw new error_handler_middleware_1.default("Category name is required !", 400);
        }
        const category = yield category_model_1.Category.create({ name, description });
        res.status(201).json({
            message: "Category created successfully",
            status: "success",
            success: true,
            data: category,
        });
    }
    catch (err) {
        next(err);
    }
});
exports.registerCategory = registerCategory;
//get all category
const getAllCategory = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const category = yield category_model_1.Category.find();
        res.status(200).json({
            message: "All Category",
            status: "Success",
            success: true,
            data: category,
        });
    }
    catch (err) {
        next(err);
    }
});
exports.getAllCategory = getAllCategory;
//remove a category
const removeCategory = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const category = yield category_model_1.Category.findByIdAndDelete(id);
        res.status(200).json({
            message: "Category removed",
            status: "Success",
            success: true,
            data: category,
        });
    }
    catch (err) {
        next(err);
    }
});
exports.removeCategory = removeCategory;
//get category by ID
const getCategoryById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const category = yield category_model_1.Category.findById(id);
        res.status(200).json({
            message: "Category by ID",
            status: "Success",
            success: true,
            data: category,
        });
    }
    catch (err) {
        next(err);
    }
});
exports.getCategoryById = getCategoryById;
//update category
const updateCategory = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const { name, description } = req.body;
        const category = yield category_model_1.Category.findByIdAndUpdate(id, { name, description }, { new: true, reValidate: true });
        res.status(200).json({
            message: "Category by ID",
            status: "Success",
            success: true,
            data: category,
        });
    }
    catch (err) {
        next(err);
    }
});
exports.updateCategory = updateCategory;
