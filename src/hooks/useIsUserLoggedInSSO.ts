import { config } from "@src/config";
import { authHeader } from "@src/helpers/auth-header";

const useIsUserLoggedInSSO = (): { token: string | null; isLoggedIn: boolean } => {
  const userToken = authHeader.getToken();
  if (userToken && userToken.length > 0) {
    return { token: userToken, isLoggedIn: true };
  } else {
    window.location.href = config.ssoUrl;
  }
  return { token: null, isLoggedIn: false };
};

export default useIsUserLoggedInSSO;
