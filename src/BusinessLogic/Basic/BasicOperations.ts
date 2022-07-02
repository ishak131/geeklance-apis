import BasicOprtationsInterface from "./BasicOperationsInterface";
import { Request, Response } from "express";

export default class BasicOperation implements BasicOprtationsInterface {
  Model: any;
  constructor(Model: any) {
    this.Model = Model;
    this.createModel = this.createModel.bind(this);
    this.deleteModelsById = this.deleteModelsById.bind(this);
    this.getManyModels = this.getManyModels.bind(this);
    this.EditModel = this.EditModel.bind(this)
  }

  async createModel(req: Request, res: Response): Promise<object> {
    try {
      const newModel = new this.Model(req.body);
      const model = await newModel.save();
      return res.json({ model });
    } catch (error) {
      console.log(error);
      return res.sendStatus(400);
    }
  }

  async EditModel(req: Request, res: Response): Promise<object> {
    try {
      const modelEdits = req.body;
      const editdModel = await this.Model.findByIdAndUpdate(modelEdits._id, modelEdits, { new: true });
      return res.send({ editdModel });
    } catch (error) {
      return res.sendStatus(400);
    }
  }

  async deleteModelsById(req: Request, res: Response): Promise<object> {
    try {
      const { _ids } = req.params;
      const deleteModels = await this.Model.deleteMany({
        _id: { $in: _ids.split(",") },
      });
      return res.json({ deleteModels });
    } catch (error) {
      return res.sendStatus(400);
    }
  }

  async getOneModelById(req: Request, res: Response): Promise<object> {
    try {
      const { _id } = req.params;
      const getOneModel = await this.Model.findById(_id);
      if (!getOneModel) return res.sendStatus(404);
      return res.json({ getOneModel });
    } catch (error) {
      return res.sendStatus(400);
    }
  }
  
  async getManyModels(req: Request, res: Response): Promise<object> {
    try {
      const { limit } = req.params;
      const getLimitedModle = await this.Model.find().limit(parseInt(limit));
      if (getLimitedModle == null) return res.sendStatus(404);
      return res.json({ getLimitedModle });
    } catch (error) {
      return res.sendStatus(400);
    }
  }
}
