"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.deleteUser = exports.updateUserPassword = exports.updateUser = exports.createUser = exports.getUserById = exports.getAllUsers = exports.login = void 0;
const config_1 = require("../config");
const keycloak = __importStar(require("../external/keycloak"));
const token_1 = __importDefault(require("../token/token"));
function login(body) {
    return __awaiter(this, void 0, void 0, function* () {
        const tokenBody = {
            client_id: body.client_id,
            client_secret: config_1.CLIENT_SECRET,
            username: body.username,
            password: body.password,
            grant_type: body.grant_type,
        };
        const tokenInfo = yield keycloak.getToken(tokenBody);
        token_1.default.update({
            clientId: body.client_id,
            accessToken: `Bearer ${tokenInfo.access_token}`,
            expiresIn: tokenInfo.expires_in,
            refreshToken: tokenInfo.refresh_token,
        });
        return {
            token_type: tokenInfo.token_type,
            access_token: tokenInfo.access_token,
            expires_in: tokenInfo.expires_in,
            refresh_token: tokenInfo.refresh_token,
            refresh_expires_in: tokenInfo.refresh_expires_in,
        };
    });
}
exports.login = login;
function getAllUsers() {
    return __awaiter(this, void 0, void 0, function* () {
        const accessToken = token_1.default.getAccessToken();
        return yield keycloak.getAllUsers(accessToken);
    });
}
exports.getAllUsers = getAllUsers;
function getUserById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const accessToken = token_1.default.getAccessToken();
        return yield keycloak.getUserById(id, accessToken);
    });
}
exports.getUserById = getUserById;
function createUser(user) {
    return __awaiter(this, void 0, void 0, function* () {
        const accessToken = token_1.default.getAccessToken();
        return yield keycloak.createUser(user, accessToken);
    });
}
exports.createUser = createUser;
function updateUser(id, user) {
    return __awaiter(this, void 0, void 0, function* () {
        const accessToken = token_1.default.getAccessToken();
        yield keycloak.updateUser(id, user, accessToken);
    });
}
exports.updateUser = updateUser;
function updateUserPassword(id, password) {
    return __awaiter(this, void 0, void 0, function* () {
        const accessToken = token_1.default.getAccessToken();
        yield keycloak.updateUserPassword(id, password, accessToken);
    });
}
exports.updateUserPassword = updateUserPassword;
function deleteUser(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const accessToken = token_1.default.getAccessToken();
        yield keycloak.deleteUser(id, accessToken);
    });
}
exports.deleteUser = deleteUser;
