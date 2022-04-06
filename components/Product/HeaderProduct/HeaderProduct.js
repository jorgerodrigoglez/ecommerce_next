import React, { useState, useEffect } from "react";
import { Grid, Image, Icon, Button, GridColumn } from "semantic-ui-react";
import { size } from "lodash";

export default function HeaderProduct(props) {
  const { product } = props;
  const { poster, title } = product;
  console.log(product);

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

function Info(props) {
  const { product } = props;
  const { title, summary, price, discount } = product;

  return (
    <>
      <div className="header-product__title">
        {title}
        <Icon name="heart outline" link />
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
