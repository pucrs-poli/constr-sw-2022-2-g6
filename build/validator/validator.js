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
const yup = __importStar(require("yup"));
yup.setLocale({
    mixed: {
        default: "é inválido",
        required: "é um campo obrigatório",
        oneOf: "deve ser um dos seguintes valores: ${values}",
        notOneOf: "não pode ser um dos seguintes valores: ${values}",
    },
    string: {
        length: "deve ter exatamente ${length} caracteres",
        min: "deve ter pelo menos ${min} caracteres",
        max: "deve ter no máximo ${max} caracteres",
        email: "tem o formato de e-mail inválido",
        url: "deve ter um formato de URL válida",
        trim: "não deve conter espaços no início ou no fim.",
        lowercase: "deve estar em maiúsculo",
        uppercase: "deve estar em minúsculo",
    },
    number: {
        min: "deve ser no mínimo ${min}",
        max: "deve ser no máximo ${max}",
        lessThan: "deve ser menor que ${less}",
        moreThan: "deve ser maior que ${more}",
        positive: "deve ser um número posítivo",
        negative: "deve ser um número negativo",
        integer: "deve ser um número inteiro",
    },
    date: {
        min: "deve ser maior que a data ${min}",
        max: "deve ser menor que a data ${max}",
    },
    array: {
        min: "deve ter no mínimo ${min} itens",
        max: "deve ter no máximo ${max} itens",
    },
});
exports.default = yup;
