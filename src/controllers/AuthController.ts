import { Request, Response } from "express";
import { prisma } from "../prisma";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

class AuthController {

    async authenticate(req: Request, res: Response) {
        try {
            const {email, password } = req.body;

            const user = await prisma.user.findUnique({
                where: {email}
            });

            if (!user) {
                return res.status(400).json({error: "User or password invalid."});
            }

            const isValuePassword = await compare(password, user.password);

            if(!isValuePassword) {
                return res.status(400).json({error: "User or password invalid."});
            }

            const token = sign({ id: user.id, email: user.email }, "secret", {expiresIn: "1m"});

            return res.status(200).json({ user: { id: user.id, email}, token });
        } catch (error) {
            console.error(error);
            return res.status(500).json(error);
        }
    }
}

export { AuthController }