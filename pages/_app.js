//hook useMemo - memoriza los datos de sesion de usuario - del Auth Context
import React, { useMemo, useState, useEffect } from "react";
// importancion de estilos globales de la app de scss/global.scss
// npm i sass
import "../scss/global.scss";
// para componentes de react para generar estilos
// npm install semantic-ui-react semantic-ui-css
import "semantic-ui-css/semantic.min.css";
// react-toastify
import { ToastContainer } from "react-toastify";
//css de react toastify
import "react-toastify/dist/ReactToastify.css";
//npm i jwt-decode
import jwtDecode from "jwt-decode";
//create context de context/AuthContext - hook: useAuth
import AuthContext from "../context/AuthContext";
//funciones para mantener guardada lasesion del usuario en el local storage
import { setToken, getToken, removeToken } from "../api/token";
//hook router next
import { useRouter } from "next/router";

export default function MyApp({ Component, pageProps }) {
  //jwt-decode de la funcion login
  const [auth, setAuth] = useState(undefined);
  //console.log(auth);
  //controla la ejecución del useEffect del token
  const [reloadUser, setReloadUser] = useState(false);
  //router next
  const router = useRouter();
  // devuelve el token del usuario logeado
  useEffect(() => {
    const token = getToken();
    //console.log(token);
    if (token) {
      setAuth({
        token,
        idUser: jwtDecode(token).id
      });
    } else {
      setAuth(null);
    }
    // fuerza que se vuelva a ejecutar el useEffect
    setReloadUser(false);
  }, [reloadUser]);

  // jwtDecode con el estado de auth
  const login = token => {
    //decofifica el token
    //console.log(jwtDecode(token));
    setToken(token);
    setAuth({
      token,
      idUser: jwtDecode(token).id
    });
  };
  //logout
  const logout = () => {
    if (auth) {
      removeToken();
      setAuth(null);
      router.push("/");
    }
  };
  //hook useMemo para autenticacion
  const authData = useMemo(
    () => ({
      //auth: {name: "Jorge", email:"jrg@gmail.com"},
      auth,
      login,
      logout,
      setReloadUser
    }),
    [auth]
  );
  // si el usuario no esta logeado
  if (auth === undefined) return null;

  return (
    <AuthContext.Provider value={authData}>
      <Component {...pageProps} />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
      />
    </AuthContext.Provider>
  );
}
