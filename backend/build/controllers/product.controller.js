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
exports.getFeaturedProducts = exports.getProductByBrand = exports.getProductByCategory = exports.removeProduct = exports.updateProduct = exports.getProductById = exports.getAllProduct = exports.registerProduct = void 0;
const cloudinary_service_utils_1 = require("./../utils/cloudinary-service.utils");
const error_handler_middleware_1 = __importDefault(require("../middlewares/error-handler.middleware"));
const product_model_1 = require("../models/product.model");
const brand_model_1 = require("../models/brand.model");
const category_model_1 = require("../models/category.model");
const mongoose_1 = __importDefault(require("mongoose"));
const folder_name = '/products';
//* Product registration
const registerProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { name, brand, category, isFeatured, stock, price, description, size } = req.body;
        const files = req.files;
        const createdBy = req.user._id;
        const coverImage = (_a = files === null || files === void 0 ? void 0 : files.coverImage) === null || _a === void 0 ? void 0 : _a[0];
        const images = (files === null || files === void 0 ? void 0 : files.images) || [];
        if (!name || !brand || !category || !price) {
            throw new error_handler_middleware_1.default("Please fill out at least the name,brand,category and price!", 400);
        }
        if (!coverImage) {
            throw new error_handler_middleware_1.default("Cover image is required", 400);
        }
        //This is perfectly fine aswell:
        // const product = await Product.create(name,brand,category,createdBy,isFeatured,stock,price,description,size)
        //but the method below is better in terms of error handling
        if (!brand) {
            throw new error_handler_middleware_1.default(`Brand is required`, 400);
        }
        if (!category) {
            throw new error_handler_middleware_1.default(`Category is required`, 400);
        }
        // if(!createdBy){
        //   throw new CustomError(`createdBy is required`,400)
        // }
        const product = new product_model_1.Product({
            name, isFeatured, stock, price, description, size
        });
        const { path: coverPath, public_id: coverPublicId } = yield (0, cloudinary_service_utils_1.uploadFile)(coverImage.path, `/${folder_name}`);
        product.coverImage = {
            path: coverPath,
            public_id: coverPublicId
        };
        if (images.length > 0) {
            const uploadedImages = yield Promise.all(images.map((img) => (0, cloudinary_service_utils_1.uploadFile)(img.path, `/${folder_name}`)));
            product.images = uploadedImages.map((img) => img.path);
        }
        const productBrand = yield brand_model_1.Brand.findById(brand);
        if (!productBrand) {
            throw new error_handler_middleware_1.default(`Brand not found`, 400);
        }
        const productCategory = yield category_model_1.Category.findById(category);
        if (!productCategory) {
            throw new error_handler_middleware_1.default(`productCategory not found`, 400);
        }
        product.brand = productBrand._id;
        product.category = productCategory._id;
        product.createdBy = new mongoose_1.default.Types.ObjectId(createdBy.toString());
        yield product.save();
        res.status(201).json({
            message: "Product registration successfull",
            status: "success",
            success: true,
            data: product,
        });
    }
    catch (err) {
        next(err);
    }
});
exports.registerProduct = registerProduct;
//get all products
const getAllProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { currentPage, perPage, query, category, brand, minPrice, maxPrice } = req.query;
        let filter = {};
        const page = Number(currentPage) || 1;
        const limit = Number(perPage) || 10;
        const skip = (page - 1) * limit;
        if (query) {
            filter.$or = [
                {
                    name: {
                        $regex: query,
                        $options: 'i'
                    }
                },
                {
                    description: {
                        $regex: query,
                        $options: 'i'
                    }
                }
            ];
        }
        //category filter
        if (category) {
            filter.category = category;
        }
        if (brand) {
            filter.brand = brand;
        }
        //price range filter
        if (maxPrice || minPrice) {
            if (minPrice) {
                filter.price = {
                    $gte: minPrice
                };
            }
            if (maxPrice) {
                filter.price = {
                    $lte: maxPrice
                };
            }
        }
        const product = yield product_model_1.Product.find(filter)
            .limit(limit)
            .skip(skip)
            .populate('brand')
            .populate('category')
            .populate("createdBy");
        const total = yield product_model_1.Product.countDocuments(filter);
        const totalPages = Math.ceil(total / limit);
        const nextPage = totalPages > page ? page + 1 : null;
        const prevPage = 1 > page ? page - 1 : null;
        const hasNextPage = totalPages > page ? true : false;
        const hasPrevPage = 1 > page ? true : false;
        res.status(200).json({
            message: "Products fetched",
            status: "success",
            success: true,
            data: product,
            pagination: {
                total,
                totalPages,
                nextPage,
                prevPage,
                hasNextPage,
                hasPrevPage
            }
        });
    }
    catch (err) {
        next(err);
    }
});
exports.getAllProduct = getAllProduct;
//get individual product by ID
const getProductById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const product = yield product_model_1.Product.findById(id).populate('brand').populate('category').populate('createdBy');
        if (!product) {
            throw new error_handler_middleware_1.default(`Product not found.`, 404);
        }
        res.status(200).json({
            message: "Product fetched successfully",
            status: "success",
            success: true,
            data: product,
        });
    }
    catch (err) {
        next(err);
    }
});
exports.getProductById = getProductById;
//update individual product 
const updateProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const { name, brand, category, isFeatured, stock, price, description, size, deletedImage } = req.body;
        const createdBy = req.user._id;
        const { cover_image, images } = req.files;
        let deletedImages = [];
        if (deletedImage) {
            deletedImages = JSON.parse(deletedImage);
        }
        if (!name || !brand || !category || !price) {
            throw new error_handler_middleware_1.default("Please fill out at least the name,brand,category and price!", 400);
        }
        const product = yield product_model_1.Product.findByIdAndUpdate(id, { name, brand, category, createdBy, isFeatured, stock, price, description, size }, { new: true, reValidate: true });
        if (!product) {
            throw new error_handler_middleware_1.default(`Product not found`, 400);
        }
        if (brand) {
            const brandToUpdate = yield brand_model_1.Brand.findById(brand);
            if (!brandToUpdate) {
                throw new error_handler_middleware_1.default("Brand not found", 400);
            }
            product.brand = brandToUpdate._id;
        }
        if (category) {
            const categoryToUpdate = yield category_model_1.Category.findById(category);
            if (!categoryToUpdate) {
                throw new error_handler_middleware_1.default("Category not found", 400);
            }
            product.category = categoryToUpdate._id;
        }
        if (cover_image) {
            const { path, public_id } = yield (0, cloudinary_service_utils_1.uploadFile)(cover_image[0].path, folder_name);
            if (product.coverImage) {
                yield (0, cloudinary_service_utils_1.deleteFiles)([product.coverImage.public_id]);
            }
            product.coverImage = {
                path,
                public_id,
            };
        }
        // ! id old images are deleted
        if (Array.isArray(deletedImages) &&
            deletedImages.length > 0) {
            yield (0, cloudinary_service_utils_1.deleteFiles)(deletedImages);
            const filteredImages = product.images.length > 0
                ? product.images.filter((image) => !deletedImages.includes(image))
                : [];
            product.set("images", filteredImages);
        }
        // ! if new images uploaded
        if (images && images.length > 0) {
            const newImages = yield Promise.all(images.map((image) => __awaiter(void 0, void 0, void 0, function* () { return yield (0, cloudinary_service_utils_1.uploadFile)(image.path, folder_name); })));
            product.set("images", [...product.images, ...newImages]);
        }
        res.status(200).json({
            message: "Product successfully updated",
            status: "success",
            success: true,
            data: product,
        });
    }
    catch (err) {
        next(err);
    }
});
exports.updateProduct = updateProduct;
//remove product
const removeProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const { id } = req.params;
        const product = yield product_model_1.Product.findById(id);
        if (!product) {
            throw new error_handler_middleware_1.default(`Product not found`, 404);
        }
        if (product.images && product.images.length > 0) {
            yield (0, cloudinary_service_utils_1.deleteFiles)((_a = product.images.map((img) => img.public_id)) !== null && _a !== void 0 ? _a : []);
        }
        if (product.coverImage) {
            (0, cloudinary_service_utils_1.deleteFiles)([(_b = product.coverImage) === null || _b === void 0 ? void 0 : _b.public_id]);
        }
        yield product.deleteOne();
        res.status(200).json({
            message: "Product removed",
            status: "Success",
            success: true,
            data: product,
        });
    }
    catch (err) {
        next(err);
    }
});
exports.removeProduct = removeProduct;
//get product by category
const getProductByCategory = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const category = yield category_model_1.Category.findById(id);
        if (!category) {
            throw new error_handler_middleware_1.default(`Category not found`, 404);
        }
        const products = yield product_model_1.Product.find({ category: id }).populate('brand').populate('category').populate('createdBy');
        if (!products || products.length === 0) {
            throw new error_handler_middleware_1.default(`No products found for this category`, 404);
        }
        res.status(200).json({
            message: `Products from category fetched successfully`,
            status: "success",
            success: true,
            data: products,
        });
    }
    catch (err) {
        next(err);
    }
});
exports.getProductByCategory = getProductByCategory;
//get product by brand
const getProductByBrand = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const brand = yield brand_model_1.Brand.findById(id);
        if (!brand) {
            throw new error_handler_middleware_1.default(`Brand not found`, 404);
        }
        const products = yield product_model_1.Product.find({ brand: id }).populate('brand').populate('category').populate('createdBy');
        if (!products || products.length === 0) {
            throw new error_handler_middleware_1.default(`No products found for this brand`, 404);
        }
        console.log("req.body.brand:", brand);
        res.status(200).json({
            message: `Products from brand fetched successfully`,
            status: "success",
            success: true,
            data: products,
        });
    }
    catch (err) {
        next(err);
    }
});
exports.getProductByBrand = getProductByBrand;
//get featured products
const getFeaturedProducts = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield product_model_1.Product.find({ isFeatured: true }).populate('brand').populate('category').populate('createdBy');
        if (!products || products.length === 0) {
            throw new error_handler_middleware_1.default(`No featured products`, 404);
        }
        res.status(200).json({
            message: `Featured products fetched successfully`,
            status: "success",
            success: true,
            data: products,
        });
    }
    catch (err) {
        next(err);
    }
});
exports.getFeaturedProducts = getFeaturedProducts;
