import express from "express";
import {register} from "../controller/user/register";

export default (router: express.Router) => {
    router.post("/user/register", register);
};