import { Request, Response, NextFunction } from "express";
import { merge } from "lodash";

import { getUserBySessionToken } from "../database/UserModel";

export const isAuthenticated = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const session_token = req.cookies["FATEME-AUTH"];

    // user is not logged in
    if (!session_token) return res.sendStatus(403);

    const current_user = await getUserBySessionToken(session_token);
    if (!current_user) return res.sendStatus(403);

    merge(req, { current_user });

    return next();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};
