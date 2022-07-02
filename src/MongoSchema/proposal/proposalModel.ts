import { Schema, model } from 'mongoose'
import ProposalModelInterface from './proposalModelInterface'

const ProposalSchema = new Schema<ProposalModelInterface>({
    user_id: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    secondName: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        required: true
    },
    jobTitle: {
        type: String,
        default: ""
    },
    proposalDetails: {
        type: String,
        required: true
    },
    executionTime: {
        type: Number,
        required: true
    },
    budget: {
        type: Number,
        required: true
    },
    date: {
        type: Number,
        default: Date.now()
    },
})

const ProposalModel = model<ProposalModelInterface>('Proposal', ProposalSchema);
export default ProposalModel