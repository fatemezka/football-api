import { Request, Response } from "express";
import Bcrypt, { hash } from "bcrypt";
import { getUserByEmail, createUser } from "../../database/UserModel";

export const register = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) return res.sendStatus(400);

    // check email does not exist
    const existingEmail = await getUserByEmail(email);
    if (existingEmail) return res.sendStatus(400);

    const hashed_password = await Bcrypt.hash(
      password,
      process.env.BCRYPT_SALT ?? ""
    );

    // create a new user
    let user = await createUser({
      username,
      email,
      hashed_password,
    });
    return res.status(200).json(user).end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};
