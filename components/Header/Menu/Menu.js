import React, { useState, useEffect } from "react";
// para componentes de react para generar estilos
// npm install semantic-ui-react semantic-ui-css
import { Container, Grid, Menu, Icon, Label } from "semantic-ui-react";
// next-link
import Link from "next/link";
// Basic Modal
import BasicModal from "../../Modal/BasicModal";
// Login del formulario
import Auth from "../../Auth/Auth";
// estado global de la app para el logout
import useAuth from "../../../hooks/useAuth";
//para rutas protegidas - autenticadas - al servidor
import { getMeApi } from "../../../api/users";

export default function MainMenu() {
  // mostrar u ocultar el modal
  const [showModal, setShowModal] = useState(false);
  // cambiar el title de la ventana modal
  const [titleModal, setTitleModal] = useState("Iniciar sesión");
  // Estado para rutas protegidas al servidor de getMeApi
  const [user, setUser] = useState(undefined);
  // useAuth/hooks de objeto authData de _app.js
  const { auth, logout } = useAuth();

  // funcion autoejecutable para peticiones protegidas al servidor
  useEffect(() => {
    (async () => {
      const response = await getMeApi(logout);
      setUser(response);
      //console.log(response);
    })();
  }, [auth]);

  const onShowModal = () => setShowModal(true);
  // para el componente de Auth
  const onCloseModal = () => setShowModal(false);

  return (
    <div className="menu">
      <Container>
        <Grid>
          <Grid.Column className="menu__left" width={6}>
            <MenuItems />
          </Grid.Column>
          <Grid.Column className="menu__right" width={10}>
            {/*auth ? (
              <button onClick={logout}>Cerrar sesión</button>
            ) : (
              <MenuOptions onShowModal={onShowModal} />
            )*/}
            {/* Cuando se haya autoejecutado el useEffect de peticiones protegidas */}
            {user !== undefined && (
              <MenuOptions
                onShowModal={onShowModal}
                user={user}
                logout={logout}
              />
            )}
          </Grid.Column>
        </Grid>
      </Container>

      <BasicModal
        showModal={showModal}
        setShowModal={setShowModal}
        title={titleModal}
        size="small"
      >
        <Auth onCloseModal={onCloseModal} setTitleModal={setTitleModal} />
      </BasicModal>
    </div>
  );
}

function MenuItems() {
  return (
    <Menu>
      <Link href="/sectores">
        <Menu.Item as="a">Sectores</Menu.Item>
      </Link>
      <Link href="/servicios">
        <Menu.Item as="a">Servicios</Menu.Item>
      </Link>
      <Link href="/municipios">
        <Menu.Item as="a">Municipios</Menu.Item>
      </Link>
    </Menu>
  );
}

function MenuOptions(props) {
  const { onShowModal, user, logout } = props;

  return (
    <Menu>
      {user ? (
        <>
          <Link href="/orders">
            <Menu.Item as="a">
              <Icon name="game" />
              Mis pedidos
            </Menu.Item>
          </Link>
          <Link href="/wishlist">
            <Menu.Item as="a">
              <Icon name="heart outline" />
              Mis favoritos
            </Menu.Item>
          </Link>
          <Link href="/account">
            <Menu.Item as="a">
              <Icon name="user outline" />
              {user.name}{user.lastname}
            </Menu.Item>
          </Link>
          <Link href="/cart">
            <Menu.Item as="a" className="m-0">
              <Icon name="cart" />
            </Menu.Item>
          </Link>
          <Menu.Item onClick={logout} className="m-0">
            <Icon name="power off"/>
          </Menu.Item>
        </>
      ) : (
        <Menu.Item onClick={onShowModal}>
          <Icon name="user outline" />
          Mi cuenta
        </Menu.Item>
      )}
    </Menu>
  );
}
