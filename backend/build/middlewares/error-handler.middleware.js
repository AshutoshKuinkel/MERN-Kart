"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
class CustomError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.status = statusCode >= 400 && statusCode < 500 ? "fail" : "error";
        this.success = false;
        Error.captureStackTrace(this, CustomError);
    }
}
const errorHandler = (err, req, res, next) => {
    const statusCode = (err === null || err === void 0 ? void 0 : err.statusCode) || 500;
    const success = (err === null || err === void 0 ? void 0 : err.success) || false;
    const status = (err === null || err === void 0 ? void 0 : err.status) || 'error';
    const message = (err === null || err === void 0 ? void 0 : err.message) || 'Internal Server Error';
    res.status(statusCode).json({
        message,
        success,
        status,
        data: null
    });
};
exports.errorHandler = errorHandler;
exports.default = CustomError;
