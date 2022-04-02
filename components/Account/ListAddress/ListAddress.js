import React, { useState, useEffect } from "react";
import { Grid, Button } from "semantic-ui-react";
// npm i lodash
import { map, size } from "lodash";
import { getAddressesApi, deleteAddressApi } from "../../../api/address";
import useAuth from "../../../hooks/useAuth";

export default function ListAddress(props) {
  const { realoadAddresses, setRealoadAddresses, openModal } = props;
  const [addresses, setAddresses] = useState(null);
  const { auth, logout } = useAuth();
  //console.log(addresses);

  useEffect(() => {
    (async () => {
      const response = await getAddressesApi(auth.idUser, logout);
      setAddresses(response || []);
      //console.log(response);
      setRealoadAddresses(false);
    })();
  }, [realoadAddresses]);

  // evita que aparezca - No hay direcciones creadas - hasta que cargan
  if (!addresses) return null;

  return (
    <div className="list-address">
      {size(addresses) === 0 ? (
        <h3>No hay ninguna dirección creada</h3>
      ) : (
        <Grid>
          {/* loash */}
          {map(addresses, address => (
            <Grid.Column key={address.id} mobile={16} tablet={8} computer={4}>
              <Address
                address={address}
                logout={logout}
                setRealoadAddresses={setRealoadAddresses}
                openModal={openModal}
              />
            </Grid.Column>
          ))}
        </Grid>
      )}
    </div>
  );
}

function Address(props) {
  //console.log(props);
  const { address, logout, setRealoadAddresses, openModal } = props;
  const [loadingDelete, setLoadingDelete] = useState(false);

  const deleteAddress = async () => {
    //console.log(address._id);
    setLoadingDelete(true);
    const response = await deleteAddressApi(address._id, logout);
    if (response) setRealoadAddresses(true);
    setLoadingDelete(false);
  };

  return (
    <div className="address">
      <p>{address.title}</p>
      <p>{address.name}</p>
      <p>{address.address}</p>
      <p>
        {address.state} , {address.city} {address.postalCode}
      </p>
      <p>{address.phone}</p>
      {
        <div className="actions">
          <Button
            primary
            onClick={() => openModal(`Editar: ${address.title}`, address)}
          >
            Editar
          </Button>
          <Button onClick={deleteAddress} loading={loadingDelete}>
            Eliminar
          </Button>
        </div>
      }
    </div>
  );
}
