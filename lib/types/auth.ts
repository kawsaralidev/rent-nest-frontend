export type IUserRole = "TENANT" | "LANDLORD" | "ADMIN";

export type IUserStatus = "ACTIVE" | "INACTIVE";

export interface IUser {
  id: string;
  name: string;
  email: string;
  role: IUserRole;
  status: IUserStatus;
  createdAt: string;
  updatedAt: string;
}

export interface ILoginPayload {
  email: string;
  password: string;
}

export interface IRegisterPayload {
  name: string;
  email: string;
  password: string;
  role: "TENANT" | "LANDLORD";
}

export interface ILoginResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    accessToken: string;
    user: IUser;
  };
}

export interface IRegisterResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    user: IUser;
  };
}
