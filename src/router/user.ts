import express from "express";
import {register} from "../controller/user/register";
import {login} from "../controller/user/login";

export default (router: express.Router) => {
    router.post("/user/register", register);
    router.post("/user/login", login);
};