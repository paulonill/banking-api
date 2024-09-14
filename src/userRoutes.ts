import { Router } from "express";
import { UserController } from "./controllers/UserController";
import { AuthController } from "./controllers/AuthController";

const userRoutes = Router();
const userController = new UserController();
const path = "/users";
const authController = new AuthController();

userRoutes.post(path, userController.create);

userRoutes.get(path, userController.getAll);

userRoutes.get(`${path}/:id`, userController.getById);

userRoutes.delete(`${path}/:id`, userController.verifyIfExists, userController.delete);

userRoutes.put(`${path}/:id`, userController.verifyIfExists, userController.update);

userRoutes.post("/auth", authController.authenticate);

export { userRoutes }