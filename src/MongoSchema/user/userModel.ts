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
        default: ""
    },
    gender: {
        type: String,
        default: ""
    },
    birthDate: {
        type: String,
        default: ""
    },
    phoneNumber: {
        type: String,
        default: ""
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
    synopsis: {
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
    chatsForAcceptedProposals: {
        type: [],
        of: String,
        ref: "Chat"
    },
    chatsForAcceptedProjects: {
        type: [],
        of: String,
        ref: "Chat"
    },

})

const UserModel = model<UserModelInterface>('User', UserSchema);
export default UserModel