"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_middleware_1 = require("../middlewares/auth.middleware");
const global_types_1 = require("../types/global.types");
const category_controller_1 = require("./../controllers/category.controller");
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.post(`/register`, (0, auth_middleware_1.authenticate)(global_types_1.allAdmins), category_controller_1.registerCategory);
router.get(`/`, category_controller_1.getAllCategory);
router.delete('/remove/:id', (0, auth_middleware_1.authenticate)(global_types_1.allAdmins), category_controller_1.removeCategory);
router.get('/:id', category_controller_1.getCategoryById);
router.put(`/update/:id`, (0, auth_middleware_1.authenticate)(global_types_1.allAdmins), category_controller_1.updateCategory);
exports.default = router;
