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
exports.updateUserPassword = exports.deleteUser = exports.updateUser = exports.createUser = exports.getUserById = exports.getAllUsers = exports.refreshToken = exports.getToken = void 0;
const axios_1 = __importDefault(require("axios"));
const qs_1 = __importDefault(require("qs"));
const config_1 = require("../config");
const errors_1 = require("../errors/errors");
const TOKEN_ENDPOINT = `http://${config_1.KEYCLOAK_HOST}:${config_1.KEYCLOAK_PORT}/auth/realms/${config_1.REALM_NAME}/protocol/openid-connect/token`;
function getToken(body) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield axios_1.default.post(TOKEN_ENDPOINT, qs_1.default.stringify(body), {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            });
            return response.data;
        }
        catch (error) {
            console.log(error);
            throw new errors_1.APIError((error === null || error === void 0 ? void 0 : error.response.status) || 400, (error === null || error === void 0 ? void 0 : error.response.data.error_description) ||
                (error === null || error === void 0 ? void 0 : error.response.data.error) ||
                "Invalid username or password.");
        }
    });
}
exports.getToken = getToken;
function refreshToken(body) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield axios_1.default.post(TOKEN_ENDPOINT, qs_1.default.stringify(body), {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            });
            return response.data;
        }
        catch (error) {
            throw new errors_1.APIError((error === null || error === void 0 ? void 0 : error.response.status) || 400, (error === null || error === void 0 ? void 0 : error.response.data.error_description) ||
                (error === null || error === void 0 ? void 0 : error.response.data.error) ||
                "Invalid refresh token.");
        }
    });
}
exports.refreshToken = refreshToken;
const USERS_ENDPOINT = `http://${config_1.KEYCLOAK_HOST}:${config_1.KEYCLOAK_PORT}/auth/admin/realms/${config_1.REALM_NAME}/users`;
function getAllUsers(accessToken) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield axios_1.default.get(USERS_ENDPOINT, {
                headers: {
                    Authorization: accessToken,
                },
            });
            const users = response.data.map((user) => {
                return {
                    sub: user.id,
                    preferred_username: user.username,
                    given_name: user.firstName || "",
                    family_name: user.lastName || "",
                    email: user.email || "",
                };
            });
            return users;
        }
        catch (error) {
            throw new errors_1.APIError((error === null || error === void 0 ? void 0 : error.response.status) || 400, (error === null || error === void 0 ? void 0 : error.response.data.error_description) ||
                (error === null || error === void 0 ? void 0 : error.response.data.error) ||
                "Error fetching all users.");
        }
    });
}
exports.getAllUsers = getAllUsers;
function getUserById(id, accessToken) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield axios_1.default.get(`${USERS_ENDPOINT}/${id}`, {
                headers: {
                    Authorization: accessToken,
                },
            });
            const user = {
                sub: response.data.id,
                preferred_username: response.data.username,
                given_name: response.data.firstName || "",
                family_name: response.data.lastName || "",
                email: response.data.email || "",
            };
            return user;
        }
        catch (error) {
            throw new errors_1.APIError((error === null || error === void 0 ? void 0 : error.response.status) || 400, (error === null || error === void 0 ? void 0 : error.response.data.error_description) ||
                (error === null || error === void 0 ? void 0 : error.response.data.error) ||
                "Error getting user by ID.");
        }
    });
}
exports.getUserById = getUserById;
function createUser(body, accessToken) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield axios_1.default.post(USERS_ENDPOINT, Object.assign(Object.assign({}, body), { enabled: true }), {
                headers: {
                    Authorization: accessToken,
                    "Content-Type": "application/json",
                },
            });
            /*
              POST returns no data, so we have to fetch the created user.
            */
            const userID = response.headers.location.split("/").slice(-1)[0];
            const user = yield getUserById(userID, accessToken);
            return {
                sub: (user === null || user === void 0 ? void 0 : user.sub) || "",
                preferred_username: (user === null || user === void 0 ? void 0 : user.preferred_username) || "",
                given_name: (user === null || user === void 0 ? void 0 : user.given_name) || "",
                family_name: (user === null || user === void 0 ? void 0 : user.family_name) || "",
                email: (user === null || user === void 0 ? void 0 : user.email) || "",
            };
        }
        catch (error) {
            throw new errors_1.APIError((error === null || error === void 0 ? void 0 : error.response.status) || 400, (error === null || error === void 0 ? void 0 : error.response.data.error_description) ||
                (error === null || error === void 0 ? void 0 : error.response.data.error) ||
                "Error creating user.");
        }
    });
}
exports.createUser = createUser;
function updateUser(id, body, accessToken) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield axios_1.default.put(`${USERS_ENDPOINT}/${id}`, body, {
                headers: {
                    Authorization: accessToken,
                    "Content-Type": "application/json",
                },
            });
        }
        catch (error) {
            throw new errors_1.APIError((error === null || error === void 0 ? void 0 : error.response.status) || 400, (error === null || error === void 0 ? void 0 : error.response.data.error_description) ||
                (error === null || error === void 0 ? void 0 : error.response.data.error) ||
                "Error updating user.");
        }
    });
}
exports.updateUser = updateUser;
function deleteUser(id, accessToken) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield axios_1.default.delete(`${USERS_ENDPOINT}/${id}`, {
                headers: {
                    Authorization: accessToken,
                },
            });
        }
        catch (error) {
            throw new errors_1.APIError((error === null || error === void 0 ? void 0 : error.response.status) || 400, (error === null || error === void 0 ? void 0 : error.response.data.error_description) ||
                (error === null || error === void 0 ? void 0 : error.response.data.error) ||
                "Error deleting user.");
        }
    });
}
exports.deleteUser = deleteUser;
function updateUserPassword(id, password, accessToken) {
    return __awaiter(this, void 0, void 0, function* () {
        const UPDATE_PASSWORD_ENDPOINT = `http://${config_1.KEYCLOAK_HOST}:${config_1.KEYCLOAK_PORT}/auth/admin/realms/${config_1.REALM_NAME}/users/${id}/reset-password`;
        try {
            yield axios_1.default.put(UPDATE_PASSWORD_ENDPOINT, { type: "password", value: password, temporary: false }, {
                headers: {
                    Authorization: accessToken,
                    "Content-Type": "application/json",
                },
            });
        }
        catch (error) {
            throw new errors_1.APIError((error === null || error === void 0 ? void 0 : error.response.status) || 400, (error === null || error === void 0 ? void 0 : error.response.data.error_description) ||
                (error === null || error === void 0 ? void 0 : error.response.data.error) ||
                "Error updating password.");
        }
    });
}
exports.updateUserPassword = updateUserPassword;
