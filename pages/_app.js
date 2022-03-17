// importancion de estilos globales de la app de scss/global.scss
// npm i sass
import "../scss/global.scss";
// para componentes de react para generar estilos
// npm install semantic-ui-react semantic-ui-css
import 'semantic-ui-css/semantic.min.css';


export default function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}
