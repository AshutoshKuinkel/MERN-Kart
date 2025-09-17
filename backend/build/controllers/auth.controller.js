"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.profile = exports.logout = exports.changePassword = exports.forgotPassword = exports.login = exports.register = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const error_handler_middleware_1 = __importDefault(require("../middlewares/error-handler.middleware"));
const bcrypt_utils_1 = require("../utils/bcrypt.utils");
const jwt_utils_1 = require("../utils/jwt.utils");
const dotenv_1 = __importDefault(require("dotenv"));
const resend_1 = require("resend");
dotenv_1.default.config();
//register
const register = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { firstName, lastName, email, password, phone } = req.body;
        if (!password) {
            throw new error_handler_middleware_1.default(`password is required`, 400);
        }
        const user = yield user_model_1.default.create({
            firstName,
            lastName,
            email,
            password,
            phone,
        });
        const hashedPassword = yield (0, bcrypt_utils_1.hashPassword)(password);
        user.password = hashedPassword;
        yield user.save();
        const _a = user._doc, { password: pass } = _a, newUser = __rest(_a, ["password"]);
        res.status(201).json({
            message: "User registered successfully",
            status: "success",
            success: true,
            data: newUser,
        });
    }
    catch (err) {
        next(err);
    }
});
exports.register = register;
//login
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //1. email password validation
        const { email, password } = req.body;
        if (!email || !password) {
            throw new error_handler_middleware_1.default("Email and password are required", 400);
        }
        //2. find user by email
        const user = yield user_model_1.default.findOne({ email }).select("+password");
        if (!user) {
            throw new error_handler_middleware_1.default("Invalid Credentials", 400);
        }
        //3. check if password matches (user.password === pass)
        const isPassMatch = yield (0, bcrypt_utils_1.compareHash)(password, user.password);
        if (!isPassMatch) {
            throw new error_handler_middleware_1.default("Invalid Credentials", 400);
        }
        const payload = {
            _id: user._id,
            role: user.role,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
        };
        //generate jwt token
        const access_token = (0, jwt_utils_1.generateToken)(payload);
        const _a = user._doc, { password: pass } = _a, loggedInUser = __rest(_a, ["password"]);
        const resend = new resend_1.Resend("re_HyLv2LRq_8UUYZxsaPuruzFU37qj3yGQ8");
        resend.emails.send({
            from: `ashutoshkuinkel7@gmail.com`,
            to: "ashutoshkuinkel7@gmail.com",
            subject: "Logged in User",
            html: "<p>Was this you that just logged into MERN Kart?</p>",
        });
        res
            .cookie("access_token", access_token, {
            secure: process.env.NODE_ENV === "development" ? false : true,
            httpOnly: true,
            maxAge: Number(process.env.COOKIE_EXPIRY) * 24 * 60 * 60 * 1000,
            sameSite: "none",
        })
            .status(200)
            .json({
            message: "Login successful",
            status: "success",
            success: true,
            data: {
                data: loggedInUser,
                access_token,
            },
        });
    }
    catch (err) {
        next(err);
    }
});
exports.login = login;
//forgot password
const forgotPassword = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.body;
        const user = yield user_model_1.default.findOne({ email });
        if (!user) {
            return res.status(404).json({
                message: "User not found",
                status: "fail",
                success: false,
                data: null,
            });
        }
        res.status(200).json({
            message: "Password reset link sent to your email",
            status: "success",
            success: true,
            data: null,
        });
    }
    catch (err) {
        next(err);
    }
});
exports.forgotPassword = forgotPassword;
//change password 1
// This is another version of the changePassword controller.
// export const changePassword = async(req:Request,res:Response,next:NextFunction)=>{
//   try{
//     const {email,oldPassword,newPassword} = req.body;
//     const user = await User.findOne({email, password: oldPassword});
//     if(!user){
//       return res.status(401).json({
//         message: 'Invalid email or old password',
//         status: 'fail',
//         success: false,
//         data: null
//       });
//     }
//     user.password = newPassword;
//     await user.save();
//     res.status(200).json({
//       message: 'Password changed successfully',
//       status: 'success',
//       success: true,
//       data: null
//     });
//   } catch(err){
//     next(err);
//   }
// }
//change password 2
const changePassword = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, oldPassword, newPassword } = req.body;
        if (!newPassword || !oldPassword || !email) {
            throw new error_handler_middleware_1.default("Invalid Credentials", 400);
        }
        const user = yield user_model_1.default.findOne({ email }).select("+password");
        if (!user) {
            throw new error_handler_middleware_1.default("Something went wrong", 400);
        }
        const isPassMatched = (0, bcrypt_utils_1.compareHash)(oldPassword, user.password);
        if (!isPassMatched) {
            throw new error_handler_middleware_1.default(`Password does not match`, 400);
        }
        user.password = yield (0, bcrypt_utils_1.hashPassword)(newPassword);
        yield user.save();
        res.status(201).json({
            message: "Password updated successfully",
            status: "success",
            success: true,
        });
    }
    catch (err) {
        next(err);
    }
});
exports.changePassword = changePassword;
//logout
const logout = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res
            .clearCookie("access_token", {
            secure: process.env.NODE_ENV === "development" ? false : true,
            httpOnly: true,
            sameSite: "none",
        })
            .status(200)
            .json({
            message: `Successfully Logged out.`,
            success: true,
            status: "success",
            data: null,
        });
    }
    catch (err) {
        next(err);
    }
});
exports.logout = logout;
//check
const profile = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.user._id;
        const user = yield user_model_1.default.findById(userId);
        if (!user) {
            throw new error_handler_middleware_1.default("User not found", 400);
        }
        res.status(200).json({
            message: `profile fetched.`,
            success: true,
            status: "success",
            data: user,
        });
    }
    catch (err) {
        next(err);
    }
});
exports.profile = profile;
