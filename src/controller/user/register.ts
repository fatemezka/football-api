import { Request, Response } from "express";
import Bcrypt from "bcrypt";
import { getUserByEmail, createUser } from "../../model/User";

export const register = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;

    // will be removed by joi
    if (!username || !email || !password) {
      return res.sendStatus(400);
    }

    // check email does not exist
    const existing_email = await getUserByEmail(email);
    if (existing_email) {
      return res.status(400).send("This email does exist.");
    }

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
    return res.status(400).send(error).end();
  }
};
