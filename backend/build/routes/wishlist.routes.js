"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_middleware_1 = require("./../middlewares/auth.middleware");
const express_1 = __importDefault(require("express"));
const wishlist_controller_1 = require("../controllers/wishlist.controller");
const global_types_1 = require("../types/global.types");
const router = express_1.default.Router();
router.post("/registerProductToWishlist", (0, auth_middleware_1.authenticate)(global_types_1.onlyUser), wishlist_controller_1.registerProductToWishlist);
router.delete("/removeProductFromWishlist/:id", (0, auth_middleware_1.authenticate)(global_types_1.onlyUser), wishlist_controller_1.removeProductFromWishlist);
router.get("/wishlist", (0, auth_middleware_1.authenticate)(global_types_1.onlyUser), wishlist_controller_1.getAllWishlistItems);
router.get("/checkIfProductInWishlist/:productId", (0, auth_middleware_1.authenticate)(global_types_1.onlyUser), wishlist_controller_1.checkIfProductInWishlist);
router.delete("/clearWishList", (0, auth_middleware_1.authenticate)(global_types_1.onlyUser), wishlist_controller_1.clearWishlist);
exports.default = router;
