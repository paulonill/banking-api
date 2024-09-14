import { Router } from "express";
import { UserController } from "./controllers/UserController";

const userRoutes = Router();
const userController = new UserController();
const path = "/users";

userRoutes.post(path, userController.create);

userRoutes.get(path, userController.getAll);

userRoutes.get(`${path}/:id`, userController.getById);

userRoutes.delete(`${path}/:id`, userController.verifyIfExists, userController.delete);

userRoutes.put(`${path}/:id`, userController.verifyIfExists, userController.update);

export { userRoutes }