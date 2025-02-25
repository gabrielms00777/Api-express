import { Router } from "express";
import * as pingController from "../controller/ping";
import * as authController from "../controller/auth";
import * as userController from "../controller/user";
import { verifyJWT } from "../utils/jwt";

export const mainRouter = Router()

mainRouter.get('/ping', pingController.ping)
mainRouter.get('/privateping', verifyJWT, pingController.privatePing)

mainRouter.post('/auth/signup', authController.signup)
mainRouter.post('/auth/signin', authController.signin)

mainRouter.get('/user', verifyJWT, userController.me)
mainRouter.get('/users', verifyJWT, userController.index)
mainRouter.get('/users/:userId', verifyJWT, userController.show)
mainRouter.post('/users', verifyJWT, userController.create)
mainRouter.put('/users/:userId', verifyJWT, userController.update)
mainRouter.delete('/users', verifyJWT, userController.remove)


