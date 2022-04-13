import React, { useState, useEffect } from "react";
// next/router
import { useRouter } from "next/router";
// layout
import BasicLayout from "../layouts/BasicLayout";
// trae los datos del producto
import { getProductByUrlApi } from "../api/items";
// componente para el header del producto
import HeaderProduct from "../components/Product/HeaderProduct/HeaderProduct";
// componente para las tabs del producto
import TabsProduct from "../components/Product/TabsProduct/TabsProduct";
// componente para el carousel de imagenes
import CarouselScreenshots from "../components/Product/CarouselScreenshots/CarouselScreenshots";

export default function product() {
  const { query } = useRouter();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    (async () => {
      const response = await getProductByUrlApi(query.product);
      //console.log(response);
      setProduct(response);
    })();
  }, [query]);
  // para evitar que se ejacute el useEffect antes de que product tenga un valor
  if (!product) return null;

  return (
    <BasicLayout className="product">
      <HeaderProduct product={product} />
      <CarouselScreenshots title={product.title} screenshots={product.screenshots}/>
      <TabsProduct product={product} />
    </BasicLayout>
  );
}
