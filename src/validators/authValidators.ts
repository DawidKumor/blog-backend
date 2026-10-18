import {z} from "zod";

const registerSchema = z.object({
    userName: z.string().min(3).max(20).regex(/^\w+$/),
    email: z.string().trim().toLowerCase().pipe(z.email()),
    password: z.string().min(8).max(72)
});

type RegisterInput = z.infer<typeof registerSchema>;

export { registerSchema, type RegisterInput };