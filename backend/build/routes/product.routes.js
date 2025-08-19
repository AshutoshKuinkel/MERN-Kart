"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const product_controller_1 = require("../controllers/product.controller");
const express_1 = __importDefault(require("express"));
const global_types_1 = require("../types/global.types");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const uploader_middleware_1 = require("../middlewares/uploader.middleware");
const router = express_1.default.Router();
const upload = (0, uploader_middleware_1.uploader)();
router.post(`/register`, (0, auth_middleware_1.authenticate)(global_types_1.allAdmins), upload.fields([{ name: "coverImage", maxCount: 1 }, { name: "images", maxCount: 5 }]), product_controller_1.registerProduct);
router.get(`/`, product_controller_1.getAllProduct);
router.get('/featured', product_controller_1.getFeaturedProducts);
router.delete('/remove/:id', (0, auth_middleware_1.authenticate)(global_types_1.allAdmins), product_controller_1.removeProduct);
router.get('/:id', product_controller_1.getProductById);
router.put(`/update/:id`, (0, auth_middleware_1.authenticate)(global_types_1.allAdmins), product_controller_1.updateProduct);
router.get('/getByBrand/:id', product_controller_1.getProductByBrand);
router.get('/getByCategory/:id', product_controller_1.getProductByCategory);
exports.default = router;
//cart
//order
