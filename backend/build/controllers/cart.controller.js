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
exports.clearCart = exports.removeProductFromCart = exports.updateCart = exports.getUserCart = exports.addProductToCart = void 0;
const cart_model_1 = require("../models/cart.model");
const error_handler_middleware_1 = __importDefault(require("../middlewares/error-handler.middleware"));
//we need CRUD model for Cart: register/add product to cart, get users cart items, update product quantity, remove select product from cart, remove all product from cart.
const addProductToCart = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.body;
        const quantity = Number(req.body.quantity);
        const userId = req.user._id;
        if (!quantity || quantity <= 0 || !Number.isInteger(quantity)) {
            throw new error_handler_middleware_1.default("Quantity must be a positive integer", 400);
        }
        if (!productId) {
            throw new error_handler_middleware_1.default(`Product ID is required`, 400);
        }
        //Checking if the product is in cart for user first:
        let cartItem = yield cart_model_1.Cart.findOne({ user: userId, product: productId });
        //if the product is in cart: update the quantity, else create item:
        if (cartItem) {
            cartItem.quantity += quantity;
            yield cartItem.save();
        }
        else {
            cartItem = yield cart_model_1.Cart.create({
                product: productId,
                user: userId,
                quantity: quantity
            });
        }
        const fetchCart = yield cart_model_1.Cart.find({ user: userId }).populate("product");
        const totalAmount = fetchCart.reduce((total, item) => total + (item.product.price * item.quantity), 0);
        res.status(201).json({
            message: "Product added to cart successfully",
            status: "success",
            success: true,
            data: cartItem, totalAmount
        });
    }
    catch (err) {
        next(err);
    }
});
exports.addProductToCart = addProductToCart;
const getUserCart = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.user._id;
        const cartItems = yield cart_model_1.Cart.find({ user: userId }).populate("product");
        //make sure we are calculating the total amount and returning it to the user for this function.
        const totalAmount = cartItems.reduce((total, item) => total + (item.product.price * item.quantity), 0);
        res.status(200).json({
            message: "Cart items retrieved successfully",
            status: "success",
            success: true,
            data: cartItems, totalAmount
        });
    }
    catch (err) {
        next(err);
    }
});
exports.getUserCart = getUserCart;
const updateCart = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.params;
        const { quantity } = req.body;
        const userId = req.user._id;
        if (!quantity || quantity <= 0) {
            throw new error_handler_middleware_1.default("Quantity must be greater than zero", 400);
        }
        const cartItem = yield cart_model_1.Cart.findOneAndUpdate({ _id: productId, user: userId }, { quantity }, { new: true });
        if (!cartItem) {
            throw new error_handler_middleware_1.default("Cart item not found", 404);
        }
        const fetchUpdatedCart = yield cart_model_1.Cart.find({ user: userId }).populate("product");
        const totalAmount = fetchUpdatedCart.reduce((total, item) => total + (item.product.price * item.quantity), 0);
        res.status(200).json({
            message: "Cart item updated successfully",
            status: "success",
            success: true,
            data: cartItem, totalAmount
        });
    }
    catch (err) {
        next(err);
    }
});
exports.updateCart = updateCart;
const removeProductFromCart = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.params;
        const userId = req.user._id;
        const cartItem = yield cart_model_1.Cart.findOneAndDelete({ _id: productId, user: userId });
        if (!cartItem) {
            throw new error_handler_middleware_1.default("Cart item not found", 404);
        }
        const fetchUpdatedCart = yield cart_model_1.Cart.find({ user: userId }).populate("product");
        const totalAmount = fetchUpdatedCart.reduce((total, item) => total + (item.product.price * item.quantity), 0);
        res.status(200).json({
            message: "Cart item removed successfully",
            status: "success",
            success: true,
            data: cartItem, totalAmount
        });
    }
    catch (err) {
        next(err);
    }
});
exports.removeProductFromCart = removeProductFromCart;
const clearCart = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.user._id;
        const cartItems = yield cart_model_1.Cart.deleteMany({ user: userId });
        const fetchUpdatedCart = yield cart_model_1.Cart.find({ user: userId }).populate("product");
        const totalAmount = fetchUpdatedCart.reduce((total, item) => total + (item.product.price * item.quantity), 0);
        res.status(200).json({
            message: "Cart cleared successfully",
            status: "success",
            success: true,
            data: cartItems, totalAmount
        });
    }
    catch (err) {
        next(err);
    }
});
exports.clearCart = clearCart;
