import express, { Request, Response } from 'express';
import proposal from '../BusinessLogic/proposal/proposal';
const proposalRouter = express.Router();

proposalRouter.post('/create', async (req: Request, res: Response): Promise<object> => {
    try {
        return proposal.createModel(req, res);
    } catch (error) {
        return res.sendStatus(400);
    }
})

proposalRouter.get('/getOne/:_id', async (req: Request, res: Response): Promise<object> => {
    try {
        return proposal.getOneModelById(req, res)
    } catch (error) {
        return res.sendStatus(400);
    }
})

export { proposalRouter };
