import { NextFunction, Request, Response } from "express";
import BasicOprtationsInterface from "../Basic/BasicOperationsInterface";

export default interface UserInterface extends BasicOprtationsInterface {
    bcryptPassword(req: Request, res: Response, next: NextFunction): Promise<void>;
    checkUserAbilityToEdit(req: Request, res: Response, next: NextFunction): Promise<void>;
    // resetChangePassword(req: Request, res: Response): Promise<object>;
    // sendEmailReset(req: Request, res: Response): Promise<object>;
    checkEmailAndPhoneAvailabilty(req: Request, res: Response, next: NextFunction): Promise<void>;
}
