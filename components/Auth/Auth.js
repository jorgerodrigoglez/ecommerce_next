import React, { useState } from "react";
// formularios de registro y login
import RegisterForm from "./RegisterForm";
import LoginForm from "./LoginForm";

export default function Auth(props) {
  const { onCloseModal, setTitleModal } = props;

  const [showLogin, setShowLogin] = useState(true);

  const showLoginForm = () => {
    setShowLogin(true);
    setTitleModal("Iniciar sesión");
  };
  const showRegisterForm = () => {
    setShowLogin(false);
    setTitleModal("Crear nuevo usuario");
  };

  return showLogin ? (
    <LoginForm showRegisterForm={showRegisterForm} />
  ) : (
    <RegisterForm showLoginForm={showLoginForm} />
  );
}
