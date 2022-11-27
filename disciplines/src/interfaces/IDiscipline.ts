import {Types} from "mongoose";

export default interface IDiscipline {
    id: Number;
    cod: string;
    name: string;
    credits: Number;
    valid: string;
    workload: Number;
    goals: string;
    syllabus: string;
    //requisite: Types.ObjectId;  //( type: Schema.Types.ObjectID, ref: 'Discipline')
    //semester: Types.ObjectId;   //(type: Schema.Types.ObjectID, ref: 'Discipline')
    //discipline: Array<Types.ObjectId>;
}
