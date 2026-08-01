export interface IUser {
  id: string;
  name: string;
  email: string;
  role: "ADMIN" | "LANDLORD" | "TENANT";
  status: "ACTIVE" | "BANNED";
  createdAt: string;
  updatedAt: string;
}

export interface IUsersResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: IUser[];
}

export interface IUpdateUserResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: IUser;
}
