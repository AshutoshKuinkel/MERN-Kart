"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Brand = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const brandSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: [true, "Brand_name is required !"],
        trim: true,
        unique: true,
        maxLength: 50,
    },
    logo: {
        path: {
            type: String,
            required: true
        },
        public_id: {
            type: String,
            required: true
        }
    },
    description: {
        type: String,
    },
});
exports.Brand = mongoose_1.default.model("Brand", brandSchema);
