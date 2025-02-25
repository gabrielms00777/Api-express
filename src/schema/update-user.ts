import { z } from "zod";


export const updateUserSchema = z.object({
    name: z.string({ message: "O nome é obrigatório" }).optional(),
    email: z.string({ message: "O email é obrigatório" }).email().optional(),
    password: z.string({ message: "A senha deve ter no mínimo 4 caracteres" }).min(4).optional(),
});
