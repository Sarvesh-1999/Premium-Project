import express from "express";
import {getAllUsers,createUser,editUser,removeUser} from "../controllers/user.controller.js"

const userRoutes = express.Router();

userRoutes.get("/get-all-users",getAllUsers);
userRoutes.post("/create-user",createUser);
userRoutes.patch("/edit-user/:id",editUser);
userRoutes.delete("/remove-user/:id",removeUser);

export default userRoutes;