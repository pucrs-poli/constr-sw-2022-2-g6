import {Types} from "mongoose";

export default interface IDiscipline {
    id: string;
    name: string;
    credits: Number;
    syllabus: string;
    requisite: Types.ObjectId;  //( type: Schema.Types.ObjectID, ref: 'Discipline')
    semester: Types.ObjectId;   //(type: Schema.Types.ObjectID, ref: 'Discipline')
    discipline: Array<Types.ObjectId>;
}
