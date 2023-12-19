import { Request, Response } from "express";
import { deleteUserById } from "../../model/User";

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const deleted_user = await deleteUserById(id);

    return res.json(deleted_user).end();
  } catch (error) {
    return res.status(400).send(error).end();
  }
};