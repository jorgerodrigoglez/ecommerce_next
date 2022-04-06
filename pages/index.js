// ojo v4 de strapi no soporta mongodb
// para crear el server en la carpeta principal ecommerce-next
// npx create-strapi-app@3.6.8 ecommerce
// usar > que node 10 y menor de 14
import React, { useState, useEffect } from "react";
// lodash
import { size } from "lodash";
// semantic ui
import { Loader } from "semantic-ui-react";
// trae los producto de strapi api/product
import { getLastProductsApi } from "../api/product";
// componente del layouts
import BasicLayout from "../layouts/BasicLayout";
// componente para mostrar la lista de productos
import ListProducts from "../components/ListProducts/ListProducts";

export default function Home() {
  // estado para guardar cada producto
  const [products, setProducts] = useState(null);
  //console.log(products);
  // trae los diferentes productos de strapi a la home
  useEffect(() => {
    (async () => {
      const response = await getLastProductsApi(10);
      if (size(response) > 0) setProducts(response);
      else setProducts([]);
    })();
  }, []);

  return (
    <div className="home">
      <BasicLayout className="home">
        {!products && <Loader active>Cargando juegos...</Loader>}
        { products && size(products) === 0 && (
          <div>
            <h3>No hay productos...</h3>
          </div>
        )}
        {size(products) > 0 && <ListProducts products={products} /> }
      </BasicLayout>
    </div>
  );
}
