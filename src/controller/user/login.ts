import { Request, Response } from "express";
import { getUserByEmail } from "../../database/UserModel";
import { authentication, random } from "../../tools/authentication";

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) return res.sendStatus(400);

    // check if user does exist
    const user = await getUserByEmail(email).select(
      "+authentication.salt +authentication.password"
    );
    if (!user) return res.sendStatus(400);

    const expected_hash = authentication(
      user.authentication?.salt ?? "",
      password
    );
    if (expected_hash !== user.authentication?.password) res.sendStatus(403);

    // set session_token for current user
    let salt = random();
    if (user.authentication) {
      user.authentication.session_token = authentication(
        salt,
        user._id.toString()
      );
      await user.save();
    }

    // set cookie
    res.cookie("FATEME-AUTH", user.authentication?.session_token, {
      domain: "localhost",
      path: "/",
    });

    return res.status(200).json(user).end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};
