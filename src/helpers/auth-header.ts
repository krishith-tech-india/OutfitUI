import Cookies from "universal-cookie";
import IVendor from "@src/interface/common/IVendor";
import { loggedInUser } from "./loggedInUser";

const cookies = new Cookies();

export const authHeader = {
  getToken,
  getXVendor,
};

function getToken() {
  const userTokenFromCookies: string = cookies.get("_swSessionUser_Id");
  if (userTokenFromCookies && userTokenFromCookies.length > 0) {
    return userTokenFromCookies;
  }
  return "";
}

function getXVendor() {
  const defaultVendor: IVendor = loggedInUser.getDefaultVendor();
  if (defaultVendor !== null) {
    return defaultVendor.code;
  }
  return "";
}
