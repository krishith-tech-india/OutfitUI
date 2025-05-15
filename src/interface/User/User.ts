import { ColumnType } from "antd/es/table";

export interface UserResponse {
  data: IUser[];
}

export interface IUser {
  id: number;
  roleId: number;
  email: string;
  phNo: string;
  name: string;
}

export interface EditableColumnTypeUser extends ColumnType<IUser> {
  editable?: boolean;
}
