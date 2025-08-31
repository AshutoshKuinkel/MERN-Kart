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
exports.clearWishlist = exports.checkIfProductInWishlist = exports.getAllWishlistItems = exports.removeProductFromWishlist = exports.registerProductToWishlist = void 0;
const error_handler_middleware_1 = __importDefault(require("../middlewares/error-handler.middleware"));
const wishlist_model_1 = require("../models/wishlist.model");
const registerProductToWishlist = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productId = req.body.id;
        const userId = req.user._id;
        if (!productId) {
            throw new error_handler_middleware_1.default("Product ID is required", 400);
        }
        const wishlistItem = yield wishlist_model_1.Wishlist.create({
            product: productId,
            user: userId
        });
        res.status(201).json({
            message: "Product added to wishlist successfully",
            status: "success",
            success: true,
            data: wishlistItem,
        });
    }
    catch (err) {
        next(err);
    }
});
exports.registerProductToWishlist = registerProductToWishlist;
const removeProductFromWishlist = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const userId = req.user._id;
        const wishlistItem = yield wishlist_model_1.Wishlist.findOneAndDelete({ _id: id, user: userId });
        if (!wishlistItem) {
            throw new error_handler_middleware_1.default("Wishlist item not found", 404);
        }
        res.status(200).json({
            message: "Product removed from wishlist successfully",
            status: "success",
            success: true,
            data: wishlistItem,
        });
    }
    catch (err) {
        next(err);
    }
});
exports.removeProductFromWishlist = removeProductFromWishlist;
const getAllWishlistItems = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.user._id;
        const wishlistItems = yield wishlist_model_1.Wishlist.find({ user: userId }).populate("product");
        if (!wishlistItems) {
            throw new error_handler_middleware_1.default(`No products in wishlist yet.`, 400);
        }
        res.status(200).json({
            message: "Wishlist items retrieved successfully",
            status: "success",
            success: true,
            data: wishlistItems,
        });
    }
    catch (err) {
        next(err);
    }
});
exports.getAllWishlistItems = getAllWishlistItems;
const checkIfProductInWishlist = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.params;
        const userId = req.user._id;
        const wishlistItem = yield wishlist_model_1.Wishlist.findOne({ product: productId, user: userId });
        if (!wishlistItem) {
            res.status(404).json({
                message: "Product not found in wishlist",
                status: "fail",
                success: false,
            });
            return;
        }
        res.status(200).json({
            message: "Product is in wishlist",
            status: "success",
            success: true,
            data: wishlistItem,
        });
    }
    catch (err) {
        next(err);
    }
});
exports.checkIfProductInWishlist = checkIfProductInWishlist;
const clearWishlist = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.user._id;
        yield wishlist_model_1.Wishlist.deleteMany({ user: userId });
        res.status(200).json({
            message: "Wishlist cleared successfully",
            status: "success",
            success: true,
        });
    }
    catch (err) {
        next(err);
    }
});
exports.clearWishlist = clearWishlist;
