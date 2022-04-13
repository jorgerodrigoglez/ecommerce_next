import { BASE_PATH } from "../utils/constants";

// Extrae los últimos productos añadidos de la strapi
export async function getLastProductsApi(limit) {
  try {
    const limitItems = `_limit=${limit}`;
    const sortItem = `_sort=createdAt:desc`;
    const url = `${BASE_PATH}/products?${limitItems}&${sortItem}`;
    const response = await fetch(url);
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
}

//peticion para que se seleccionen los productos por categoria
export async function getCategorieProductsApi(item,limit,start) {
  try {
    const limitItems = `_limit=${limit}`;
    const sortItems = `_sort=createdAt:desc`;
    const startItems = `_start=${start}`;
    const url = `${BASE_PATH}/products?item.url=${item}&${limitItems}&${sortItems}&${startItems}`;
    const response = await fetch(url);
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
}

//devuelve el numero total de productos registrados de una categoria como numero entero
export async function getTotalProductsApi(item){
  try {
      const url = `${BASE_PATH}/products/count?item.url=${item}`;
      const response = await fetch(url);
      const result = await response.json();
      return result;
  } catch (error) {
      console.log(error);
      return null;
  }
}

// devuelve todos los dstos de cada producto en funcion de su url
// funcion llamada desde pages/cart.js 
export async function getProductByUrlApi(path){
  try {
    const url = `${BASE_PATH}/products?url=${path}`;
    const response = await fetch(url);
    const result = await response.json();
    return result[0];
  } catch (error) {
      console.log(error);
      return null;
  }
}

//devuelve los productos de la búsqueda realizada mediante texto de la bbdd de strapi
export async function searchProductsApi(title){
  try {
    const url = `${BASE_PATH}/products?_q=${title}`;
    const response = await fetch(url);
    const result = await response.json();
    return result;   
  } catch (error) {
      console.log(error);
      return null;
  }
}