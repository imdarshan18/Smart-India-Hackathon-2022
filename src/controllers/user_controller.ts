import RestReponse, { IRestResponse } from "../utils/rest_response";
import RestErrors, { IRestError } from "../utils/rest_errors";

import User, { IUser } from "../models/user_model";
import UserSignupViewModel from "../view_models/user_signup_vm";
import { IResultAndError } from "../interfaces/result_and_error";


import { Request, Response } from 'express';
import AuthService from "../services/auth_service";
import UserViewModel from "../view_models/user_vm";



class UserController {
  public static async getAll(req: Request, res: Response) {
    
    try {
      const allUsers = await User.findAll();
      const r = RestReponse.newResponse({
        data: allUsers,
        message: "Users"
      })

      res.status(r.status);
      res.json(r);
    } catch (err) {
      console.log('UserController.getAll() error::', err);
      const er = RestErrors.newinternalServerError("Something went wrong.");
      res.status(er.status);
      res.json(er);
    }
  }

  public static async getOne(req: Request, res: Response) {
    try {
      const { id } = req.params;
      if (!id) {
        const er = RestErrors.newBadRequestError("User id not provided.");
        res.status(er.status);
        res.json(er);
        return;
      }
      const allUsers = await User.findAll();
      const r = RestReponse.newResponse({
        data: allUsers,
        message: "Users"
      })
      res.status(r.status);
      res.json(r);
    } catch (err) {
      console.log('UserController.getAll() error::', err);
      const er = RestErrors.newinternalServerError("Something went wrong.");
      res.status(er.status);
      res.json(er);
    }
  }

  public static async create(req: Request, res: Response) {
    try {
      // const { email, password } = res.body;
      const singupRes = await AuthService.signup(new UserSignupViewModel(req.body));
      if (singupRes.error) {
        res.status(singupRes.error.status);
        res.json(singupRes.error);
        return;
      }
      // crating a response object
      const userVM = new UserViewModel(singupRes.result);
      const r = RestReponse.newResponse({
        data: userVM,
        message: "User has created successfully"
      });
      res.status(r.status);
      res.json(r);
    } catch (err) {
      console.log('UserController.create() error::', err);
      const er = RestErrors.newinternalServerError("Something went wrong");
      res.status(er.status);
      res.json(er);
    }
  }
}

export default UserController;
