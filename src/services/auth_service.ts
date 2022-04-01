import RestReponse from "../utils/rest_response";
import RestErrors from "../utils/rest_errors";
import JwtUtil from "../utils/jwt";
import User, { IUser } from "../models/user_model";
import { IUserSignupVM } from "../view_models/user_signup_vm";
import { IResultAndError } from "../interfaces/result_and_error";
import PasswordEncoder from "../utils/password_encoder";


class AuthService {
  public static async signup(user: IUserSignupVM): Promise<IResultAndError> {
    try {
      // validating user
      if (!user || !user.email || !user.password) {
        const er = RestErrors.newBadRequestError("Email or password not valid");
        return { result: null, error: er };
      }

      // Uniq user check
      const isExist = await User.findOne({ where: { email: user.email } });
      if (isExist && isExist.get("id")) {
        return {
          result: null,
          error: RestErrors.newBadRequestError(
            "User already exist by email " + user.email
          ),
        };
      }

      // email id is not registered yet
      // process signup
      // encoding password
      const password = await PasswordEncoder.encode(user.password);
      const createRes = await User.create({ ...user, password });
      if (!createRes || !createRes.get("id")) {
        return {
          result: null,
          error: RestErrors.newinternalServerError("Something went wrong"),
        };
      }

      return { result: createRes, error: null };

      return { result: null, error: null };
    } catch (err) {
      console.error("AuthService.signup() error: ", err);
      const er = RestErrors.newinternalServerError("Something went wrong");
      return { result: null, error: er };
    }
  }

  public static async signin(
    email: string,
    password: string
  ): Promise<IResultAndError> {
    try {
      console.log("==> 1");
      // validating email and password
      if (!email || !password) {
        return {
          result: null,
          error: RestErrors.newBadRequestError("Invalid credentials"),
        };
      }
      console.log("==> 2");
      // finding user in db by email id
      const user = await User.findOne({ where: { email: email } });
      console.log("==> 2.2");
      if (!user || !user.get("id")) {
        console.log("==> 2.3");
        return {
          result: null,
          error: RestErrors.newBadRequestError("Invalid credentials"),
        };
      }
      console.log("==> 3");
      // comparing password
      const hash: any = user.get("password");
      const isPasswordMatched = await PasswordEncoder.compare(password, hash);

      console.log("==> 3.1 ", isPasswordMatched);
      if (isPasswordMatched === true) {
        return {
          result: user,
          error: null,
        };
      }
      console.log("==> 4");
      const er = RestErrors.newNotAuthorizedError("Credentials dosen't match");
      return { result: null, error: er };
    } catch (err) {
      console.error("AuthService.signin() error: ", err);
      const er = RestErrors.newinternalServerError("Something went wrong");
      return { result: null, error: er };
    }
  }


}

export default AuthService;
