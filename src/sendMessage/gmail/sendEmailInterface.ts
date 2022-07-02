import { Request, Response } from 'express';

export default interface SendGmailInterface {

    sendMail(email: string, to: string, subject: string, content: string, res: Response): Promise<object>;
}
