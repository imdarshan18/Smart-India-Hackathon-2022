import { Response, Request } from 'express';

const mins = process.env.TOKEN_COOKIE_EXPIRE ? parseInt(process.env.TOKEN_COOKIE_EXPIRE) : 15;

let JWT_EXPIRES_IN: any = (1000 * 60 * mins);
if (process.env.JWT_EXPIRES_IN) {
  parseInt(process.env.JWT_EXPIRES_IN);
}

class AuthHelper {
  public static setToken(req: Request, res: Response, token: string, options: any = {}): Response {
    if (req.cookies) {
      res.cookie('token', token, {
        maxAge: options.maxAge || JWT_EXPIRES_IN,
        httpOnly: true,
        signed: true
      })
    } else {
      // Setting header also
      // res.setHeader("Authorization", "bearer " + token);
    }
    // Setting header also
    res.setHeader("Authorization", "bearer " + token);
    return res;
  }

  public static getToken(req: Request): any {
    // if (req.signedCookies) {
    //   return req.signedCookies.token;
    // }
    const bearerHeader = req.headers["authorization"]
    if (bearerHeader) {
      const bearer = bearerHeader.split(" ");
      return bearer[1];
    }
    return null;
  }

  public static clearToken(res: Response): Response {
    res.cookie('token', '', {
      maxAge: 0,
      httpOnly: true,
      signed: true
    })
    res.setHeader("Authorization", "bearer " + '');
    return res;
  }
}

export default AuthHelper;
