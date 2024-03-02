export interface IRegisterInput {
  userFirstName: string;
  userLastName: string;
  userEmail: string;
  userPassword: string;
  userConfirmPassword: string;
  userRoles: {
    admin: number,
    editor: number,
    user: number
  }
}
export interface ILoginInput {
  userEmail: string;
  userPassword: string;
}
