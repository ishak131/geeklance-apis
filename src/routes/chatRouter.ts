import express, { NextFunction, Request, Response } from 'express';
import chat from '../BusinessLogic/chat/chat';
const chatRouter = express.Router();

chatRouter.post('/create', async (req: Request, res: Response): Promise<object> => {
    try {
        return chat.createModel(req, res);
    } catch (error) {
        return res.sendStatus(400);
    }
})

chatRouter.put('/edit', async (req: Request, res: Response, next: NextFunction): Promise<object> => {
    try {
        return chat.EditModel(req, res);
    } catch (error) {
        return res.sendStatus(400);
    }
})



chatRouter.delete('/delete/:_ids', async (req: Request, res: Response): Promise<object> => {
    try {
        return chat.deleteModelsById(req, res);
    } catch (error) {
        return res.sendStatus(400);
    }
})

chatRouter.get('/getOne/:_id', async (req: Request, res: Response): Promise<object> => {
    try {
        return chat.getOneModelById(req, res)
    } catch (error) {
        return res.sendStatus(400);
    }
})

// chatResetPasswordRouter.put('/resetPassword', async (req: Request, res: Response): Promise<object> => {
//     try {
//         return chat.sendEmailReset(req, res);
//     } catch (error) {
//         return res.sendStatus(400);
//     }
// })

// chatResetPasswordRouter.put('/changePassword/:Token', mangeToken.authinticate, chat.bcryptPassword, async (req: Request, res: Response): Promise<object> => {
//     try {
//         return chat.resetChangePassword(req, res);
//     } catch (error) {
//         return res.sendStatus(400);
//     }
// })

export { chatRouter };
