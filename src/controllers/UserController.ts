import { Request, Response } from "express";
import { UserService } from "../services/UserService"

class UserController {

    private userService: UserService;

    constructor() {
        this.userService = new UserService();
    }

    create = async(req:Request, res: Response) => {
        try {
            const {name, email, password } = req.body
            const user = await this.userService.create(name, email, password);
            return res.status(201).json(user);
        } catch (error) {
            this.handleError(res, error, "Error creating user.");
        }
    }

    private handleError(res:Response, error:unknown, msg: string) {
        if (error instanceof Error) {
            console.error(`${msg}. ${error.message}`);
            return res.status(400).json({error: error.message});
        } else {
            console.error(`Unexpected error: ${error}`);
            return res.status(500).json({error: "An unexpected error occurred."});
        }
    }
}

export { UserController }