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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUserPassword = exports.updateUser = exports.createUser = exports.getUserById = exports.getAllUsers = exports.login = void 0;
const errors_1 = require("../errors/errors");
const service = __importStar(require("../services/service"));
function login(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const body = req.body;
        try {
            const loginInfo = yield service.login(body);
            res.status(200).json(loginInfo);
        }
        catch (error) {
            (0, errors_1.handleError)(res, error);
        }
    });
}
exports.login = login;
function getAllUsers(_req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const users = yield service.getAllUsers();
            res.status(200).json(users);
        }
        catch (error) {
            (0, errors_1.handleError)(res, error);
        }
    });
}
exports.getAllUsers = getAllUsers;
function getUserById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.id;
        try {
            const user = yield service.getUserById(id);
            res.status(200).json(user);
        }
        catch (error) {
            (0, errors_1.handleError)(res, error);
        }
    });
}
exports.getUserById = getUserById;
function createUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const body = req.body;
        try {
            const newUser = yield service.createUser(body);
            res.status(201).json(newUser);
        }
        catch (error) {
            (0, errors_1.handleError)(res, error);
        }
    });
}
exports.createUser = createUser;
function updateUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.id;
        const body = req.body;
        try {
            yield service.updateUser(id, body);
            res.status(204).json({});
        }
        catch (error) {
            (0, errors_1.handleError)(res, error);
        }
    });
}
exports.updateUser = updateUser;
function updateUserPassword(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.id;
        const password = req.body.password;
        try {
            yield service.updateUserPassword(id, password);
            res.status(204).json({});
        }
        catch (error) {
            (0, errors_1.handleError)(res, error);
        }
    });
}
exports.updateUserPassword = updateUserPassword;
function deleteUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.id;
        try {
            yield service.deleteUser(id);
            res.status(204).json({});
        }
        catch (error) {
            (0, errors_1.handleError)(res, error);
        }
    });
}
exports.deleteUser = deleteUser;
