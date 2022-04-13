import React, { useState, useEffect } from "react";
// para componentes de react para generar estilos
// npm install semantic-ui-react semantic-ui-css
import { Container, Grid, Menu, Icon, Label } from "semantic-ui-react";
//lodash
import { map } from "lodash";
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
// petición para extraer las categorias de strapi
import { getCategoriesApi } from "../../../api/items";
// context cart; hook useCart
import useCart from "../../../hooks/useCart";

export default function MainMenu() {
  // mostrar u ocultar el modal
  const [showModal, setShowModal] = useState(false);
  // cambiar el title de la ventana modal
  const [titleModal, setTitleModal] = useState("Iniciar sesión");
  // Estado para rutas protegidas al servidor de getMeApi
  const [user, setUser] = useState(undefined);
  // Estado para las categorias de productos de api/products
  const [categories, setCategories] = useState([]);

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

  // función para categorias de los productos  api/products
  useEffect(() => {
    (async () => {
      const response = await getCategoriesApi();
      setCategories(response || []);
      //console.log(response);
    })();
  }, []);

  const onShowModal = () => setShowModal(true);
  // para el componente de Auth
  const onCloseModal = () => setShowModal(false);

  return (
    <div className="menu">
      <Container>
        <Grid>
          <Grid.Column className="menu__left" width={6}>
            <MenuItems categories={categories} />
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

function MenuItems(props) {
  const { categories } = props;

  return (
    // <Menu>
    //   <Link href="/sectores">
    //     <Menu.Item as="a">Sectores</Menu.Item>
    //   </Link>
    //   <Link href="/servicios">
    //     <Menu.Item as="a">Servicios</Menu.Item>
    //   </Link>
    //   <Link href="/municipios">
    //     <Menu.Item as="a">Municipios</Menu.Item>
    //   </Link>
    // </Menu>
    <Menu>
      {map(categories, categorie => (
        <Link href={`/categories/${categorie.url}`} key={categorie._id}>
          <Menu.Item as="a" name={categorie.url}>
            {categorie.name}
          </Menu.Item>
        </Link>
      ))}
    </Menu>
  );
}

function MenuOptions(props) {
  const { onShowModal, user, logout } = props;
  // useCart
  const { productsCart } = useCart();

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
              {user.name}
              {user.lastname}
            </Menu.Item>
          </Link>
          <Link href="/cart">
            <Menu.Item as="a" className="m-0">
              <Icon name="cart" />
              {productsCart > 0 && (
                <Label color="red" floating circular>
                  {productsCart}
                </Label>
              )}
            </Menu.Item>
          </Link>
          <Menu.Item onClick={logout} className="m-0">
            <Icon name="power off" />
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
