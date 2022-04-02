import React, { useState, useEffect } from "react";
import { Icon } from "semantic-ui-react";
import { useRouter } from "next/router";
import BasicLayout from "../layouts/BasicLayout";
// hook para el estado global de la app para el logout
import useAuth from "../hooks/useAuth";
//para rutas protegidas - autenticadas - al servidor
import { getMeApi } from "../api/users";
// formulario de usuario
import ChangeNameForm from "../components/Account/ChangeNameForm";
import ChangeEmailForm from "../components/Account/ChangeEmailForm";
import ChangePasswordForm from "../components/Account/ChangePasswordForm/ChangePasswordForm";
// modal para crear direcciones
import BasicModal from "../components/Modal/BasicModal";
// formulario para direcciones incluido en el modal
import AddressForm from "../components/Account/AddressForm";
// listar lista de direcciones creadas en strapi
import ListAddress from "../components/Account/ListAddress";

export default function account() {
  const [user, setUser] = useState(undefined);
  // hook
  const { auth, logout, setReloadUser } = useAuth();
  // router
  const router = useRouter();

  // funcion autoejecutable para peticiones protegidas al servidor
  useEffect(() => {
    (async () => {
      const response = await getMeApi(logout);
      setUser(response || null);
      //console.log(response);
    })();
  }, [auth]);

  // si es undefined el usuario no ha sido logeado todavía
  if (user === undefined) return null;
  // si el usuario no esta logeado y el usuario no existe
  if (!auth && !user) {
    router.replace("/");
    return null;
  }

  return (
    <BasicLayout className="account">
      <Configuration
        user={user}
        logout={logout}
        setReloadUser={setReloadUser}
      />
      <Addresses />
    </BasicLayout>
  );
}

// componente de formulario para editar datos de usuario
function Configuration(props) {
  const { user, logout, setReloadUser } = props;

  return (
    <div className="account__configuration">
      <div className="title">Configuración</div>
      <div className="data">
        <ChangeNameForm
          user={user}
          logout={logout}
          setReloadUser={setReloadUser}
        />
      </div>
      <ChangeEmailForm
        user={user}
        logout={logout}
        setReloadUser={setReloadUser}
      />
      <ChangePasswordForm user={user} logout={logout} />
    </div>
  );
}
// componente para creación y edición de direcciones de envío
function Addresses() {
  const [showModal, setShowModal] = useState(false);
  const [titleModal, setTitleModal] = useState("");
  const [formModal, setFormModal] = useState(null);
  // estado para recargar los datos de direcciones en ListAddress sin tener que recargar el navegador
  const [realoadAddresses, setRealoadAddresses] = useState(false);

  const openModal = (title, address) => {
    setTitleModal(title);
    setFormModal(
      <AddressForm
        setShowModal={setShowModal}
        setRealoadAddresses={setRealoadAddresses}
        // actualización si es false = edicion
        newAddress={ address ? false : true }
        address={address || null}
      />
    );
    setShowModal(true);
  };

  return (
    <div className="account__addresses">
      <div className="title">
        Direciones
        <Icon name="plus" link onClick={() => openModal("New direction")} />
      </div>
      <div className="data">
        <ListAddress
          realoadAddresses={realoadAddresses}
          setRealoadAddresses={setRealoadAddresses}
          openModal={openModal}
        />
      </div>
      <BasicModal
        showModal={showModal}
        setShowModal={setShowModal}
        title={titleModal}
      >
        {formModal}
      </BasicModal>
    </div>
  );
}
