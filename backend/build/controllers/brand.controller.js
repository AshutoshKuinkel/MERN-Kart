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
exports.updateBrand = exports.getBrandById = exports.removeBrand = exports.getAllBrands = exports.registerBrand = void 0;
const brand_model_1 = require("../models/brand.model");
const error_handler_middleware_1 = __importDefault(require("../middlewares/error-handler.middleware"));
const cloudinary_service_utils_1 = require("../utils/cloudinary-service.utils");
const folder_name = '/brands';
//* brand registration
const registerBrand = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, description } = req.body;
        console.log(req.file);
        const logo = req.file;
        if (!name) {
            throw new error_handler_middleware_1.default("brand name is required !", 400);
        }
        //Revist this part again: {From here}
        const brand = new brand_model_1.Brand({ name, description });
        const { path, public_id } = yield (0, cloudinary_service_utils_1.uploadFile)(logo.path, folder_name);
        brand.logo = {
            path,
            public_id
        };
        yield brand.save();
        //{To here ^}
        res.status(201).json({
            message: "Brand created successfully",
            status: "success",
            success: true,
            data: brand,
        });
    }
    catch (err) {
        next(err);
    }
});
exports.registerBrand = registerBrand;
//get all brands
const getAllBrands = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const brand = yield brand_model_1.Brand.find();
        res.status(200).json({
            message: "All brands",
            status: "Success",
            success: true,
            data: brand,
        });
    }
    catch (err) {
        next(err);
    }
});
exports.getAllBrands = getAllBrands;
//remove a brand
const removeBrand = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        //getting the brand first
        const brand = yield brand_model_1.Brand.findById(id);
        //and now deleting it by deleting image first and then the actual brand.
        if (!brand) {
            throw new error_handler_middleware_1.default(`Brand not found`, 404);
        }
        if (brand.logo) {
            yield (0, cloudinary_service_utils_1.deleteFiles)([brand.logo.public_id]);
        }
        yield brand.deleteOne();
        res.status(200).json({
            message: "brand removed",
            status: "Success",
            success: true,
            data: brand,
        });
    }
    catch (err) {
        next(err);
    }
});
exports.removeBrand = removeBrand;
//get brand by ID
const getBrandById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const brand = yield brand_model_1.Brand.findById(id);
        res.status(200).json({
            message: "brand by ID",
            status: "Success",
            success: true,
            data: brand,
        });
    }
    catch (err) {
        next(err);
    }
});
exports.getBrandById = getBrandById;
//update brand
const updateBrand = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const id = req.params.id;
        const { name, description } = req.body;
        const logo = req.file;
        const brand = yield brand_model_1.Brand.findById(id);
        if (!brand) {
            throw new error_handler_middleware_1.default(`Brand not found`, 404);
        }
        if (name)
            brand.name = name;
        if (description)
            brand.description = description;
        if (logo) {
            const { path, public_id } = yield (0, cloudinary_service_utils_1.uploadFile)(logo.path, folder_name);
            //deleting old image
            if (brand.logo) {
                yield (0, cloudinary_service_utils_1.deleteFiles)([(_a = brand.logo) === null || _a === void 0 ? void 0 : _a.public_id]);
            }
            //update new image
            brand.logo = {
                path,
                public_id
            };
        }
        yield brand.save();
    }
    catch (err) {
        next(err);
    }
});
exports.updateBrand = updateBrand;
