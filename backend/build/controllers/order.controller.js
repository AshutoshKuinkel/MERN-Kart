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
exports.cancelOrder = exports.updateOrderStatus = exports.getAllOrdersUser = exports.getAllOrdersAdmin = exports.createOrder = void 0;
const order_model_1 = require("../models/order.model");
const error_handler_middleware_1 = __importDefault(require("../middlewares/error-handler.middleware"));
const product_model_1 = require("../models/product.model");
const enum_types_1 = require("../types/enum.types");
const cart_model_1 = require("../models/cart.model");
const nodemailer_utils_1 = require("../utils/nodemailer.utils");
const email_utils_1 = require("../utils/email.utils");
//create an order {preparding order with price}
const createOrder = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { items, shippingAddress } = req.body;
        console.log(req.body);
        const user = req.user._id;
        const userEmail = req.user.email;
        if (!items) {
            throw new error_handler_middleware_1.default(`Items are required`, 400);
        }
        if (!shippingAddress) {
            throw new error_handler_middleware_1.default(`Shipping Address is required`, 400);
        }
        const address = JSON.parse(shippingAddress);
        const orderItems = JSON.parse(items);
        const order = yield Promise.all(orderItems.map((item) => __awaiter(void 0, void 0, void 0, function* () {
            const product = yield product_model_1.Product.findById(item.product);
            if (!product) {
                return null;
            }
            //reducing products stock
            product.stock -= Number(item.quantity);
            yield product.save();
            return {
                product: product._id,
                quantity: Number(item.quantity),
                totalPrice: Number(item.quantity) * product.price
            };
        })));
        //filter null elements
        const filteredOrderItems = order.filter((order) => order !== null);
        //calculating total amount
        const totalAmount = filteredOrderItems.reduce((acc, val) => {
            return acc += Number(val.totalPrice);
        }, 0);
        //placing order
        const newOrder = yield order_model_1.Order.create({ items: filteredOrderItems, totalAmount, shippingAddress: address, user });
        const orderPlaced = yield order_model_1.Order.findById(newOrder._id).populate('user').populate('items.product');
        //sending email to the user to let them know their order has been placed:
        yield (0, nodemailer_utils_1.sendEmail)({
            to: `${userEmail}`,
            subject: `Confirmation of Order`,
            html: (0, email_utils_1.generate_order_confirmation_email)(orderPlaced)
        });
        //deleting the item of the user cart, after order has been placed:
        yield cart_model_1.Cart.findOneAndDelete({ user });
        res.status(201).json({
            message: `Order successfully placed`,
            success: true,
            status: 'success',
            data: newOrder
        });
    }
    catch (err) {
        next(err);
    }
});
exports.createOrder = createOrder;
//get all orders (only admin)
const getAllOrdersAdmin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orders = yield order_model_1.Order.find({}).sort({ createdAt: -1 });
        res.status(200).json({
            message: `All orders fetched`,
            success: true,
            status: 'success',
            data: orders
        });
    }
    catch (err) {
        next(err);
    }
});
exports.getAllOrdersAdmin = getAllOrdersAdmin;
//get users current orders (only user)
const getAllOrdersUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.user._id;
        const orders = yield order_model_1.Order.find({ user }).sort({ createdAt: -1 });
        res.status(200).json({
            message: `All orders fetched`,
            success: true,
            status: 'success',
            data: orders
        });
    }
    catch (err) {
        next(err);
    }
});
exports.getAllOrdersUser = getAllOrdersUser;
//update order status (only admin)
const updateOrderStatus = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { status } = req.body;
        const { id } = req.params;
        const userEmail = req.user.email;
        const orders = yield order_model_1.Order.findByIdAndUpdate(id, { status }, { new: true });
        //sending an email to the user that their order status has been updated:
        yield (0, nodemailer_utils_1.sendEmail)({
            to: `${userEmail}`,
            subject: `Order Status Updated`,
            html: `
        <h1 style="background-color: beige; text-align: center;">Order Status Updated!</h1>
        <br>
        <p>This is just a message to let you know that the status of your items have been updated.Your items are now ${status}!</p>
      `,
        });
        res.status(200).json({
            message: `Order Status updated`,
            success: true,
            status: 'success',
            data: orders
        });
    }
    catch (err) {
        next(err);
    }
});
exports.updateOrderStatus = updateOrderStatus;
//cancel orders (only User)
const cancelOrder = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const userEmail = req.user.email;
        const orders = yield order_model_1.Order.findByIdAndUpdate(id, { status: enum_types_1.orderStatus.CANCELED }, { new: true });
        //sending email to user:
        yield (0, nodemailer_utils_1.sendEmail)({
            to: `${userEmail}`,
            subject: `Order Cancelled`,
            html: `
        <h1 style="background-color: beige; text-align: center;">Your order has been canceled!</h1>
        <br>
        <p>We're sorry to hear you are cancelling your order with us. If you require any additional support, please make sure to contact our support team.</p>
      `,
        });
        res.status(200).json({
            message: `Order canceled`,
            success: true,
            status: 'success',
            data: orders
        });
    }
    catch (err) {
        next(err);
    }
});
exports.cancelOrder = cancelOrder;
//delete order
//node mailer
//pagination
// filter
