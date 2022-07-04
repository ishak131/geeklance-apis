import BasicOperation from '../Basic/BasicOperations';
import ChatModel from '../../MongoSchema/chat/chatModel';
import ChatInterface from './chatInterface';
import { Request, Response } from "express";
import UserModel from '../../MongoSchema/user/userModel';

class Chat extends BasicOperation implements ChatInterface {

    constructor(Model: any) {
        super(Model);
        this.addMessage = this.addMessage.bind(this);
        this.createChat = this.createChat.bind(this);
    }

    async createChat(project: object): Promise<any> {
        try {
            const newModel = new this.Model({ project });
            let model = await newModel.save();
            return model
        } catch (error) {
            console.log(error);
        }
    }

    async addMessage(message: any, chat_id: any): Promise<void> {
        try {
            await this.Model.updateOne({ _id: chat_id }, { $push: { chat: [message] } }, function (err: any, result: any): void {
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

    // async getManyChatsInOneUser(req: Request, res: Response): Promise<object> {
    //     try {
    //         const { _id } = req.params;
    //         let selectedUser = await UserModel.findById(_id)
    //         if (!selectedUser) {
    //             return res.sendStatus(404);
    //         }
    //         const chatsForAcceptedProjects = await this.Model.find({
    //             '_id': { $in: selectedUser.chatsForAcceptedProjects }
    //         });
    //         const chatsForAcceptedProposals = await this.Model.find({
    //             '_id': { $in: selectedUser.chatsForAcceptedProjects }
    //         });
    //         return res.json({ chatsForAcceptedProposals, chatsForAcceptedProjects });
    //     } catch (error) {
    //         return res.sendStatus(400);
    //     }
    // }

}


const chat = new Chat(ChatModel);
export default chat;

