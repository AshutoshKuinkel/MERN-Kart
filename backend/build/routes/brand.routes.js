"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const brand_controller_1 = require("../controllers/brand.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const global_types_1 = require("../types/global.types");
const uploader_middleware_1 = require("../middlewares/uploader.middleware");
const router = express_1.default.Router();
const upload = (0, uploader_middleware_1.uploader)();
router.post(`/register`, (0, auth_middleware_1.authenticate)(global_types_1.allAdmins), upload.single('logo'), brand_controller_1.registerBrand);
router.get(`/`, brand_controller_1.getAllBrands);
router.delete('/remove/:id', (0, auth_middleware_1.authenticate)(global_types_1.allAdmins), brand_controller_1.removeBrand);
router.get('/:id', brand_controller_1.getBrandById);
router.put(`/update/:id`, (0, auth_middleware_1.authenticate)(global_types_1.allAdmins), upload.single('logo'), brand_controller_1.updateBrand);
exports.default = router;
