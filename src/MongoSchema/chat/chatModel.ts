import { Schema, model } from 'mongoose'
import ChatModelInterface from './chatModelInterface'

const ChatSchema = new Schema<ChatModelInterface>({
    project: {
        type: Object
    },
    chat: {
        type: [],
        of: Object
    },
    postingDate: {
        type: Number,
        default: Date.now()
    }
})

const ChatModel = model<ChatModelInterface>('Chat', ChatSchema);
export default ChatModel