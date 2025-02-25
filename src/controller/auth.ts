import { RequestHandler } from "express";
import { createUser, findUserByEmail } from "../services/user";
import { compare, hash } from "bcrypt-ts";
import { createJWT } from "../utils/jwt";
import { signinSchema } from "../schema/signin";
import { signupSchema } from "../schema/signup";

export const signup: RequestHandler = async (req, res) => {
    const safeData = signupSchema.safeParse(req.body)
    if (!safeData.success) {
        res.json({ error: safeData.error.flatten().fieldErrors })
    }

    const hasEmail = await findUserByEmail(safeData.data!.email)
    if (hasEmail) {
        res.json({ error: "Email já cadastrado" })
    }

    const hashedPassword = await hash(safeData.data!.password, 10)

    const newUser = await createUser({
        name: safeData.data!.name,
        email: safeData.data!.email,
        password: hashedPassword
    })

    const token = createJWT(newUser.id)

    res.status(201).json({
        token,
        user: newUser
    })
}

export const signin: RequestHandler = async (req, res) => {
    const safeData = signinSchema.safeParse(req.body)
    if (!safeData.success) {
        res.json({ error: safeData.error.flatten().fieldErrors })
    }
    
    const user = await findUserByEmail(safeData.data!.email)
    // if(!user) return res.status(401).json({ error: "Acesso negado" })
    if (!user) res.status(401).json({ error: "Acesso negado" })
    console.log(user)

    const verifyPassword = await compare(safeData.data!.password, user!.password)
    // if(!verifyPassword) return res.status(401).json({ error: "Acesso negado" })
    if (!verifyPassword) res.status(401).json({ error: "Acesso negado" })

    const token = await createJWT(user!.id)

    res.json({ token, user })


} 