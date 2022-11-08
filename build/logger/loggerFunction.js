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
exports.loggerBeforeReturn = exports.loggerResponse = exports.loggerRequest = void 0;
const loggerConfig_1 = __importDefault(require("./loggerConfig"));
function loggerRequest({ method, action, url, body, params, }) {
    return __awaiter(this, void 0, void 0, function* () {
        loggerConfig_1.default.log({
            logger: "disciplina-logger",
            level: "info",
            action: action,
            method: method,
            url: url,
            body: body ? body : [],
            params: params ? params : "Sem parâmetros",
        });
    });
}
exports.loggerRequest = loggerRequest;
function loggerResponse({ action, method, url, response }) {
    return __awaiter(this, void 0, void 0, function* () {
        loggerConfig_1.default.log({
            logger: "disciplina-logger",
            level: "info",
            action: action,
            method: method,
            url: url,
            response: response ? response : {},
        });
    });
}
exports.loggerResponse = loggerResponse;
function loggerBeforeReturn({ message }) {
    return __awaiter(this, void 0, void 0, function* () {
        loggerConfig_1.default.log({
            message: message,
        });
    });
}
exports.loggerBeforeReturn = loggerBeforeReturn;
exports.default = { loggerRequest, loggerResponse, loggerBeforeReturn };
