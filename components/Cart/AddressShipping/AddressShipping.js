import React, { useState, useEffect } from "react";
import { Grid } from "semantic-ui-react";
import { map, size } from "lodash";
import Link from "next/link";
import classNames from "classnames";
// api
import { getAddressesApi } from "../../../api/address";
// context auth
import useAuth from "../../../hooks/useAuth";

export default function AddressShipping(props) {
  // estado para recuperar direcciones de envio de strapi
  const [addresses, setAddresses] = useState(null);
  // estados para seleccionar dirección de envio
  const { setAddress } = props;
  const [addressActive, setAddressActive] = useState(null);
  // context
  const { auth, logout } = useAuth();

  useEffect(() => {
    (async () => {
      const response = await getAddressesApi(auth.idUser, logout);
      //console.log(response);
      setAddresses(response || []);
    })();
  }, []);

  return (
    <div className="address-shipping">
      <div className="title">Dirección de envío</div>
      <div className="data">
        {size(addresses) === 0 ? (
          <h3>
            No hay ninguna dirección de envío creada{" "}
            <Link href="/account">
              <a>Añadir dirección</a>
            </Link>
          </h3>
        ) : (
          <Grid>
            {map(addresses, address => (
              <Grid.Column key={address.id} mobile={8} tablet={8} computer={4}>
                <Address
                  address={address}
                  addressActive={addressActive}
                  setAddressActive={setAddressActive}
                  setAddress={setAddress}
                />
              </Grid.Column>
            ))}
          </Grid>
        )}
      </div>
    </div>
  );
}

function Address(props) {
  const { address, addressActive, setAddressActive, setAddress } = props;
  // selecciona el id de la direccion seleccionada
  // selecciona todos los datos de la direccion seleccionada
  const changeAddress = () => {
    setAddressActive(address._id);
    setAddress(address);
  };
  return (
    <div
      className={classNames("address", {
        // pone la clase active si se cumple la condicion
        active: addressActive === address._id
      })}
      onClick={changeAddress}
    >
      <p>{address.title}</p>
      <p>{address.name}</p>
      <p>{address.address}</p>
      <p>
        {address.city}, {address.state}, {address.postalCode}
      </p>
      <p>{address.phone}</p>
    </div>
  );
}
