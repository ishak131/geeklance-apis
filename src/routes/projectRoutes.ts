import express, { NextFunction, Request, Response } from 'express';
import project from '../BusinessLogic/project/project';
const projectRouter = express.Router();

projectRouter.post('/create', async (req: Request, res: Response): Promise<object> => {
    try {
        return project.createModel(req, res);
    } catch (error) {
        return res.sendStatus(400);
    }
})

projectRouter.put('/edit', async (req: Request, res: Response, next: NextFunction): Promise<object> => {
    try {
        return project.EditModel(req, res);
    } catch (error) {
        return res.sendStatus(400);
    }
})



projectRouter.delete('/delete/:_ids', async (req: Request, res: Response): Promise<object> => {
    try {
        return project.deleteModelsById(req, res);
    } catch (error) {
        return res.sendStatus(400);
    }
})

projectRouter.get('/getOne/:_id', async (req: Request, res: Response): Promise<object> => {
    try {
        return project.getOneModelById(req, res)
    } catch (error) {
        return res.sendStatus(400);
    }
})

projectRouter.get('/getAll/:_id', async (req: Request, res: Response): Promise<object> => {
    try {
        return project.getOneModelById(req, res)
    } catch (error) {
        return res.sendStatus(400);
    }
})



export { projectRouter };
