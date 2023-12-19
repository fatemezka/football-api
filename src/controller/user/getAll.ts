import { Request, Response } from "express";
import { getUsers } from "../../model/User";

export const getAll = async (_: Request, res: Response) => {
  try {
    const users = await getUsers();

    return res.status(200).json(users).end();
  } catch (error) {
    return res.status(400).send(error).end();
  }
};
