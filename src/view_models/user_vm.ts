export interface IUserVM {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  createdAt: Date;
  updatedAt: Date;
}


class UserViewModel {
  public id: string;
  public email: string;
  public firstName: string;
  public lastName: string;
  public createdAt: Date;
  public updatedAt: Date;


  constructor(user: IUserVM) {
    this.id = user.id;
    this.email = user.email;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.createdAt = user.createdAt;
    this.updatedAt = user.updatedAt;
  }

}

export default UserViewModel;
