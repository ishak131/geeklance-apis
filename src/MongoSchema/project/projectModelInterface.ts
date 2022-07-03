export default interface ProjectModelInterface {
    projectDetails: string,
    title: string,
    category: string,
    proposals: Array<string>,
    acceptedProposal: Array<string>,
    executionTime: number,
    budget: number,
    date: number
}