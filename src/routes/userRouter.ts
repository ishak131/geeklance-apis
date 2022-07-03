import express, { NextFunction, Request, Response } from 'express';
import user from '../BusinessLogic/user/user';
// import mangeToken from '../../BusinessLogic/mangeToken/mangeToken';
const userRouter = express.Router();
const userAuthorizedRouter = express.Router();
const userResetPasswordRouter = express.Router();

userRouter.post('/create', user.checkEmailAndPhoneAvailabilty, user.bcryptPassword, async (req: Request, res: Response): Promise<object> => {
    try {
        return user.createModel(req, res);
    } catch (error) {
        return res.sendStatus(400);
    }
})

userAuthorizedRouter.put('/edit', user.checkEmailAndPhoneAvailabilty, async (req: Request, res: Response, next: NextFunction): Promise<object> => {
    try {
        return user.EditModel(req, res);
    } catch (error) {
        return res.sendStatus(400);
    }
})



userAuthorizedRouter.delete('/delete/:_ids', async (req: Request, res: Response): Promise<object> => {
    try {
        return user.deleteModelsById(req, res);
    } catch (error) {
        return res.sendStatus(400);
    }
})

userRouter.get('/getOne/:_id', async (req: Request, res: Response): Promise<object> => {
    try {
        return user.getOneModelById(req, res)
    } catch (error) {
        return res.sendStatus(400);
    }
})

// userResetPasswordRouter.put('/resetPassword', async (req: Request, res: Response): Promise<object> => {
//     try {
//         return user.sendEmailReset(req, res);
//     } catch (error) {
//         return res.sendStatus(400);
//     }
// })

// userResetPasswordRouter.put('/changePassword/:Token', mangeToken.authinticate, user.bcryptPassword, async (req: Request, res: Response): Promise<object> => {
//     try {
//         return user.resetChangePassword(req, res);
//     } catch (error) {
//         return res.sendStatus(400);
//     }
// })

export { userRouter, userAuthorizedRouter };
