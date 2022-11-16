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
Object.defineProperty(exports, "__esModule", { value: true });
const controller = __importStar(require("../controllers/controller"));
const disciplines = __importStar(require("../controllers/DisciplinesController"));
const middleware_1 = require("../middlewares/middleware");
var HTTPMethod;
(function (HTTPMethod) {
    HTTPMethod["GET"] = "GET";
    HTTPMethod["POST"] = "POST";
    HTTPMethod["PUT"] = "PUT";
    HTTPMethod["PATCH"] = "PATCH";
    HTTPMethod["DELETE"] = "DELETE";
})(HTTPMethod || (HTTPMethod = {}));
var Authorization;
(function (Authorization) {
    Authorization["ACCESS_TOKEN"] = "ACCESS_TOKEN";
    Authorization["NO_ACCESS_TOKEN"] = "NO_ACCESS_TOKEN";
})(Authorization || (Authorization = {}));
class Router {
    constructor(app) {
        this.app = app;
    }
    createRoute(path, method, controllerFunction, authorization) {
        switch (method) {
            case HTTPMethod.GET:
                {
                    if (authorization === Authorization.NO_ACCESS_TOKEN) {
                        this.app.get(path, controllerFunction);
                    }
                    else {
                        this.app.get(path, middleware_1.checkAccessToken, controllerFunction);
                    }
                }
                break;
            case HTTPMethod.POST:
                if (authorization === Authorization.NO_ACCESS_TOKEN) {
                    this.app.post(path, controllerFunction);
                }
                else {
                    this.app.post(path, middleware_1.checkAccessToken, controllerFunction);
                }
                break;
            case HTTPMethod.PUT:
                if (authorization === Authorization.NO_ACCESS_TOKEN) {
                    this.app.put(path, controllerFunction);
                }
                else {
                    this.app.put(path, middleware_1.checkAccessToken, controllerFunction);
                }
                break;
            case HTTPMethod.PATCH:
                if (authorization === Authorization.NO_ACCESS_TOKEN) {
                    this.app.patch(path, controllerFunction);
                }
                else {
                    this.app.patch(path, middleware_1.checkAccessToken, controllerFunction);
                }
                break;
            case HTTPMethod.DELETE:
                if (authorization === Authorization.NO_ACCESS_TOKEN) {
                    this.app.delete(path, controllerFunction);
                }
                else {
                    this.app.delete(path, middleware_1.checkAccessToken, controllerFunction);
                }
                break;
        }
    }
    /*
      Routes.
    */
    setupRoutes() {
        this.createRoute("/login", HTTPMethod.POST, controller.login, Authorization.NO_ACCESS_TOKEN);
        this.createRoute("/users", HTTPMethod.GET, controller.getAllUsers, Authorization.ACCESS_TOKEN);
        this.createRoute("/users/:id", HTTPMethod.GET, controller.getUserById, Authorization.ACCESS_TOKEN);
        this.createRoute("/users", HTTPMethod.POST, controller.createUser, Authorization.ACCESS_TOKEN);
        this.createRoute("/users/:id", HTTPMethod.PUT, controller.updateUser, Authorization.ACCESS_TOKEN);
        this.createRoute("/users/:id", HTTPMethod.PATCH, controller.updateUserPassword, Authorization.ACCESS_TOKEN);
        this.createRoute("/users/:id", HTTPMethod.DELETE, controller.deleteUser, Authorization.ACCESS_TOKEN);
        //diciplinas
        this.createRoute("/Diciplina", HTTPMethod.GET, disciplines.getAllOrQuery, Authorization.NO_ACCESS_TOKEN);
        this.createRoute("/DiciplineP", HTTPMethod.POST, disciplines.postDisciplina, Authorization.NO_ACCESS_TOKEN);
    }
}
exports.default = Router;
