import React, { useState, useEffect } from "react";
import { Grid } from "semantic-ui-react";
import { map, size } from "lodash";
import BasicLayout from "../layouts/BasicLayout";
// api - order
import { getOrdersApi } from "../api/order";
// context - hook
import useAuth from "../hooks/useAuth";
// components
import Order from "../components/Orders/Order";

export default function orders() {
  const [orders, setOrders] = useState(null);
  const { auth, logout } = useAuth();

  useEffect(() => {
    (async () => {
      const response = await getOrdersApi(auth.idUser, logout);
      //console.log(response);
      setOrders(response || []);
    })();
  }, []);

  return (
    <BasicLayout className="orders">
      <div className="orders__block">
        <div className="title">Mis pedidos</div>
        <div className="data">
          {size(orders) === 0 ? (
            <h2 style={{ textAlign: "center" }}>
              Todavía no has realizado ninguna compra
            </h2>
          ) : (
            <OrderList orders={orders} />
          )}
        </div>
      </div>
    </BasicLayout>
  );
}

function OrderList(props) {
  const { orders } = props;
  return (
    <Grid>
      {map(orders, order => (
        <Grid.Column mobile={16} table={6} computer={8} key={order.id}>
          <Order order={order} />
        </Grid.Column>
      ))}
    </Grid>
  );
}
