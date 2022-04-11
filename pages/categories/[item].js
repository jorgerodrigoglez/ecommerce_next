import React, { useState, useEffect } from "react";
// css semantic
import { Loader, Divider } from "semantic-ui-react";
// next router
import { useRouter } from "next/router";
//lodash
import { size } from "lodash";
// layout
import BasicLayout from "../../layouts/BasicLayout";
// de api/game
import {
  getCategorieProductsApi,
  getTotalProductsApi
} from "../../api/product";
// componente para mostrar la lista de productos
import ListProducts from "../../components/ListProducts/ListProducts";
// componente para mostrar la paginacion
import Pagination from "../../components/Pagination";

//limite de juegos por pagina
const limitPerPage = 6;

export default function Product() {
  //const router = useRouter();
  //console.log(router);
  const { query } = useRouter();
  //console.log(query);
  const [products, setProducts] = useState(null);
  // recoge los datos de la petición de total de productos de una categoria
  const [totalProductsCategory, setTotalProductsCategory] = useState(null);

  //conocer desde que item vamos a empezar la paginación
  const getStartItem = () => {
    const currentPages = parseInt(query.page);
    if (!query.page || currentPages === 1) return 0;
    else return currentPages * limitPerPage - limitPerPage;
  };
  //console.log(getStartItem());
  // selecciona los productos por categoria
  useEffect(() => {
    (async () => {
      if (query.item) {
        const response = await getCategorieProductsApi(
          query.item,
          limitPerPage,
          getStartItem()
        );
        //console.log(response);
        setProducts(response);
      }
    })();
  }, [query]);

  //obtener numero de total de productos de una categoria
  useEffect(() => {
    (async () => {
      const response = await getTotalProductsApi(query.item);
      //console.log(response);
      setTotalProductsCategory(response);
    })();
  }, [query]);
  return (
    <BasicLayout className="product">
      {!products && <Loader active>Cargando productos</Loader>}
      {products && size(products) === 0 && (
        <div>
          <h3>No hay productos</h3>
        </div>
      )}
      {size(products) > 0 && <ListProducts products={products} />}
      {/* Paginación */}
      {totalProductsCategory ? (
        <Pagination
          totalProductsCategory={totalProductsCategory}
          page={query.page ? parseInt(query.page) : 1}
          limitPerPage={limitPerPage}
        />
      ) : null}
    </BasicLayout>
  );
}
