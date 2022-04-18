import React, { useState } from "react";
import { Button } from "semantic-ui-react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { size } from "lodash";
//stripe
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
// context - hooks
import useAuth from "../../../../hooks/useAuth";
import useCart from "../../../../hooks/useCart";
// api - cart: genera el pago en stripe
import { paymentCartApi } from "../../../../api/cart";

export default function FormPayment(props) {
  const { products, address } = props;
  // estado del loading
  const [loading, setLoading] = useState(false);
  // stripe
  const stripe = useStripe();
  const elements = useElements();
  // context hooks
  const { auth, logout } = useAuth();
  const { removeAllProductsCart } = useCart();
  // router
  const router = useRouter();

  // submit del formulario
  const handleSubmit = async (e) => {
      e.preventDefault();
      //console.log("Realizando pago");
      setLoading(true);
      if(!stripe || !elements) return;
      //configuracion de acuerdo de cobro con stripe
      const cardElement = elements.getElement(CardElement);
      const result = await stripe.createToken(cardElement);
      if(result.error) {
          toast.error(result.error.message);
      } else {
          //console.log(result);
          const response = await paymentCartApi(
              result.token,
              products,
              auth.idUser,
              address,
              logout
          );

          if(size(response) > 0){
              toast.success("Pedido completado");
              removeAllProductsCart();
              router.push("/orders");
          }else{
              toast.error("Error al realizar el pedido");
          }
      }
      setLoading(false);
  }

  return (
    <form className="form-payment" onSubmit={handleSubmit}>
      <CardElement />
      <Button type="submit" loading={loading} disabled={!stripe}>
        Pagar...
      </Button>
    </form>
  );
}
