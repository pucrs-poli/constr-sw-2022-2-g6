"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    render(discipline) {
        return {
            _id: discipline._id,
            nome: discipline.nome,
            objetivos: discipline.objetivos,
            ementa: discipline.ementa,
            bibliografia: discipline.bibliografia,
            codigo: discipline.codigo,
            creditos: discipline.creditos,
            criado: discipline.criado,
            turma: discipline.turma,
        };
    },
    renderTurma(turma) {
        return {
            horario: turma.horario,
            alunos: turma.alunos,
            _id: turma._id,
            numero: turma.numero,
            ano: turma.ano,
            semestre: turma.semestre,
            sala: turma.sala,
            aulas: turma.aulas,
            professor: turma.professor,
        };
    },
    renderMany(disciplines) {
        return disciplines.map((discipline) => this.render(discipline));
    },
    renderManyTurmas(turmas) {
        return turmas.map((turma) => this.renderTurma(turma));
    },
    renderWithExpandsTurma(discipline, turma) {
        return {
            _id: discipline._id,
            nome: discipline.nome,
            objetivos: discipline.objetivos,
            ementa: discipline.ementa,
            bibliografia: discipline.bibliografia,
            codigo: discipline.codigo,
            creditos: discipline.creditos,
            criado: discipline.criado,
            turma: this.renderTurma(turma),
        };
    },
};
