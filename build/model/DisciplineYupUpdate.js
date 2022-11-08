"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const validator_1 = __importDefault(require("../validator/validator"));
const disciplineYupUpdate = validator_1.default.object().shape({
    nome: validator_1.default.string().optional().min(5).max(30),
    objetivos: validator_1.default.string().optional().min(10).max(300),
    ementa: validator_1.default.string().optional().min(10).max(300),
    bibliografia: validator_1.default
        .array(validator_1.default.string().optional().min(10).max(50))
        .optional()
        .min(1)
        .max(10),
    codigo: validator_1.default.string().optional().min(5).max(5),
    creditos: validator_1.default.string().optional().min(2).max(2),
    turma: validator_1.default.string().optional(),
});
exports.default = disciplineYupUpdate;