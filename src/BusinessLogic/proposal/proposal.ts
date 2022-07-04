import ProposalInterface from './proposalInterface';
import ProposalModel from '../../MongoSchema/proposal/proposalModel';
import BasicOperation from '../Basic/BasicOperations';
import { Request, Response, NextFunction } from 'express';
import { ObjectId } from 'mongoose';
import ProposalModelInterface from '../../MongoSchema/proposal/proposalModelInterface';
import project from '../../BusinessLogic/project/project';
import user from '../user/user';
import chat from '../chat/chat';

class Proposal extends BasicOperation implements ProposalInterface {
    constructor(Model: any) {
        super(Model);
        this.getAllProposals = this.getAllProposals.bind(this)
    }

    async createModel(req: Request, res: Response): Promise<object> {
        try {
            const newModel = new this.Model(req.body);
            user.addAppliedProject(req.body.user_id, req.body.project_id, newModel._id)
            const model = await newModel.save();
            project.addProposal(req.body.project_id, model._id)
            user.addProposal(req.body.user_id, model._id)
            return res.json({ model });
        } catch (error) {
            return res.sendStatus(400);
        }
    }

    async getAllProposals(_ids: Array<ObjectId>): Promise<Array<ProposalModelInterface>> {
        try {
            let proposals = this.Model.find({ _id: { $in: _ids } });
            return proposals;
        } catch (error) {
            return [];
        }
    }

    async acceptProposal(req: Request, res: Response): Promise<object> {
        try {
            let { freelancer_id, projectOwner_id, project } = req.body
            let newChat = await chat.createChat(project)
            await user.addChatsForAcceptedProjects(freelancer_id, newChat._id, project.title)
            await user.addChatsForAcceptedProposals(projectOwner_id, newChat._id, project.title)
            return res.send(200);
        } catch (error) {
            return res.send(400);
        }
    }

}
const proposal = new Proposal(ProposalModel);
export default proposal;