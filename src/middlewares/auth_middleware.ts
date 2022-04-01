import { Request, Response, NextFunction } from 'express';
import RestErrors from "../utils/rest_errors";
import JwtUtil from '../utils/jwt';
import User from '../models/user_model';
import AuthHelper from '../helpers/auth_helper';

export default class AuthMiddleware {


  public static async isAuthenticated(req: any, res: Response, next: NextFunction) {
    try {

      // if(req.headers.authorization === undefined) {
      //   const er = RestErrors.newNotAuthorizedError("Not authorized");
      //   res.status(er.status);
      //   res.json(er);
      // }
      // const token = req.headers.authorization.split(" ")[1];

      const token = AuthHelper.getToken(req);
      const tokenVerificationRes: any = await JwtUtil.verify(token);
      console.log("auth_middleware.isAuthentication() tokenVerificationRes ", tokenVerificationRes);
      const user = await User.findByPk(tokenVerificationRes.user_id);
      if (!user || !user.id) {
        const er = RestErrors.newNotAuthorizedError("Not authorized");
        res.status(er.status);
        res.json(er);
        return;
      }

      req.user = user;
      return next();

    } catch (err) {
      console.log("auth_middleware.isAuthentication() error: ", err);
      const er = RestErrors.newNotAuthorizedError("Not authorized");
      res.status(er.status);
      res.json(er);
      throw new Error("Not authorized");
    }
  }

}
