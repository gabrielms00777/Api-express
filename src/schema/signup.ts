import { z } from "zod";

export const signupSchema = z.object({
    name: z.string({message: "O nome é obrigatório"}),
    email: z.string({message: "O email é obrigatório"}).email(),
    password: z.string({message: "A senha é obrigatória"}).min(4, {message: "A senha deve ter no mínimo 4 caracteres"})
})

export const signinSchema = z.object({
    email: z.string({message: "O email é obrigatório"}).email(),
    password: z.string({message: "A senha é obrigatória"}).min(4, {message: "A senha deve ter no mínimo 4 caracteres"})
})