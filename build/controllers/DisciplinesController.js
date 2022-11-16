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
exports.Disciplinadelete = exports.patchDisciplina = exports.putDisciplina = exports.postDisciplina = exports.getDiciplinas = exports.getAllOrQuery = void 0;
const disciplines_view_1 = __importDefault(require("../view/disciplines_view"));
const Discipline_1 = __importDefault(require("../model/Discipline"));
const axios_1 = __importDefault(require("axios"));
const DisciplineYup_1 = __importDefault(require("../model/DisciplineYup"));
const DisciplineYupUpdate_1 = __importDefault(require("../model/DisciplineYupUpdate"));
const loggerFunction_1 = require("../logger/loggerFunction");
const serviceUrl = "http://ec2-34-238-114-89.compute-1.amazonaws.com:3000/";
const axiosConfig = { baseURL: serviceUrl };
const axiosInstance = axios_1.default.create(axiosConfig);
//GET<root>/<api>: Busca todas as disciplinas que estão cadastradas ou com os campos informados
function getAllOrQuery(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            (0, loggerFunction_1.loggerRequest)({
                method: "GetAllOrQuery",
                action: "Buscar disciplinas com query ou não",
                url: request.url,
                body: request.body,
                params: request.params,
            });
            const query = request.query;
            const disciplines = yield Discipline_1.default.find(query);
            if (disciplines) {
                (0, loggerFunction_1.loggerResponse)({
                    method: "GetAllOrQuery",
                    action: "Buscar disciplinas com query ou não",
                    url: request.url,
                    response: disciplines_view_1.default.renderMany(disciplines),
                });
                return response
                    .status(200)
                    .json(disciplines_view_1.default.renderMany(disciplines));
            }
            (0, loggerFunction_1.loggerBeforeReturn)({ message: "Não há disciplinas cadastradas" });
            return response.status(204).json("Não há disciplinas cadastradas");
        }
        catch (error) {
            (0, loggerFunction_1.loggerBeforeReturn)({ message: "Falha no servidor:" });
            return response.status(500).send("Falha no servidor:" + error);
        }
    });
}
exports.getAllOrQuery = getAllOrQuery;
//GET<root>/<api>/<id>: Busca uma disciplina
function getDiciplinas(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            (0, loggerFunction_1.loggerRequest)({
                method: "GET",
                action: "Buscar disciplinas por id",
                url: request.url,
                body: request.body,
                params: request.params,
            });
            const { id } = request.params;
            const findOne = yield Discipline_1.default.findById(id);
            if (findOne) {
                if (request.query.expand === "turmas") {
                    const { data } = yield axiosInstance
                        .get(`turma/${findOne === null || findOne === void 0 ? void 0 : findOne.turma}`)
                        .catch(function (error) {
                        (0, loggerFunction_1.loggerBeforeReturn)({ message: "Erro na busca da API Turmas" });
                        return response
                            .status(500)
                            .send("Erro na busca da API Turmas" + error);
                    });
                    (0, loggerFunction_1.loggerResponse)({
                        method: "GET",
                        action: "Buscar disciplinas por id",
                        url: request.url,
                        response: disciplines_view_1.default.renderWithExpandsTurma(findOne, data),
                    });
                    return response
                        .status(200)
                        .json(disciplines_view_1.default.renderWithExpandsTurma(findOne, data));
                }
                (0, loggerFunction_1.loggerResponse)({
                    method: "GET",
                    action: "Buscar disciplinas por id",
                    url: request.url,
                    response: disciplines_view_1.default.render(findOne),
                });
                return response.status(200).json(disciplines_view_1.default.render(findOne));
            }
            else {
                (0, loggerFunction_1.loggerBeforeReturn)({ message: "Objeto não encontrado encontrado" });
                return response.status(404).send("Objeto não encontrado encontrado");
            }
        }
        catch (error) {
            (0, loggerFunction_1.loggerBeforeReturn)({ message: "Falha no servidor:" });
            return response.status(500).send("Falha no servidor:" + error);
        }
    });
}
exports.getDiciplinas = getDiciplinas;
//POST<root>/<api>: Registra uma nova disciplina
function postDisciplina(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            (0, loggerFunction_1.loggerRequest)({
                method: "POST",
                url: request.url,
                action: "Registra uma nova disciplina",
                body: request.body,
                params: request.params,
            });
            const { nome, objetivos, ementa, bibliografia, codigo, creditos, turma, } = request.body;
            const data = {
                nome,
                objetivos,
                ementa,
                bibliografia,
                codigo,
                creditos,
                turma,
            };
            try {
                yield DisciplineYup_1.default
                    .validate(data, { abortEarly: false })
                    .catch((errors) => {
                    const schemaErrors = errors.inner.map((err) => {
                        return { campo: err.path, mensagem: err.message };
                    });
                    (0, loggerFunction_1.loggerBeforeReturn)({ message: "Campos informados inválidos" });
                    return response.status(400).json({
                        success: false,
                        mensagem: "Campos informados inválidos",
                        erros: schemaErrors,
                    });
                });
            }
            catch (error) {
                (0, loggerFunction_1.loggerBeforeReturn)({ message: "Fail to validate data: " });
                return response.status(500).json({ "Fail to validate data: ": error });
            }
            const findOne = yield Discipline_1.default.findOne({ codigo: codigo });
            if (findOne) {
                (0, loggerFunction_1.loggerBeforeReturn)({ message: "Objeto já existe" });
                return response.status(302).send("Objeto já existe");
            }
            const discipline = yield Discipline_1.default.create(data);
            (0, loggerFunction_1.loggerResponse)({
                method: "POST",
                action: "Registra uma nova disciplina",
                url: request.url,
                response: findOne
                    ? disciplines_view_1.default.render(findOne)
                    : disciplines_view_1.default.render(discipline),
            });
            return response.status(201).json(disciplines_view_1.default.render(discipline));
        }
        catch (error) {
            (0, loggerFunction_1.loggerBeforeReturn)({ message: "Falha no servidor" });
            return response.status(500).send("Falha no servidor:" + error);
        }
    });
}
exports.postDisciplina = postDisciplina;
//PUT<root>/<api>/id>: Atualiza a disciplina com esse id
function putDisciplina(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            (0, loggerFunction_1.loggerRequest)({
                method: "PUT",
                action: "Atualiza a disciplina com o id",
                url: request.url,
                body: request.body,
                params: request.params,
            });
            const { id } = request.params;
            const { nome, objetivos, ementa, bibliografia, codigo, creditos, turma, } = request.body;
            const data = {
                nome,
                objetivos,
                ementa,
                bibliografia,
                codigo,
                creditos,
                turma,
            };
            try {
                yield DisciplineYup_1.default
                    .validate(data, { abortEarly: false })
                    .catch((errors) => {
                    const schemaErrors = errors.inner.map((err) => {
                        return { campo: err.path, mensagem: err.message };
                    });
                    (0, loggerFunction_1.loggerBeforeReturn)({ message: "Campos informados inválidos" });
                    return response.status(400).json({
                        success: false,
                        mensagem: "Campos informados inválidos",
                        erros: schemaErrors,
                    });
                });
            }
            catch (error) {
                (0, loggerFunction_1.loggerBeforeReturn)({ message: "Fail to validate data: " });
                return response.status(500).json({ "Fail to validate data: ": error });
            }
            const discipline = yield Discipline_1.default.findByIdAndUpdate(id, data, {
                new: true,
            });
            (0, loggerFunction_1.loggerResponse)({
                method: "PUT",
                action: "Atualiza a disciplina com o id",
                url: request.url,
                response: disciplines_view_1.default.render(discipline),
            });
            return response.status(200).json(disciplines_view_1.default.render(discipline));
        }
        catch (error) {
            (0, loggerFunction_1.loggerBeforeReturn)({ message: "Falha no servidor: " });
            return response.status(500).send("Falha no servidor: " + error);
        }
    });
}
exports.putDisciplina = putDisciplina;
//PATCH<root>/<api>/id>: Atualiza parcialmente a disciplina com aquele id
function patchDisciplina(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            (0, loggerFunction_1.loggerRequest)({
                method: "PATCH",
                url: request.url,
                action: "Atualiza parcialmente a disciplina com o id",
                body: request.body,
                params: request.params,
            });
            const { id } = request.params;
            const { nome, objetivos, ementa, bibliografia, codigo, creditos, turma, } = request.body;
            const data = {
                nome,
                objetivos,
                ementa,
                bibliografia,
                codigo,
                creditos,
                turma,
            };
            try {
                yield DisciplineYupUpdate_1.default
                    .validate(data, { abortEarly: false })
                    .catch((errors) => {
                    const schemaErrors = errors.inner.map((err) => {
                        return { campo: err.path, mensagem: err.message };
                    });
                    (0, loggerFunction_1.loggerBeforeReturn)({ message: "Campos informados inválidos" });
                    return response.status(400).json({
                        success: false,
                        mensagem: "Campos informados inválidos",
                        erros: schemaErrors,
                    });
                });
            }
            catch (error) {
                (0, loggerFunction_1.loggerBeforeReturn)({ message: "Fail to validate data: " });
                return response.status(500).json({ "Fail to validate data: ": error });
            }
            const findOne = yield Discipline_1.default.findByIdAndUpdate(id, data, {
                new: true,
            });
            (0, loggerFunction_1.loggerResponse)({
                method: "PATCH",
                action: "Atualiza parcialmente a disciplina com o id",
                url: request.url,
                response: disciplines_view_1.default.render(findOne),
            });
            return response.status(200).json(disciplines_view_1.default.render(findOne));
        }
        catch (error) {
            (0, loggerFunction_1.loggerBeforeReturn)({ message: "Falha no servidor: " });
            return response.status(500).send("Falha no servidor:" + error);
        }
    });
}
exports.patchDisciplina = patchDisciplina;
//DELETE<root>/<api>/<id>:Deleta uma disciplina
function Disciplinadelete(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            (0, loggerFunction_1.loggerRequest)({
                method: "DELETE",
                url: request.url,
                action: "Deleta uma disciplina",
                body: request.body,
                params: request.params,
            });
            const { id } = request.params;
            const discipline = yield Discipline_1.default.findByIdAndRemove(id);
            if (discipline) {
                (0, loggerFunction_1.loggerResponse)({
                    method: "DELETE",
                    url: request.url,
                    action: "Deleta uma disciplina",
                    response: discipline,
                });
                return response.status(200).send("Disciplina deletada com sucesso");
            }
            (0, loggerFunction_1.loggerBeforeReturn)({ message: "Disciplina não encontrada" });
            return response.status(404).send("Disciplina não encontrada");
        }
        catch (error) {
            (0, loggerFunction_1.loggerBeforeReturn)({ message: "Falha no servidor: " });
            return response.status(500).send("Falha no servidor:" + error);
        }
    });
}
exports.Disciplinadelete = Disciplinadelete;
