import jwt from 'jsonwebtoken';
import fs from 'fs';

export default class JwtUtil {
  public static create(payload: any = {}) {
    const env: any = process.env;
    // let privateKey = fs.readFileSync(env.JWT_PEM_PATH, 'utf8');
    let privateKey = process.env.JWT_SECRET || 'test';
    const exp = process.env.JWT_EXPIRES_IN || "1h";
    let token = jwt.sign(payload, privateKey, { algorithm: 'HS256', expiresIn: exp });
    return token;
  }

  public static verify(token: string) {

    const env: any = process.env;
    return new Promise((resolve, reject) => {
      // const privateKey = fs.readFileSync(env.JWT_PEM_PATH, 'utf8');
      const privateKey = process.env.JWT_SECRET || 'test';

      const verifyOptions: any = { algorithm: "HS256" };
      jwt.verify(token, privateKey, verifyOptions, (err, user) => {
        if (err) {
          reject(err);
        } else {
          resolve(user);
        }
      });
    });

  }
}
