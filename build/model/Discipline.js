"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const disciplineSchema = new mongoose_1.default.Schema({
    nome: {
        type: String,
        required: true,
    },
    objetivos: {
        type: String,
        required: true,
    },
    ementa: {
        type: String,
        required: true,
    },
    bibliografia: {
        type: [String],
        required: true,
    },
    codigo: {
        type: Number,
        requires: true,
    },
    creditos: {
        type: Number,
        requires: true,
    },
});
