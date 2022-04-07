import React, { useState, useEffect } from "react";
import { Loader } from "semantic-ui-react";
import { size, forEach } from "lodash";
import BasicLayout from "../layouts/BasicLayout";
// extrae favoritos de userId de strapi
import { getFavoriteApi } from "../api/favorite";
// context hook
import useAuth from "../hooks/useAuth";
// componente para mostrar lista de productos
import ListProducts from "../components/ListProducts";

export default function wishlist() {
  const [products, setProducts] = useState(null);
  const { auth, logout } = useAuth();
  //console.log(products);

  useEffect(() => {
    (async () => {
      const response = await getFavoriteApi(auth.idUser, logout);
      //console.log(response);
      if(size(response) > 0){
        const productsList = [];
        forEach(response, (data) => {
          productsList.push(data.product);
        });
        setProducts(productsList);
      }else{
        setProducts([]);
      }
    })();
  }, []);

  return (
    <BasicLayout className="wishlist">
      <div className="wishlist__block">
        <div className="title">Lista de deseos</div>
        <div className="data">
          {!products && <Loader active>Cargando productos</Loader>}
          {products && size(products) === 0 && (
            <div className="data__not-found">
              <h3>No tienes ningún producto en tu lista de favoritos</h3>
            </div>
          )}
          {size(products) > 0 && <ListProducts products={products} />}
        </div>
      </div>
    </BasicLayout>
  );
}