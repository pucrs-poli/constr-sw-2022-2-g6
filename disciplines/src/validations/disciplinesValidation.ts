import Joi from "joi";
import mongoose from "mongoose";

export default class DisciplinesValidations {
  public static GetById = Joi.string().hex().length(24).required();
  public static CreateOrUpdate = Joi.object({
    id: Joi.string().required(),
    cod: Joi.string().required(),
    name: Joi.string().required(),
    credits: Joi.alternatives().try(Joi.string(), Joi.number()).required(),
    valid: Joi.string().required(),
    workload: Joi.alternatives().try(Joi.string(), Joi.number()).required(),
    goals: Joi.string().required(),
    syllabus: Joi.string().required(),
    //requisite: Joi.string().required(),
    //semester: Joi.mongoose.Schema.Types.ObjectId
  });
  public static SearchOrPatch = Joi.object({
    id: Joi.string().required(),
    cod: Joi.string().required(),
    name: Joi.string().required(),
    credits: Joi.alternatives().try(Joi.string(), Joi.number()).required(),
    valid: Joi.string().required(),
    workload: Joi.alternatives().try(Joi.string(), Joi.number()).required(),
    goals: Joi.string().required(),
    syllabus: Joi.string().required(),
    //requisite: Joi.string().required(),
    //semester: Joi.mongoose.Schema.Types.ObjectId
  });
}
