import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { size } from "lodash";
import { Loader } from "semantic-ui-react";
import BasicLayout from "../layouts/BasicLayout";
// api
import { searchProductsApi } from "../api/product";
// component
import ListProducts from "../components/ListProducts";

export default function search() {
  //guarda los productos encontrados
  const [products, setProducts] = useState(null);
  const { query } = useRouter();
  //console.log(query.query);
  //mantiene el foco del buscador
  useEffect(() => {
    document.getElementById("search__products").focus();
  }, []);

  //peticion de la busqueda realizada mediante buscador de texto
  useEffect(() => {
    (async () => {
      // si query tiene una letra o más
      if (size(query.query) > 0) {
        const response = await searchProductsApi(query.query);
        //console.log(response);
        if (size(response) > 0) setProducts(response);
        else setProducts([]);
      } else {
        setProducts([]);
      }
    })();
  }, [query]);
  return (
    <BasicLayout className="search">
      {!products && <Loader active>Buscando...</Loader>}
      {products && size(products) === 0 && (
        <div>
          <h3>No se han encontrado productos</h3>
        </div>
      )}
      {size(products) > 0 && <ListProducts products={products} />}
    </BasicLayout>
  );
}
