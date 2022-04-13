import React, { useState, useEffect } from "react";
import { Table, Image, Icon } from "semantic-ui-react";
import { forEach, map } from "lodash";
// context
import useCart from "../../../hooks/useCart";

export default function SummaryCart(props) {
  const { products, reloadCart, setReloadCart } = props;
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalPriceDiscount, setTotalPriceDiscount] = useState(0);
  const { removeProductCart } = useCart();

  useEffect(() => {
    let priceDiscount = 0;
    let price = 0;
    forEach(products, product => {
      price += product.price;
    });
    forEach(products, product => {
      priceDiscount += (product.price - Math.floor(product.price * product.discount) / 100);
    });
    setTotalPrice(price);
    setTotalPriceDiscount(priceDiscount);
  }, [reloadCart, products]);

  //eliminar producto del carrito
  const removeProduct = product => {
    removeProductCart(product);
    //console.log(product);
    setReloadCart(true);
  };
  
  return (
    <div className="summary-cart">
      <div className="title">Resumen del carrito:</div>
      <div className="data">
        <Table celled structured>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Marca</Table.HeaderCell>
              <Table.HeaderCell>Tipo</Table.HeaderCell>
              <Table.HeaderCell>Entrega</Table.HeaderCell>
              <Table.HeaderCell>Precio</Table.HeaderCell>
              <Table.HeaderCell>Descuento</Table.HeaderCell>
              <Table.HeaderCell>Precio final</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {map(products, product => (
              <Table.Row key={product.id} className="summary-cart__product">
                <Table.Cell>
                  <Icon
                    name="close"
                    link
                    onClick={() => removeProduct(product.url)}
                  />
                  <Image src={product.poster.url} alt={product.title} />
                  {product.title}
                </Table.Cell>
                <Table.Cell>{product.item.name}</Table.Cell>
                <Table.Cell>Inmediata</Table.Cell>
                <Table.Cell>{product.price}€</Table.Cell>
                <Table.Cell>{product.discount}%</Table.Cell>
                <Table.Cell>{(product.price - Math.floor(product.price * product.discount) / 100).toFixed(2)}</Table.Cell>
              </Table.Row>
            ))}

            <Table.Row className="summary-cart__resume">
              <Table.Cell className="clear"></Table.Cell>
              <Table.Cell colSpan="2" className="total">
                Total
              </Table.Cell>
              <Table.Cell className="total-price">
                {totalPrice.toFixed(2)}€
              </Table.Cell>
              <Table.Cell></Table.Cell>
              <Table.Cell className="total-price">
                {totalPriceDiscount.toFixed(2)}€
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </div>
    </div>
  );
}
