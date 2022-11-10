import mongoose from "mongoose";
import IDiscipline from "../interfaces/IDiscipline";


const disciplineSchema = new mongoose.Schema<IDiscipline>({
    id: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    credits: {
      type: Number,
      required: true,
    },
    syllabus: {
      type: String,
      required: true,
    },
    requisite: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Discipline'
    },
    semester: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Curriculum'
      },
  },
);

const Disciplines = mongoose.model<IDiscipline>("Discipline", disciplineSchema);

export default Disciplines;
