
// Stripe
// npm install --save @stripe/react-stripe-js @stripe/stripe-js
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { STRIPE_TOKEN } from "../../../utils/constants";
// component
import FormPayment from "./FormPayment/FormPayment";

// establece comunicacion con stripe
const stripePromise = loadStripe(STRIPE_TOKEN);

export default function Payment(props) {
  const { products, address } = props;

  return (
    <div className="payment">
      <div className="payment">
        <div className="title">Pago</div>
        <div className="data">
          <Elements stripe={stripePromise}>
            <FormPayment products={products} address={address} /> 
          </Elements>
        </div>
      </div>
    </div>
  );
}
