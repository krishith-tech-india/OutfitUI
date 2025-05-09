import Cookies from "universal-cookie";

const cookies = new Cookies();

export const authHeader = {
  getToken,
};

function getToken() {
  const userTokenFromCookies: string = cookies.get("_swSessionUser_Id");
  if (userTokenFromCookies && userTokenFromCookies.length > 0) {
    return userTokenFromCookies;
  }
  return "";
}
