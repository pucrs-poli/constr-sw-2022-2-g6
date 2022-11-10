"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkAccessToken = void 0;
const token_1 = __importDefault(require("../token/token"));
function checkAccessToken(_req, res, next) {
    const accessToken = token_1.default.getAccessToken();
    if (!accessToken) {
        return res.status(401).send("Unauthorized. Not logged in.");
    }
    next();
}
exports.checkAccessToken = checkAccessToken;
