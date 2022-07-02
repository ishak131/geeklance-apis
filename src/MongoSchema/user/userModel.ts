import { Schema, model } from 'mongoose'
import UserModelInterface from './userModelInterface'

const UserSchema = new Schema<UserModelInterface>({
    firstName: {
        type: String,
        required: true
    },
    secondName: {
        type: String,
        required: true
    },
    country: {
        type: String,
    },
    gender: {
        type: String,
    },
    birthDate: {
        type: String,
    },
    phoneNumber: {
        type: String,
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        default: ""
    },
    isProjectOwner: {
        type: Boolean,
        default: false
    },
    isFreeLancer: {
        type: Boolean,
        default: true
    },
    jobTitle: {
        type: String,
        default: ""
    },
    Synopsis: {
        type: String,
        default: ""
    },
    proposals: {
        type: [],
        of: String,
        ref: "Proposal"
    },
    projects: {
        type: [],
        of: String,
        ref: "Project"
    },
    appliedProjects: {
        type: [],
        of: String,
        ref: "Project"
    },
})

const UserModel = model<UserModelInterface>('User', UserSchema);
export default UserModel