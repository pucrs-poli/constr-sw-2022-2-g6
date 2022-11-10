import { Types } from "mongoose";
import Discipline from "../disciplines_111/src/models/Discipline";

export async function getAll(attributes: object) {
  if (attributes) {
    return Discipline.find(attributes).populate("discipline");
  } else {
    return Discipline.find().populate("discipline");
  }
}

export async function getById(id: string) {
  return await Discipline.findById(id).populate("discipline");
}

export async function create(discipline: IDiscipline) {
  return await Discipline.create(discipline);
}

export async function addDiscipline(
  disciplineId: Types.ObjectId,
) {
  const discipline = await getById(disciplineId.toString());
  if (discipline) {
    discipline.push(disciplineId);
    await discipline.save();
  } else {
    throw new Error("discipline not found.");
  }
}

export async function updateById(id: string, discipline: IDiscipline) {
  return await Discipline.findByIdAndUpdate(id, discipline);
}

export async function deleteById(id: string) {
  return await Discipline.findByIdAndDelete(id);
}