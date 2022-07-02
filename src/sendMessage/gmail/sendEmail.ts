import { Request, Response } from 'express';
import * as nodemailer from 'nodemailer';
import SendEmailInterface from './sendEmailInterface';

export default class SendEmail implements SendEmailInterface {
    private _transporter: nodemailer.Transporter;
    constructor(email: string, password: string) {
        this._transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: email,
                pass: password
            }
        });
    }

    async sendResetPasswordMail(to: string, Token: string, res: Response): Promise<object> {
        let options = {
            from: "an.roooof@gmail.com",
            to: to,
            subject: "OrientedCoders - Password recovery",
            text: `To Change Password click :http://localhost:3000/change-password/${Token}`
        }
        await this._transporter.sendMail(options, (error) => {
            if (error)
                return res.sendStatus(400);
        })
        return res.sendStatus(200);
    }
    
    async sendMail(email: string, to: string, subject: string, content: string, res: Response): Promise<object> {
        let options = {
            from: email,
            to: to,
            subject: subject,
            text: content
        }
        await this._transporter.sendMail(options, (error) => {
            if (error)
                return res.sendStatus(400);
        })
        return res.sendStatus(200);
    }
}
