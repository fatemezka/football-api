import express from "express";

import { isAuthenticated, isOwner } from "../middleware/middleware";

import { getAll } from "../controller/user/getAll";
import { register } from "../controller/user/register";
import { login } from "../controller/user/login";
import { update } from "../controller/user/update";
import { deleteUser } from "../controller/user/delete";

export default (router: express.Router) => {
  router.get("/user/all", isAuthenticated, getAll);
  router.post("/user/register", register);
  router.post("/user/login", login);
  router.put("/user/:id", isAuthenticated, isOwner, update);
  router.delete("/user/:id", isAuthenticated, isOwner, deleteUser);
};
