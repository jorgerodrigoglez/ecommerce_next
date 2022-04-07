import React, { useState, useEffect } from "react";
import { Grid, Image, Icon, Button, GridColumn } from "semantic-ui-react";
import { size } from "lodash";
import classNames from "classnames";
import moment from "moment";
// context hook
import useAuth from "../../../hooks/useAuth";
// peticiones a coleccion de favoritos de strapi
import {
  isFavoriteApi,
  addFavoriteApi,
  deleteFavoriteApi
} from "../../../api/favorite";

export default function HeaderProduct(props) {
  const { product } = props;
  const { poster, title } = product;
  //console.log(product);

  return (
    <Grid className="header-product">
      <Grid.Column mabile={16} tablet={6} computer={5}>
        <Image src={poster.url} alt={title} fluid />
      </Grid.Column>
      <Grid.Column mobile={16} tablet={10} computer={11}>
        <Info product={product} />
      </Grid.Column>
    </Grid>
  );
}
// componente para información del producto
function Info(props) {
  const { product } = props;
  const { title, summary, price, discount } = product;
  // context hook
  const { auth, logout } = useAuth();
  // lista de favoritos
  const [isFavorite, setIsFavorite] = useState(false);
  // el useEffect se vuelve a ejecutar y refresca la página
  const [reloadFavorite, setReloadFavorite] = useState(false);

  // trae productos que son favoritos en coleccion de strapi
  useEffect(() => {
    (async () => {
      const response = await isFavoriteApi(auth.idUser, product.id, logout);
      //console.log(response);
      if (size(response) > 0) setIsFavorite(true);
      else setIsFavorite(false);
    })();
    setReloadFavorite(false);
  }, [product, reloadFavorite]);

    //añadir elemento a favoritos
    const addFavorite = async () => {
      if (auth) {
        await addFavoriteApi(auth.idUser, product.id, logout);
        setReloadFavorite(true);
      }
    };
    //eliminar elemento de favoritos
    const deleteFavorite = async () => {
      if (auth) {
        await deleteFavoriteApi(auth.idUser, product.id, logout);
        setReloadFavorite(true);
      }
    };

  return (
    <>
      <div className="header-product__title">
        {title}
        {/* Renderizado de icono de favoritos */}
        <Icon
          name={isFavorite ? "heart" : "heart outline"}
          className={classNames({
            like: isFavorite
          })}
          link
          onClick={isFavorite ? deleteFavorite : addFavorite}
        />
      </div>
      <div className="info-product__content">
        {/* <div dangerouslySetInnerHTML={{ __html: product.summary }} /> */}
        <div className="info-product__content-date">
          <h4>Publicado:</h4>
          <p>{moment(product.realeaseDate).format("LL")}</p>
        </div>
      </div>
      <div
        className="header-product__summary"
        dangerouslySetInnerHTML={{ __html: summary }}
      />
      <div className="header-product__delivery">Entrega en 24/48h</div>
      <div className="header-product__buy">
        <div className="header-product__buy-price">
          <p>Precio de venta público: {price}€</p>
          <div className="header-product__buy-price-actions">
            <p>-{discount}%</p>
            <p>{(price - Math.floor(price * discount) / 100).toFixed(2)}€</p>
          </div>
        </div>
        <Button className="header-product__buy-btn">Comprar</Button>
      </div>
    </>
  );
}
