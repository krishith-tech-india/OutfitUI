export default interface ILocalStorageColumns {
  orders: IOrder[];
  products: IProduct[];
  shippings: IShipping[];
  customers: IShipping[];
  payment: IShipping[];
  invoices: IInvoice[];
  reps: IShipping[];
  inventory: IShipping[];
}

export interface IInvoice {
  field: string;
  title: string;
  show: boolean;
  filter: string;
  filterable: boolean;
  sortable: boolean;
  width: number;
  format?: string;
  cell?: ICell;
}

export interface IShipping {
  field: string;
  title: string;
  show: boolean;
  filter: string;
  filterable: boolean;
  sortable: boolean;
  width: number;
}

export interface IProduct {
  field: string;
  title: string;
  show: boolean;
  filter: string;
  filterable: boolean;
  sortable: boolean;
  width: number;
  className?: string;
}
export interface IOrder {
  field: string;
  title: string;
  show: boolean;
  filterable: boolean;
  width: number;
  filter?: string;
  sortable?: boolean;
  format?: string;
  cell?: ICell;
}

export interface ICell {
  compare?: any;
  displayName: string;
}
