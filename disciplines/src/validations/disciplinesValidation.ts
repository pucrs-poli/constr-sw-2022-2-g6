import Joi from "joi";

export default class DisciplinesValidations {
  public static GetById = Joi.string().hex().length(24).required();
  public static CreateOrUpdate = Joi.object({
    cod: Joi.string().required(),
    name: Joi.string().required(),
    credits: Joi.alternatives().try(Joi.string(), Joi.number()).required(),
    valid: Joi.string().required(),
    workload: Joi.alternatives().try(Joi.string(), Joi.number()).required(),
    goals: Joi.string().required(),
    syllabus: Joi.string().required()
  });
  public static SearchOrPatch = Joi.object({
    cod: Joi.string().required(),
    name: Joi.string().required(),
    credits: Joi.alternatives().try(Joi.string(), Joi.number()).required(),
    valid: Joi.string().required(),
    workload: Joi.alternatives().try(Joi.string(), Joi.number()).required(),
    goals: Joi.string().required(),
    syllabus: Joi.string().required(),
  });
}
