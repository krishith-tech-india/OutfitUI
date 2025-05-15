import { ColumnType } from "antd/es/table";

export interface RoleResponse {
  data: IRoles[];
}

export interface IRoles {
  id: number;
  name: string;
  description: string;
}

export interface EditableColumnType extends ColumnType<IRoles> {
  editable?: boolean;
}
