"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cart_controller_1 = require("../controllers/cart.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const global_types_1 = require("../types/global.types");
const router = express_1.default.Router();
router.post("/addToCart", (0, auth_middleware_1.authenticate)(global_types_1.onlyUser), cart_controller_1.addProductToCart);
router.get("/", (0, auth_middleware_1.authenticate)(global_types_1.onlyUser), cart_controller_1.getUserCart);
router.put("/updateCart/:productId", (0, auth_middleware_1.authenticate)(global_types_1.onlyUser), cart_controller_1.updateCart);
router.delete("/remove/:productId", (0, auth_middleware_1.authenticate)(global_types_1.onlyUser), cart_controller_1.removeProductFromCart);
router.delete("/clearCart", (0, auth_middleware_1.authenticate)(global_types_1.onlyUser), cart_controller_1.clearCart);
exports.default = router;
