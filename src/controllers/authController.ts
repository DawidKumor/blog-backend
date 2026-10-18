import { type Request, type Response } from 'express';
import User from "../models/Users.js";
import { registerSchema, type RegisterInput } from "../validators/authValidators.js";
import bcrypt from "bcrypt";
import {z} from "zod";

async function register(req: Request<{}, {}, RegisterInput>, res: Response): Promise<void> {
    try {
        const result = registerSchema.safeParse(req.body);

        if (!result.success) {
            const errors = z.flattenError(result.error);
            res.status(400).json({ message: "Błędne dane", errors: errors.fieldErrors });
            return;
        }
        const hashedPassword = await bcrypt.hash(result.data.password, 10);
        const user = await User.create({
            userName: result.data.userName,
            email: result.data.email,
            password: hashedPassword,
        });
        res.status(201).json({ id: user._id, userName: user.userName, email: user.email });


    } catch(err) {
        if (typeof err === "object" && err !== null && "code" in err && err.code === 11000) {
            res.status(409).json({ message: "Użytkownik już istnieje" });
            return;
        }
        const message = err instanceof Error ? err.message : "Unknown error";
        res.status(400).json({ message })
        console.error("Błąd rejestracji:", err);
        res.status(500).json({ message: "Błąd serwera" });

    }
}
export { register }
