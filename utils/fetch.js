import { getToken, hasExpiredToken } from "../api/token";

//fetch para hacer petiones protegidas al servidor
export async function authFetch(url, params, logout) {
  const token = getToken();

  if (!token) {
    //usuario no logeado
    logout();
  } else {
    if (hasExpiredToken(token)) {
      //token expirado
      logout();
    } else {
      //peticion http
      const paramsTemp = {
        ...params,
        headers: {
          ...params?.headers,
          Authorization: `Bearer ${token}`
        }
      };
      try {
        const response = await fetch(url, paramsTemp);
        const result = await response.json();
        return result;
      } catch (error) {
        return error;
      }
    }
  }
}
