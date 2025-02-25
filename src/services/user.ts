import { Prisma } from "@prisma/client"
import { db } from "../utils/prisma"

export const findUserByEmail = async (email: string) => {
    return await db.user.findFirst({
        where: { email }
    }) || null
}

export const findUserById = async (id: string) => {
    return await db.user.findFirst({
        where: { id }
    }) || null
}

export const createUser = async (data: Prisma.UserCreateInput) => {
    return await db.user.create({ data })
}

export const getAllUsers = async () => {
    return await db.user.findMany()
}

export const updateUser = async (id: string, data: Prisma.UserUpdateInput) => {
    const user = await findUserById(id)
    if (!user) {
        throw new Error("Usuário não encontrado")
    }


    return db.user.update({ where: { id }, data })
}

export const deleteUser = async (id: string) => {
    return db.user.delete({ where: { id } })
}