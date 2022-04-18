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
// para crear carrusel de imagenes en las paginas de producto
// npm install react-slick --save
// npm install slick-carousel
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
//create context de context/AuthContext - hook: useAuth
import AuthContext from "../context/AuthContext";
//funciones para mantener guardada lasesion del usuario en el local storage
import { setToken, getToken, removeToken } from "../api/token";
//hook router next
import { useRouter } from "next/router";
//create context de context/CartContext - hook: useCart
import CartContext from "../context/CartContext";
// funcionalidades del carrito de api/cart
import {
  getProductsCart,
  addProductCart,
  countProductsCart,
  removeProductCart,
  removeAllProductsCart,
} from "../api/cart";

export default function MyApp({ Component, pageProps }) {
  //jwt-decode de la funcion login
  const [auth, setAuth] = useState(undefined);
  //console.log(auth);
  //controla la ejecución del useEffect del token
  const [reloadUser, setReloadUser] = useState(false);
  // contador para los productos que han sido añadidos al carrito
  const [totalProductsCart, setTotalProductsCart] = useState(0);
  // actualiza el numero de productos en el carrito sin recargar la app
  const [reloadCart, setReloadCart] = useState(false);
  //router next
  const router = useRouter();
  // devuelve el token del usuario logeado
  // muestra el total de productos en el carrito
  // console.log(totalProductsCart);
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

  // cuando la app se carge se contaran los productos del carrito
  useEffect(() => {
    setTotalProductsCart(countProductsCart());
    setReloadCart(false);
  }, [reloadCart, auth]);

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
  // logout
  const logout = () => {
    if (auth) {
      removeToken();
      setAuth(null);
      router.push("/");
    }
  };
  // función para añadir productos al carrito cuando el usuario este logeado
  const addProduct = urlProduct => {
    //console.log(auth);
    const token = getToken();
    if (token) {
      addProductCart(urlProduct);
      setReloadCart(true);
    } else {
      toast.warning("Para comprar tienes que iniciar sesión");
    }
  };

  //eliminar producto del carrito
  const RemoveProduct = product => {
    removeProductCart(product);
    setReloadCart(true);
  };

  //hook useMemo para el context de autenticacion
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
  //hook useMemo para el context de cart
  const cartData = useMemo(
    () => ({
      productsCart: totalProductsCart,
      addProductCart: urlProduct => addProduct(urlProduct),
      getProductsCart: getProductsCart,
      removeProductCart: product => RemoveProduct(product),
      removeAllProductsCart: removeAllProductsCart
    }),
    [totalProductsCart]
  );
  // si el usuario no esta logeado
  if (auth === undefined) return null;

  return (
    <AuthContext.Provider value={authData}>
      <CartContext.Provider value={cartData}>
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
      </CartContext.Provider>
    </AuthContext.Provider>
  );
}
