"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_middleware_1 = require("../middlewares/auth.middleware");
const global_types_1 = require("../types/global.types");
const order_controller_1 = require("../controllers/order.controller");
const router = express_1.default.Router();
router.post("/createOrder", (0, auth_middleware_1.authenticate)(global_types_1.onlyUser), order_controller_1.createOrder);
router.get("/allorders", (0, auth_middleware_1.authenticate)(global_types_1.allAdmins), order_controller_1.getAllOrdersAdmin);
router.get("/myorders", (0, auth_middleware_1.authenticate)(global_types_1.onlyUser), order_controller_1.getAllOrdersUser);
router.put("/updateOrder/:id", (0, auth_middleware_1.authenticate)(global_types_1.allAdmins), order_controller_1.updateOrderStatus);
router.put("/cancelOrder/:id", (0, auth_middleware_1.authenticate)(global_types_1.onlyUser), order_controller_1.cancelOrder);
exports.default = router;
