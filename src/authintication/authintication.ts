import jwt from 'jsonwebtoken'
import { NextFunction, Request, Response } from 'express'
import UserModel from '../MongoSchema/user/userModel'
import bcrypt from 'bcryptjs'
import * as fs from 'fs'
import user from '../BusinessLogic/user/user'

class Authintication {

    constructor() {
        this.getPrivateKey = this.getPrivateKey.bind(this)
        this.logIn = this.logIn.bind(this)
        this.createMyToken = this.createMyToken.bind(this)
        this.authinticate = this.authinticate.bind(this)
    }

    getPrivateKey(): string {
        return fs.readFileSync(`${__dirname}/../../privateKey.key`, 'utf8')
    }

    createMyToken(decodedToken: object): string {
        const token = jwt.sign(decodedToken, this.getPrivateKey());
        if (!token)
            throw new Error('internal server error');
        return token
    }

    async logIn(req: Request, res: Response): Promise<object> {
        const { email, password } = req.body
        const user = await UserModel.findOne({ email });
        console.log({ user });
        if (!user) {
            const error = new Error('invalid credentials')
            return res.status(400).send({ error });
        }
        const passwordIsCorrect = await bcrypt.compare(password, user.password);
        console.log({ passwordIsCorrect });
        if (!passwordIsCorrect) {
            const error = new Error('invalid credentials')
            return res.status(400).send({ error });
        }
        // await UserModel.updateOne({ _id: user._id }, { resetPassword: "" });
        const token = this.createMyToken({ _id: user._id, email: user.email, phoneNumber: user.phoneNumber })
        return res.send({ token, user })
    }

    async authinticate(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            const authorizationHeader = req.headers['authorization'];
            const token = authorizationHeader && authorizationHeader.split('=')[1]
            if (!token)
                return res.sendStatus(401)
            const privateKey = this.getPrivateKey()
            return jwt.verify(token, privateKey, async (error: any, decodedToken: any) => {
                if (error)
                    return res.status(401).send({ error });
                if (!decodedToken) {
                    return res.status(400).send({ error })
                }
                let userInfo = await UserModel.findById(decodedToken._id)
                req.body.decodedToken = decodedToken
                req.body.user = userInfo
                return next()
            })
        } catch (error) {
            res.status(400).send({ error })
        }
    }
}


const authintication = new Authintication()


export default authintication