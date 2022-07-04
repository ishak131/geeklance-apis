import BasicOperation from '../Basic/BasicOperations';
import ChatModel from '../../MongoSchema/chat/chatModel';
import ChatInterface from './chatInterface';

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

}


const chat = new Chat(ChatModel);
export default chat;

