import { Schema, model } from 'mongoose'
import ProjectModelInterface from './projectModelInterface'

const ProjectSchema = new Schema<ProjectModelInterface>({
    projectDetails: {
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
})

const ProjectModel = model<ProjectModelInterface>('Project', ProjectSchema);
export default ProjectModel