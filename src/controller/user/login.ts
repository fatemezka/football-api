import { Request, Response } from "express";
import Bcrypt from "bcrypt";
import { getUserByEmail } from "../../model/User";
import { generateAccessToken } from "../../tool/jwt";

export const login = async (req: Request, res: Response) => {
  try {
    let { email, password } = req.body;

    if (!email || !password) {
      // will be removed by joi
      return res.sendStatus(400);
    }
    email = email.toLowerCase();

    // check user existence
    const user = await getUserByEmail(email).select("+authentication.password");
    if (!user) {
      return res.status(400).send("User does not exist.");
    }

    password = await Bcrypt.hash(password, process.env.BCRYPT_SALT ?? "");
    if (user.password !== password)
      res.status(403).send("Password is not correct.");

    // jwt access token
    const token = generateAccessToken(user._id.toString(), email);

    return res.status(200).json({ user, access_token: token }).end();
  } catch (error) {
    return res.status(400).send(error).end();
  }
};
