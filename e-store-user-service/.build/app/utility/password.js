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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.getToken = exports.validatePassword = exports.getHashedPassword = exports.getSalt = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const APP_SECRET = 'our_app_secret';
const getSalt = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield bcrypt_1.default.genSalt();
});
exports.getSalt = getSalt;
const getHashedPassword = (password, salt) => __awaiter(void 0, void 0, void 0, function* () {
    return yield bcrypt_1.default.hash(password, salt);
});
exports.getHashedPassword = getHashedPassword;
const validatePassword = (enteredPassword, savedPassword, salt) => __awaiter(void 0, void 0, void 0, function* () {
    return (yield (0, exports.getHashedPassword)(enteredPassword, salt)) == savedPassword;
});
exports.validatePassword = validatePassword;
const getToken = ({ user_id, email, phone, userType }) => {
    return jsonwebtoken_1.default.sign({
        user_id,
        email,
        phone,
        userType,
    }, APP_SECRET, {
        expiresIn: '30d',
    });
};
exports.getToken = getToken;
const verifyToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (token !== '') {
            const payload = yield jsonwebtoken_1.default.verify(token.split(' ')[1], APP_SECRET);
            return payload;
        }
        return false;
    }
    catch (error) {
        console.log(error);
        return false;
    }
});
exports.verifyToken = verifyToken;
//# sourceMappingURL=password.js.map