export interface IUserSignupVM {
  firstName?: string | null;
  lastName?: string | null;
  email: string;
  password: string;
}

class UserSignupViewModel implements IUserSignupVM {
  public email: string;
  public firstName: string | null;
  public lastName: string | null;
  public password: string;

  constructor(user: IUserSignupVM) {
    this.email = user.email;
    this.firstName = user.firstName || null;
    this.lastName = user.lastName || null;
    this.password = user.password;
  }
}

export default UserSignupViewModel;
