const mongoose = require("mongoose");
//mongoose.connect('mongodb://localhost:27017/web-app');
const Schema = mongoose.Schema;

const Curriculo = mongoose.Schema({
	_id: Schema.Types.ObjectId,
	nome_curso: String,
	semestre_inicio_vigencia: String,
	semestre_fim_vigencia: String,
    disciplinaCurriculo: { type: Schema.Types.ObjectId, ref: 'Disciplina' },
});

const Disciplina = new Schema({
	_id: Schema.Types.ObjectId,
	nome: String,
    creditos: Number,
    ementa: String,
    requisito: { type: Schema.Types.ObjectId, ref: 'Disciplina' },
    semestre: { type: Schema.Types.ObjectId, ref: 'Curriculo' },
});
 
module.exports = mongoose.model("CurriculoInstance", Curriculo);
module.exports = mongoose.model("DisciplinaInstance", Disciplina);