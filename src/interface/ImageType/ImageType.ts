import { ColumnType } from "antd/es/table";

export interface ImageTypeResponse {
  data: IImageType[];
}

export interface IImageType {
  id: number;
  name: string;
  description: string;
}

export interface EditableColumnType extends ColumnType<IImageType> {
  editable?: boolean;
}
