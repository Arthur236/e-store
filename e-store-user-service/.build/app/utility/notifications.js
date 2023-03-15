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
exports.sendVerificationCode = exports.generateAccessCode = void 0;
const mailgun_js_1 = __importDefault(require("mailgun-js"));
const generateAccessCode = () => {
    const code = Math.floor(10000 + Math.random() * 900000);
    let expiry = new Date();
    expiry.setTime(new Date().getTime() + 30 * 60 * 1000);
    return { code, expiry };
};
exports.generateAccessCode = generateAccessCode;
const sendVerificationCode = (code, toEmail) => __awaiter(void 0, void 0, void 0, function* () {
    const mg = (0, mailgun_js_1.default)({
        apiKey: process.env.MAILGUN_API_KEY || '',
        domain: process.env.MAILGUN_DOMAIN || '',
    });
    const emailToSend = {
        from: 'noreply@e-store.com',
        to: toEmail.trim(),
        subject: 'E-Store Verification',
        html: `<p>Your verification code is <b>${code}</b>. It will expire within 30 minutes.</p>`,
    };
    console.log(emailToSend);
    try {
        yield mg.messages().send(emailToSend);
    }
    catch (err) {
        console.error('Mailgun Error:', err);
    }
    return emailToSend;
});
exports.sendVerificationCode = sendVerificationCode;
//# sourceMappingURL=notifications.js.map