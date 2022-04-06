import { Image, Grid } from "semantic-ui-react";
import Link from "next/link";
import { map } from "lodash";
// Hook para diseño responsible de la ventana del navegador: calcula el ancho y alto de la pantalla
import useWindowSize from "../../hooks/useWindowSize";
// define los breakpoints
import {
  breakpointUpSm,
  breakpointUpMd,
  breakpointUpLg
} from "../../utils/breakpoints";

export default function ListProducts(props) {
  const { products } = props;
  // hook para diseño responsive
  //const data = useWindowSize();
  //console.log(data);
  const { width } = useWindowSize();
  //columnas que se van a cargar en cada resolución definida en  breakpoints
  const getColumnsRender = () => {
    switch (true) {
      case width > breakpointUpLg:
        return 3;
      case width > breakpointUpMd:
        return 2;
      case width > breakpointUpSm:
        return 1;
      default:
        return 1;
    }
  };

  return (
    <div className="list-products">
      <Grid>
        <Grid.Row columns={getColumnsRender()}>
          {map(products, product => (
            <Product product={product} key={product.id} />
          ))}
        </Grid.Row>
      </Grid>
    </div>
  );
}

// componente del producto
function Product(props) {
  const { product } = props;
  //console.log(product);
  return (
    <Grid.Column className="list-products__product">
      <Link href={`/${product.url}`}>
        <a>
          <h2>{product.title}</h2>
          <div className="list-products__product-poster">
            <Image src={product.poster.url} alt={product.title} />
            <div className="list-products__product-poster-info">
              <span className="price">{product.price}€</span>
              {product.discount ? (
                <span className="discount">-{product.discount}%</span>
              ) : (
                <span />
              )}
            </div>
          </div>
        </a>
      </Link>
    </Grid.Column>
  );
}
