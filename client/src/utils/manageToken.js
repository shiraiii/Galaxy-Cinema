import { jwtDecode } from "jwt-decode";

const manageToken = () => {
  const Token = localStorage.getItem("token");
  if (!Token) return () => {};

  const decodedToken = jwtDecode(Token);
  const currentTime = Date.now() / 1000;

  const expirationTime = decodedToken.exp;
  const timeUntilExpiration = (expirationTime - currentTime) * 1000;

  if (timeUntilExpiration <= 0) {
    localStorage.removeItem("token");
    sessionStorage.removeItem("userInfo");
    return () => {};
  } else {
    const timeOutId = setTimeout(() => {
      localStorage.removeItem("token");
      sessionStorage.removeItem("userInfo");
    }, timeUntilExpiration);
    return () => clearTimeout(timeOutId);
  }
};

export default manageToken;
