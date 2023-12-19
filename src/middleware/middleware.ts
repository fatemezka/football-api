import { Request, Response, NextFunction } from "express";
import { merge, get } from "lodash";

import { getUserBySessionToken } from "../model/User";

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
    return res.status(400).send(error).end();
  }
};

export const isOwner = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    let current_user_id = get(req, "current_user._id");

    if (!current_user_id) return res.sendStatus(403);
    
    if (id != current_user_id) return res.sendStatus(403);

    return next();
  } catch (error) {
    return res.status(400).send(error).end();
  }
};
