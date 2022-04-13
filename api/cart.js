import { toast } from "react-toastify";
import { size, includes, remove } from "lodash";
import { BASE_PATH, CART } from "../utils/constants";
import { authFetch } from "../utils/fetch";

// habilita el local storage para extraer los productos añadidos al carrito
export function getProductsCart() {
  const cart = localStorage.getItem(CART);
  if (!cart) {
    return null;
  } else {
    // convierte el stream en un array
    const products = cart.split(",");
    return products;
  }
}

//añade productos al carrito y verifica si ya fueron añadidos al carrito
export function addProductCart(product) {
  const cart = getProductsCart();
  // si no hay productos añadidos al carrito
  if (!cart) {
    localStorage.setItem(CART, product);
    toast.success("Producto añadido al carrito");
  } else {
    // si hay productos en carrito devuelve true
    // se compara el producto con los que ya hay en el carrito
    const productFound = includes(cart, product);
    if (productFound) {
      toast.warning("Este producto ya está añadido al carrito");
    } else {
      cart.push(product);
      localStorage.setItem(CART, cart);
      toast.success("Producto añadido correctamente al carrito");
    }
  }
}

// contador de productos que hay en el carrito
export function countProductsCart() {
  const cart = getProductsCart();
  if (!cart) {
    return 0;
  } else {
    return size(cart);
  }
}

//elimina producto del carrito
export function removeProductCart(product) {
  const cart = getProductsCart();
  
  remove(cart, item => {
    return item === product;
  });
  
  if (size(cart) > 0) {
    localStorage.setItem(CART, cart);
  } else {
    localStorage.removeItem(CART);
  }
}
