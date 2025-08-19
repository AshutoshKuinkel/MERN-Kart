"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const enum_types_1 = require("../types/enum.types");
const orderSchema = new mongoose_1.default.Schema({
    user: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, `user is required`]
    },
    items: [{
            product: {
                type: mongoose_1.default.Schema.Types.ObjectId,
                ref: 'Product',
                required: [true, `Product is required.`],
            },
            quantity: {
                type: Number,
                required: [true, `Please select item quantity.`]
            },
            totalPrice: {
                type: Number,
                required: [true, `Total price is required`]
            },
        }],
    totalAmount: {
        type: Number,
        required: [true, `Total Amount is required.`]
    },
    shippingAddress: {
        country: {
            type: String,
            trim: true,
            required: [true, `Please enter Country.`]
        },
        state: {
            type: String,
            trim: true,
            required: [true, `Please enter state.`]
        },
        suburb: {
            type: String,
            trim: true,
            required: [true, `Please enter suburb`]
        },
        street: {
            type: String,
            trim: true,
            required: [true, `Please enter street`]
        },
    },
    status: {
        type: String,
        enum: Object.values(enum_types_1.orderStatus),
        default: enum_types_1.orderStatus.PENDING
    },
    paymentMethod: {
        type: String,
        enum: Object.values(enum_types_1.paymentMethod),
        default: enum_types_1.paymentMethod.COD
    }
}, { timestamps: true });
exports.Order = mongoose_1.default.model('Order', orderSchema);
