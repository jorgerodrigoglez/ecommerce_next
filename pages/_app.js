// importancion de estilos globales de la app de scss/global.scss
// npm i sass
import "../scss/global.scss";
// para componentes de react para generar estilos
// npm install semantic-ui-react semantic-ui-css
import 'semantic-ui-css/semantic.min.css';
// react-toastify
import { ToastContainer } from "react-toastify";
//css de react toastify
import "react-toastify/dist/ReactToastify.css";


export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
      />
    </>
  );

}
