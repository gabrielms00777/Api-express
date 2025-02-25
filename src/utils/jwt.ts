import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { findUserByEmail, findUserById } from '../services/user'
import { ExtendedRequest } from '../types/extended-request'

export const createJWT = (id: string) => {
    return jwt.sign({ id }, process.env.JWT_SECRET as string, {
        expiresIn: '1d'
    })
}

export const verifyJWT = (req: ExtendedRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization as string
    if (!authHeader) return res.status(401).json({ error: "Acesso negado" })

    const token = authHeader.split(' ')[1]

    jwt.verify(
        token,
        process.env.JWT_SECRET as string,
        async (err, decoded: any) => {
            if (err) return res.status(403).json({ error: "Acesso negado" })

            const user = await findUserById(decoded.id)
            if (!user) return res.status(403).json({ error: "Acesso negado" })
            req.userId = user.id

            next()
        })
}