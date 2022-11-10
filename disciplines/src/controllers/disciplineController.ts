import { Request, Response } from "express";
import { APIErrors, sendError } from "../errors/errors";
import * as disciplinesService from "../services/disciplinesService";
import DisciplinesValidations from "../validations/disciplinesValidation";

export async function getAll(req: Request, res: Response) {
  const validation = DisciplinesValidations.SearchOrPatch.validate(req.query);
  if (validation.error) {
    sendError(res, APIErrors.INPUT_VALIDATION_ERROR, validation.error.message);
    return;
  }
  try {
    const buildings = await disciplinesService.getAll(req.query);
    res.status(200).send(buildings);
  } catch (error) {
    console.error(error);
    sendError(res, APIErrors.INTERNAL_SERVER_ERROR);
  }
}

export async function getById(req: Request, res: Response) {
  const validation = DisciplinesValidations.GetById.validate(req.params.id);
  if (validation.error) {
    sendError(res, APIErrors.INPUT_VALIDATION_ERROR, validation.error.message);
    return;
  }
  try {
    const building = await disciplinesService.getById(req.params.id);
    if (building) {
      res.status(200).send(building);
    } else {
      sendError(res, APIErrors.NOT_FOUND);
    }
  } catch (error) {
    console.error(error);
    sendError(res, APIErrors.INTERNAL_SERVER_ERROR);
  }
}

export async function create(req: Request, res: Response) {
  const validation = DisciplinesValidations.CreateOrUpdate.validate(req.body);
  if (validation.error) {
    sendError(res, APIErrors.INPUT_VALIDATION_ERROR, validation.error.message);
    return;
  }
  try {
    const building = await disciplinesService.create(req.body);
    res.status(201).send(building);
  } catch (error) {
    console.error(error);
    sendError(res, APIErrors.INTERNAL_SERVER_ERROR);
  }
}

export async function updateById(req: Request, res: Response) {
  let validation = DisciplinesValidations.GetById.validate(req.params.id);
  if (validation.error) {
    sendError(res, APIErrors.INPUT_VALIDATION_ERROR, validation.error.message);
    return;
  }
  validation = DisciplinesValidations.CreateOrUpdate.validate(req.body);
  if (validation.error) {
    sendError(res, APIErrors.INPUT_VALIDATION_ERROR, validation.error.message);
    return;
  }
  try {
    const discipline = await disciplinesService.updateById(req.params.id, req.body);
    if (discipline) {
      res.status(200).send(discipline);
    } else {
      sendError(res, APIErrors.NOT_FOUND);
    }
  } catch (error) {
    console.error(error);
    sendError(res, APIErrors.INTERNAL_SERVER_ERROR);
  }
}

export async function patchById(req: Request, res: Response) {
  let validation = DisciplinesValidations.GetById.validate(req.params.id);
  if (validation.error) {
    sendError(res, APIErrors.INPUT_VALIDATION_ERROR, validation.error.message);
    return;
  }
  validation = DisciplinesValidations.SearchOrPatch.validate(req.body);
  if (validation.error) {
    sendError(res, APIErrors.INPUT_VALIDATION_ERROR, validation.error.message);
    return;
  }
  try {
    const discipline = await disciplinesService.updateById(req.params.id, req.body);
    if (discipline) {
      res.status(200).send(discipline);
    } else {
      sendError(res, APIErrors.NOT_FOUND);
    }
  } catch (error) {
    console.error(error);
    sendError(res, APIErrors.INTERNAL_SERVER_ERROR);
  }
}

export async function deleteById(req: Request, res: Response) {
  const validation = DisciplinesValidations.GetById.validate(req.params.id);
  if (validation.error) {
    sendError(res, APIErrors.INPUT_VALIDATION_ERROR, validation.error.message);
    return;
  }
  try {
    const discipline = await disciplinesService.deleteById(req.params.id);
    if (discipline) {
      res.status(200).send(discipline);
    } else {
      sendError(res, APIErrors.NOT_FOUND);
    }
  } catch (error) {
    console.error(error);
    sendError(res, APIErrors.INTERNAL_SERVER_ERROR);
  }
}
