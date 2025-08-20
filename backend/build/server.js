"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const db_config_1 = require("./config/db.config");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const error_handler_middleware_1 = require("./middlewares/error-handler.middleware");
const error_handler_middleware_2 = __importDefault(require("./middlewares/error-handler.middleware"));
//importing routes
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const brand_routes_1 = __importDefault(require("./routes/brand.routes"));
const category_routes_1 = __importDefault(require("./routes/category.routes"));
const product_routes_1 = __importDefault(require("./routes/product.routes"));
const wishlist_routes_1 = __importDefault(require("./routes/wishlist.routes"));
const cart_routes_1 = __importDefault(require("./routes/cart.routes"));
const order_routes_1 = __importDefault(require("./routes/order.routes"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const app = (0, express_1.default)();
const PORT = process.env.PORT;
const DB_URI = (_a = process.env.DB_URI) !== null && _a !== void 0 ? _a : '';
(0, db_config_1.ConnectDatabase)(DB_URI);
//using middlewares
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ limit: '50mb', extended: true }));
app.use((0, cookie_parser_1.default)());
//serving uploads as static file
app.use('/api/uploads', express_1.default.static("uploads/"));
app.get('/', (req, res) => {
    res.status(200).json({
        message: 'Server is up and running',
    });
});
//using routes
app.use('/api/auth', auth_routes_1.default);
app.use('/api/user', user_routes_1.default);
app.use('/api/brand', brand_routes_1.default);
app.use('/api/category', category_routes_1.default);
app.use('/api/product', product_routes_1.default);
app.use('/api/wishList', wishlist_routes_1.default);
app.use('/api/cart', cart_routes_1.default);
app.use('/api/order', order_routes_1.default);
app.all('/{*all}', (req, res) => {
    const message = `Cannot ${req.method} @ ${req.originalUrl}`;
    throw new error_handler_middleware_2.default(message, 404);
});
app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
//using error handler middleware 
app.use(error_handler_middleware_1.errorHandler);
