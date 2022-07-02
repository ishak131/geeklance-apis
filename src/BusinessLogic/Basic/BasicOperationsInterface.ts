import { Request, Response } from "express";

export default interface BasicOprtationsInterface {
    createModel(req: Request, res: Response): Promise<object>;
    getOneModelById(req: Request, res: Response): Promise<object>;
    getManyModels(req: Request, res: Response): Promise<object>;
    deleteModelsById(req: Request, res: Response): Promise<object>;
    EditModel(req: Request, res: Response): Promise<object>;
}
