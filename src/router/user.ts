import express from "express";

import { isAuthenticated, isOwner } from "../middleware/middleware";

import { getAll } from "../controller/user/getAll";
import { register } from "../controller/user/register";
import { login } from "../controller/user/login";
import { deleteUser } from "../controller/user/delete";

export default (router: express.Router) => {
  router.get("/user/all", isAuthenticated, getAll);
  router.post("/user/register", isAuthenticated, register);
  router.post("/user/login", isAuthenticated, login);
  router.delete("/user/:id", isAuthenticated, isOwner, deleteUser);
};
