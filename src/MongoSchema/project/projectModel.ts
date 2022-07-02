import { Schema, model } from 'mongoose'
import ProjectModelInterface from './projectModelInterface'

const ProjectSchema = new Schema<ProjectModelInterface>({
    projectDetails: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    proposals: {
        type: [],
        of: String,
        ref: "Proposal"
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

const ProjectModel = model<ProjectModelInterface>('Project', ProjectSchema);
export default ProjectModel