import { useState } from "react";
// para componentes de react para generar estilos
// npm install semantic-ui-react semantic-ui-css
import { Container, Grid, Menu, Icon, Label } from "semantic-ui-react";
// next-link
import Link from "next/link";
// Basic Modal
import BasicModal from "../../Modal/BasicModal";
// Login del formulario
import Auth from "../../Auth/Auth";

export default function MainMenu() {
  // mostrar u ocultar el modal
  const [showModal, setShowModal] = useState(false);
  // cambiar el title de la ventana modal
  const [titleModal, setTitleModal] = useState("Iniciar sesión");

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
            <MenuOptions onShowModal={onShowModal} />
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
  const { onShowModal } = props;

  return (
    <Menu>
      <Menu.Item onClick={onShowModal}>
        <Icon name="user outline" />
        Mi cuenta
      </Menu.Item>
    </Menu>
  );
}
