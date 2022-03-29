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
    </BasicLayout>
  );
}

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
