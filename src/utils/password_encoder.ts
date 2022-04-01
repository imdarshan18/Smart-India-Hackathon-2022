import bcrypt from 'bcrypt';


const SALT_ROUNDS = 10;

export default class PasswordEncoder {
  public static encode(str: string): Promise<string> {

    return new Promise((resolve, reject) => {
      bcrypt.hash(str, SALT_ROUNDS, function (err, hash) {
        // Store hash in your password DB.
        if (err) {
          reject(err);
        } else {
          resolve(hash);
        }

      });
    });

  }


  public static compare(str: string, hash: string): Promise<boolean> {

    return new Promise((resolve, reject) => {
      bcrypt.compare(str, hash, function (err, result) {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });

  }
}
