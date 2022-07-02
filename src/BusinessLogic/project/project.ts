import ProjectInterface from './projectInterface';
import ProjectModel from '../../MongoSchema/project/projectModel';
import BasicOperation from '../Basic/BasicOperations';
import { Request, Response } from "express";
import proposal from '../proposal/proposal';
import user from '../user/user';
import UserModel from '../../MongoSchema/user/userModel';

class Project extends BasicOperation implements ProjectInterface {
    constructor(Model: any) {
        super(Model);
    }

    async getOneModelById(req: Request, res: Response): Promise<object> {
        try {
            const { _id } = req.params;
            const getOneModel = await this.Model.findById(_id);
            if (!getOneModel) return res.sendStatus(404);
            let proposals = await proposal.getAllProposals(getOneModel.proposals)
            getOneModel.proposals = proposals
            return res.json({ getOneModel });
        } catch (error) {
            return res.sendStatus(400);
        }
    }


    async createModel(req: Request, res: Response): Promise<object> {
        try {
            const newModel = new this.Model(req.body);
            const model = await newModel.save();
            user.addProject(req.body.user_id, model._id)
            return res.json({ model });
        } catch (error) {
            return res.sendStatus(400);
        }
    }

    async addProposal(project_id: any, proposal_id: any): Promise<void> {
        try {
            this.Model.updateOne({ _id: project_id }, { $push: { proposals: [proposal_id] } }, function (err: any, result: any) {
                if (err) {
                    console.log(err);
                } else {
                    console.log("result");
                }
            });
        } catch (error) {
            console.log(error);
        }
    }

    async getManyModelsInOneUser(req: Request, res: Response): Promise<object> {
        try {
            const { _id } = req.params;
            let selectedUser = await UserModel.findById(_id)
            if (!selectedUser) {
                return res.sendStatus(404);
            }
            const getModle = await this.Model.find({
                '_id': { $in: selectedUser.projects }
            });
            if (getModle == null) return res.sendStatus(404);
            return res.json({ getModle });
        } catch (error) {
            return res.sendStatus(400);
        }
    }

}

const project = new Project(ProjectModel);
export default project;

