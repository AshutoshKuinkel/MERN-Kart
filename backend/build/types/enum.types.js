"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paymentMethod = exports.orderStatus = exports.Role = void 0;
var Role;
(function (Role) {
    Role["ADMIN"] = "ADMIN";
    Role["USER"] = "USER";
    Role["SUPER_ADMIN"] = "SUPER ADMIN";
})(Role || (exports.Role = Role = {}));
var orderStatus;
(function (orderStatus) {
    orderStatus["PENDING"] = "PENDING";
    orderStatus["PROCESSING"] = "PROCESSING";
    orderStatus["SHIPPED"] = "SHIPPED";
    orderStatus["COMPLETED"] = "COMPLETED";
    orderStatus["CANCELED"] = "CANCELED";
})(orderStatus || (exports.orderStatus = orderStatus = {}));
var paymentMethod;
(function (paymentMethod) {
    paymentMethod["COD"] = "COD";
    paymentMethod["CARD"] = "CARD";
})(paymentMethod || (exports.paymentMethod = paymentMethod = {}));
