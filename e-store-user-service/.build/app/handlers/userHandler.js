"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.payment = exports.cart = exports.profile = exports.verify = exports.login = exports.register = void 0;
const core_1 = __importDefault(require("@middy/core"));
const http_json_body_parser_1 = __importDefault(require("@middy/http-json-body-parser"));
const tsyringe_1 = require("tsyringe");
const userService_1 = require("../service/userService");
const response_1 = require("../utility/response");
const userService = tsyringe_1.container.resolve(userService_1.UserService);
exports.register = (0, core_1.default)((event) => {
    return userService.CreateUser(event);
}).use((0, http_json_body_parser_1.default)());
exports.login = (0, core_1.default)((event) => {
    return userService.UserLogin(event);
}).use((0, http_json_body_parser_1.default)());
const verify = (event) => {
    return userService.VerifyUser(event);
};
exports.verify = verify;
const profile = (event) => {
    const httpMethod = event.requestContext.http.method.toLowerCase();
    if (httpMethod === 'post') {
        return userService.CreateProfile(event);
    }
    else if (httpMethod === 'get') {
        return userService.GetProfile(event);
    }
    else if (httpMethod === 'patch' || httpMethod === 'put') {
        return userService.UpdateProfile(event);
    }
    else {
        return (0, response_1.ErrorResponse)(404, 'requested method is not supported!');
    }
};
exports.profile = profile;
const cart = (event) => {
    const httpMethod = event.requestContext.http.method.toLowerCase();
    if (httpMethod === 'post') {
        return userService.CreateCart(event);
    }
    else if (httpMethod === 'get') {
        return userService.GetCart(event);
    }
    else if (httpMethod === 'patch' || httpMethod === 'put') {
        return userService.UpdateCart(event);
    }
    else {
        return (0, response_1.ErrorResponse)(404, 'requested method is not supported!');
    }
};
exports.cart = cart;
const payment = (event) => {
    const httpMethod = event.requestContext.http.method.toLowerCase();
    if (httpMethod === 'post') {
        return userService.CreatePayment(event);
    }
    else if (httpMethod === 'get') {
        return userService.GetPayment(event);
    }
    else if (httpMethod === 'patch' || httpMethod === 'put') {
        return userService.UpdatePayment(event);
    }
    else {
        return (0, response_1.ErrorResponse)(404, 'requested method is not supported!');
    }
};
exports.payment = payment;
//# sourceMappingURL=userHandler.js.map