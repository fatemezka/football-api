import { Request, Response } from "express";
import { deleteUserById } from "../../database/UserModel";

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const deleted_user = await deleteUserById(id);

    return res.json(deleted_user).end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};