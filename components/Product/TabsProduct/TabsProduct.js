import React from "react";
import { Tab } from "semantic-ui-react";

export default function TabsProduct(props) {
  const { product } = props;

  //configuración para las Tabs
  const panes = [
    {
      menuItem: "Información",
      render: () => (
        <Tab.Pane>
          {/* <InfoGame product={product} /> */}
          <h1>Info</h1>
        </Tab.Pane>
      )
    },
    {
      menuItem: "Comentarios",
      render: () => (
        <Tab.Pane>
          <h1>Comentarios</h1>
        </Tab.Pane>
      )
    }
  ];

  return <Tab className="tabs-product" panes={panes} />;
}

