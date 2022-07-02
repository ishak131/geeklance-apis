import UserInterface from './userInterface';
import UserModel from '../../MongoSchema/user/userModel';
import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import { ObjectId } from 'mongoose';
// import mangeToken from '../mangeToken/mangeToken';
import BasicOperation from '../Basic/BasicOperations';
// import SendEmail from '../../sendMessage/gmail/sendEmail';

class User extends BasicOperation implements UserInterface {

    constructor(Model: any) {
        super(Model);
        this.bcryptPassword = this.bcryptPassword.bind(this);
        this.checkEmailAndPhoneAvailabilty = this.checkEmailAndPhoneAvailabilty.bind(this);
        this.checkUserAbilityToEdit = this.checkUserAbilityToEdit.bind(this);
        this.deletePassword = this.deletePassword.bind(this);
        // this.resetChangePassword = this.resetChangePassword.bind(this);
    }



    async addProposal(user_id: any, proposal_id: any): Promise<void> {
        try {
            this.Model.updateOne({ _id: user_id }, { $push: { proposals: [proposal_id] } }, function (err: any, result: any) {
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

    async addProject(user_id: any, project_id: any): Promise<void> {
        try {
            this.Model.updateOne({ _id: user_id }, { $push: { projects: [project_id] } }, function (err: any, result: any) {
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

    async addAppliedProject(user_id: any, project_id: any, proposal_id: any,): Promise<any> {
        try {
            this.Model.updateOne({ _id: user_id }, { $push: { appliedProjects: [{ [project_id]: proposal_id }] } }, function (err: any, result: any) {
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

    async deletePassword(req: Request, res: Response, next: NextFunction): Promise<void> {
        if (req.body.password) {
            delete req.body.password
        }
        next();
    }

    async checkEmailAndPhoneAvailabilty(req: Request, res: Response, next: NextFunction): Promise<void> {
        const { _id, email } = req.body;
        const user = await this.Model.exists({ _id: { $ne: _id }, email });
        console.log(email);
        console.log(user);
        if (user) {
            console.log(email);
            res.sendStatus(406);
        }
        else
            next();
    }

    async checkUserAbilityToEdit(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { _id, decodedToken } = req.body;
            const user = await UserModel.findById({ _id: decodedToken._id });
            if (user && (_id === decodedToken._id)) {
                return next()
            }
            res.sendStatus(401)
        } catch (error) {
            res.sendStatus(400);
        }
    }

    async bcryptPassword(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { password } = req.body;
            if (password.length >= 8) {
                const hashPassword = await bcrypt.hashSync(password, 10);
                req.body.password = hashPassword;
                return next();
            }
            else
                res.sendStatus(406);
        } catch (error) {
            res.sendStatus(400);

        }
    }



}


const user = new User(UserModel);
export default user;

