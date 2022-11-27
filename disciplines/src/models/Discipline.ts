import { number } from "joi";
import mongoose from "mongoose";
import IDiscipline from "../interfaces/IDiscipline";


const disciplineSchema = new mongoose.Schema<IDiscipline>({
    id: {type: number, required: true}, //codigo da disciplina
    cod: {type: String, required: true},
    name: {type: String, required: true},
    credits: {type: Number, required: true},
    valid: {type: String, required: true},
    workload: {type: number, require: true},
    goals: {type: String, require: true},
    syllabus: {type: String,required: true}, //ementa da disciplina
    //requisite: {type: mongoose.Schema.Types.ObjectId, ref: 'Discipline'},
    //semester: {type: mongoose.Schema.Types.ObjectId, ref: 'Curriculum'}, //validade
  },
);

const Discipline = mongoose.model<IDiscipline>("Discipline", disciplineSchema);

export default Discipline;
