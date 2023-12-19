import { Request, Response } from "express";
import { getUserByEmail, createUser } from "../../database/UserModel";
import { authentication, random } from "../../tools/authentication";

export const register = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) 
    return res.sendStatus(400);

    // check email does not exist
    const existingEmail = await getUserByEmail(email);
    if (existingEmail) 
    return res.sendStatus(400);

    let salt = random();
    
    // create a new user
    let user = await createUser({
        username,
        email,
        authentication: {
            salt,
            password: authentication(salt, password),
        },
    });

    return res.status(200).json(user).end();

  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};
