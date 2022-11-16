"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const routes = (0, express_1.Router)();
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const DisciplinesController_1 = __importDefault(require("../controllers/DisciplinesController"));
routes.get("/disciplinas", (0, express_async_handler_1.default)(DisciplinesController_1.default.getAllOrQuery));
routes.get("/disciplinas/:id", (0, express_async_handler_1.default)(DisciplinesController_1.default.get));
routes.delete("/disciplinas/:id", (0, express_async_handler_1.default)(DisciplinesController_1.default.delete));
routes.post("/disciplinas", (0, express_async_handler_1.default)(DisciplinesController_1.default.post));
routes.put("/disciplinas/:id", (0, express_async_handler_1.default)(DisciplinesController_1.default.put));
routes.patch("/disciplinas/:id", (0, express_async_handler_1.default)(DisciplinesController_1.default.patch));
exports.default = routes;
