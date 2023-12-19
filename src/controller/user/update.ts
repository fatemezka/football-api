import { Request, Response } from "express";
import { getUserById } from "../../model/User";

export const update = async (req: Request, res: Response) => {
  try {
    const { username } = req.body;
    const id = req.params.id;

    if (!username) return res.sendStatus(400);

    let user = await getUserById(id);
    if (user) user.username = username;
    await user?.save();

    return res.status(200).json(user).end();
  } catch (error) {
    return res.status(400).send(error).end();
  }
};
