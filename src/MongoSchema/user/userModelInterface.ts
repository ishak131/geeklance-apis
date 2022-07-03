export default interface UserModelInterface {
    firstName: string,
    secondName: string,
    country: string,
    gender: string,
    birthDate: string,
    phoneNumber: string,
    email: string,
    password: string,
    avatar: string,
    synopsis: string,
    proposals: Array<string>,
    projects: Array<object>,
}