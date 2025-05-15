import { ColumnType } from "antd/es/table";

export interface OrderResponse {
  data: IOrderStatus[];
}

export interface IOrderStatus {
  id: number;
  name: string;
  description: string;
}

export interface EditableColumnTypeOrder extends ColumnType<IOrderStatus> {
  editable?: boolean;
}
