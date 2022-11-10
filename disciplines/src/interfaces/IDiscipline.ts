import {Types} from "mongoose";

export default interface IDiscipline {
    id: string;
    name: string;
    credits: string;
    syllabus: string;
    requisite: Types.ObjectId;  //( type: Schema.Types.ObjectID, ref: 'Discipline')
    semester: Types.ObjectId;   //(type: Schema.Types.ObjectID, ref: 'Discipline')
}
