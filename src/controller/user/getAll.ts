import { Request, Response } from "express";
import { getUsers } from "../../database/UserModel";

export const getAll = async (_: Request, res: Response) => {
  try {
    const users = await getUsers();

    return res.status(200).json(users).end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};
