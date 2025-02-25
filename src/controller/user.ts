import { RequestHandler } from "express";
import { createUser, deleteUser, findUserByEmail, findUserById, getAllUsers, updateUser } from "../services/user";
import { ExtendedRequest } from "../types/extended-request";
import { addUserSchema } from "../schema/add-user";
import { deleteUserSchema } from "../schema/delete-user";

export const me = async (req: ExtendedRequest, res: Response) => {
    const user = await findUserById(req.userId)
    res.json({ user })
}

export const index: RequestHandler = async (req, res) => {
    const users = await getAllUsers()
    res.json({ users })
}

export const show: RequestHandler = async (req, res) => {

}

export const create: RequestHandler = async (req, res) => {
    const safeData = addUserSchema.safeParse(req.body)
    if (!safeData.success) {
        return res.json({ error: safeData.error.flatten().fieldErrors })
    }

    const hasUser = await findUserByEmail(safeData.data!.email)
    if (hasUser) {
        return res.json({ error: "Email já cadastrado" })
    }

    const newUser = await createUser({
        name: safeData.data!.name,
        email: safeData.data!.email,
        password: safeData.data!.password
    })

    res.json({ user: newUser })
}

export const update: RequestHandler = async (req, res) => {
    try {
        const { id } = req.params
        const safeData = deleteUserSchema.safeParse(req.body)
        if (!safeData.success) {
            return res.json({ error: safeData.error.flatten().fieldErrors })
        }
    
        const updatedUser = await updateUser(id, safeData.data)

        res.json({ user: updatedUser })
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}

export const remove: RequestHandler = async (req, res) => {
    const safeData = deleteUserSchema.safeParse(req.body)
    if (!safeData.success) {
        return res.json({ error: safeData.error.flatten().fieldErrors })
    }

    await deleteUser(safeData.data!.id)

    res.json({ message: 'Usuário deletado com sucesso' })
}

