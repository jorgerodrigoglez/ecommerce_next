import React, { useState, useEffect } from "react";
import BasicLayout from "../layouts/BasicLayout";
// context cart / hook
import useCart from "../hooks/useCart";
// lista todos los datos de cada producto en funcion de su url
import { getProductByUrlApi } from "../api/product";
// components
import SummaryCart from "../components/Cart/SummaryCart";
import AddressShipping from "../components/Cart/AddressShipping/addressShipping";
import Payment from "../components/Cart/Payment";

export default function cart() {
  const { getProductsCart } = useCart();
  const products = getProductsCart();

  return !products ? <EmptyCart /> : <FullCart products={products} />;
}

function EmptyCart() {
  return (
    <BasicLayout className="empty-cart">
      <h2>No hay productos en el carrito</h2>
    </BasicLayout>
  );
}

function FullCart(props) {
  const { products } = props;
  //console.log(products);
  const [productsData, setProductsData] = useState(null);
  const [reloadCart, setReloadCart] = useState(false);
  //console.log(productsData);
  // estado para componente de <AddressShipping/>
  // selecciona la direccion escogida por el usuario
  const [address, setAddress] = useState(null);
  //console.log(address);

  // crea un array de productos añadidos al carrito
  useEffect(() => {
    (async () => {
      const productsTemp = [];
      for await (const product of products) {
        const data = await getProductByUrlApi(product);
        productsTemp.push(data);
      }
      setProductsData(productsTemp);
    })();
    setReloadCart(false);
  }, [reloadCart]);

  return (
    <BasicLayout className="empty-cart">
      <SummaryCart
        products={productsData}
        reloadCart={reloadCart}
        setReloadCart={setReloadCart}
      /> 
      <AddressShipping setAddress={setAddress}/>
      {address && <Payment products={productsData} address={address}/>}
    </BasicLayout>
  );
}
