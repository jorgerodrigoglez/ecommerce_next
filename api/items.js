import { BASE_PATH } from "../utils/constants";

// recopila todos los productos de strapi
export async function getCategoriesApi(){
    try {
        const url = `${BASE_PATH}/items?_sort=position:asc`;
        const response = await fetch(url);
        const result = await response.json();
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }
}


// recopila cada producto en funcion de su url
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