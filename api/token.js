import { TOKEN } from "../utils/constants";
import jwtDecode from "jwt-decode";

//guardar el token en el local storage, para mantener la sesion de usuario
export function setToken(token) {
  localStorage.setItem(TOKEN, token);
}
//llamada al token
export function getToken() {
  return localStorage.getItem(TOKEN);
}
//borrado del token
//eliminar el token para el logout
export function removeToken(){
  localStorage.removeItem(TOKEN);
}

//comprobar que el token ha expirado
export function hasExpiredToken(token) {
  const tokenDecode = jwtDecode(token);
  const expireDate = tokenDecode.exp * 1000;
  const currentDate = new Date().getTime();
  if(currentDate > expireDate){
    return true;
  }
  return false;
}