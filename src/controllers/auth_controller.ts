import RestReponse, { IRestResponse } from "../utils/rest_response";
import RestErrors, { IRestError } from "../utils/rest_errors";
import JwtUtil from "../utils/jwt";
import User, { IUser } from "../models/user_model";
import UserSignupViewModel from "../view_models/user_signup_vm";
import { IResultAndError } from "../interfaces/result_and_error";
import PasswordEncoder from "../utils/password_encoder";

import { Request, Response } from 'express';
import AuthService from "../services/auth_service";
import UserViewModel from "../view_models/user_vm";
import AuthHelper from "../helpers/auth_helper";



class AuthController {

  // Route Disabled, signup not needed!
  public static async signup(req: Request, res: Response) {
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
        message: "User has signup successfully"
      });
      res.status(r.status);
      res.json(r);
    } catch (err) {
      const er = RestErrors.newinternalServerError("Something went wrong");
      res.status(er.status);
      res.json(er);
    }
  }

  public static async signin(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const signinRes = await AuthService.signin(email, password);
      if (signinRes.error) {
        res.status(signinRes.error.status);
        res.json(signinRes.error);
        return;
      }

      const userVM = new UserViewModel(signinRes.result);
      // generate jwt token

      // const token = JwtUtil.create(userVM);
      const token = JwtUtil.create({ user_id: signinRes.result.id });
      console.log("Token generated successfully ", token);
      res.setHeader("Authorization", "bearer " + token);
      res = AuthHelper.setToken(req, res, token);
      const r = RestReponse.newResponse({
        data: { response: userVM, token: "bearer " + token },
        message: "User has signin successfully"
      });
      res.status(r.status);
      res.json(r);
    } catch (err) {
      const er = RestErrors.newinternalServerError("Something went wrong");
      res.status(er.status);
      res.json(er);
    }
  }

  public static async signout(req: Request, res: Response) {
    try {
      res = AuthHelper.clearToken(res);
      const r = RestReponse.newResponse({
        message: "User has signout successfully"
      });
      res.status(r.status);
      res.json(r);
    } catch (err) {
      const er = RestErrors.newinternalServerError("Something went wrong");
      res.status(er.status);
      res.json(er);
    }
  }

  public static async getUser(req: Request | any, res: Response) {
    try {
      const userVM = new UserViewModel(req.user);
      const r = RestReponse.newResponse({
        data: userVM,
        message: "Signed in user"
      });
      res.status(r.status);
      res.json(r);
    } catch (err) {
      const er = RestErrors.newinternalServerError("Something went wrong");
      res.status(er.status);
      res.json(er);
    }
  }

  public static async validateAuthentication(req: Request | any, res: Response) {
    try {
      const userVM = new UserViewModel(req.user);
      const r = RestReponse.newResponse({
        data: userVM,
        message: "User validated"
      });
      res.status(r.status);
      res.json(r);
    } catch (err) {
      console.log('AuthController.checkUserSignin() error: ', err);
      const er = RestErrors.newinternalServerError("Something went wrong");
      res.status(er.status);
      res.json(er);
    }
  }

}

export default AuthController;
