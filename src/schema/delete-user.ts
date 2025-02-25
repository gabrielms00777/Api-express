import { z } from "zod";

export const deleteUserSchema = z.object({
    id: z.string({message: "O ID do usuário é obrigatório"}),
})