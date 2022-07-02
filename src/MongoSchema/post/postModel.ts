import { Schema, model } from 'mongoose'
import PostModelInterface from './PostModelInterface'

const PostSchema = new Schema<PostModelInterface>({
    postName: {
        type: String,
        required: true
    },
    postDescription: {
        type: String,
        required: true
    },
    postingDate: {
        type: Number,
        default: Date.now()
    }
})

const PostModel = model<PostModelInterface>('Post', PostSchema);
export default PostModel