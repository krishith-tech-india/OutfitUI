import IVendor from "../common/IVendor";

export default interface ILocalStorageUser {
  name: string;
  username: string;
  token: string;
  defaultSite?: string;
  redirectToResetPassword: boolean;
  id: number;
  vendor: IVendor;
  profileImageUrl?: string;
}
