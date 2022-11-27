import { number } from "joi";
import mongoose from "mongoose";
import IDiscipline from "../interfaces/IDiscipline";


const disciplineSchema = new mongoose.Schema<IDiscipline>({
    id: {type: mongoose.Schema.Types.Number, required: true}, //codigo da disciplina
    cod: {type: String, required: true},
    name: {type: String, required: true},
    credits: {type: Number, required: true}, //creditos 
    valid: {type: String, required: true}, //semestre validade 
    workload: {type: Number, require: true}, //carga horária 
    goals: {type: String, require: true}, //objetivos da disciplins
    syllabus: {type: String,required: true}, //ementa da disciplina
    //requisite: {type: mongoose.Schema.Types.ObjectId, ref: 'Discipline'},
    //semester: {type: mongoose.Schema.Types.ObjectId, ref: 'Curriculum'}, //validade
  },
);

const Discipline = mongoose.model<IDiscipline>("Discipline", disciplineSchema);

export default Discipline;
