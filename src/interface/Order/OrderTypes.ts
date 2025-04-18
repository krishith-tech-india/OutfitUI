export interface IOrderDetailProps {
  id: number;
  orderNo: string;
  vendor?: any;
  orderClass?: any;
  brand?: any;
  location?: any;
  orderDate: string;
  shipDate: string;
  cancelDate: string;
  receiptDate: string;
  incomingEndpoint: string;
  incomingFile?: any;
  customFieldsArray: any[];
  lineItems: ILineItem[];
  payments: any[];
  edi: IEdi;
  customerID?: any;
  customer: string;
  billingAddress: IBillingAddress;
  shippingAddress: IBillingAddress;
  shipMethod?: any;
  po: string;
  orderType?: any;
  subTotal: string;
  discount: string;
  discountCode?: any;
  discountType: string;
  total: string;
  freight: string;
  promo?: any;
  status?: any;
  tax: string;
  taxCode?: any;
  source: string;
  paymentMethod?: any;
  terms: string;
  ccType?: any;
  ccNumber: string;
  ccToken?: any;
  ccExp?: any;
  ccCvv?: any;
  ccName?: any;
  ccAuthId?: any;
  comments: string;
  agency?: any;
  repName?: any;
  shipService: string;
  giftMessage?: any;
  shippingLabel?: any;
  packingSlip?: any;
  whsAcctgId?: any;
  vendorNo?: any;
}

export interface IBillingAddress {
  id?: any;
  code?: any;
  name: string;
  company: string;
  address1: string;
  address2: string;
  fullAddress: string;
  city: string;
  state: string;
  firstName?: any;
  lastName?: any;
  zip: string;
  country: string;
  phone?: any;
  fax?: any;
  email?: any;
  contact?: any;
}

export interface IEdi {
  distributionCenter?: any;
  san: string;
  department: string;
  door?: any;
}

export interface ILineItem {
  lineNumber: number;
  lineKey: string;
  sku: string;
  description: string;
  price: string;
  quantity: string;
  upc: string;
  quantityShipped?: any;
  quantitySent?: any;
  retItem?: any;
  sizeOrColor?: any;
  color?: any;
}

export interface IOrderGridProps {
  id: number;
  orderNo: string;
  orderType: string;
  source: string;
  po: string;
  orderDate: string;
  customer: string;
  new: string;
  country: string;
  shipDate: string;
  amount: string;
  status: string;
  chain: any;
  terms: string;
  agency: string;
  rep: string;
  notes: string;
  acctgId: any;
  incomingDate: string;
  selected: boolean;
}
