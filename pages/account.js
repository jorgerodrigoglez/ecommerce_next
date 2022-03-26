import React, { useState, useEffect } from "react";
import { Icon } from "semantic-ui-react";
import { useRouter } from "next/router";
import BasicLayout from "../layouts/BasicLayout";
// hook para el estado global de la app para el logout
import useAuth from "../hooks/useAuth";
//para rutas protegidas - autenticadas - al servidor
import { getMeApi } from "../api/users";

export default function account() {
  const [user, setUser] = useState(undefined);
  // hook
  const { auth, logout} = useAuth();
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
  if(user === undefined ) return null;
  // si el usuario no esta logeado y el usuario no existe
  if(!auth && !user){
      router.replace("/");
      return null;
  }

  return (
    <BasicLayout className="account">
      <Configuration/>
    
    </BasicLayout>
  );
}

function Configuration(props) {
    //const { user, logout, setReloadUser } = props;
  
    return (
      <div className="account__configuration">
        <div className="title">Configuración</div>
        <div className="data">Formulario de configuración</div>
      </div>
    );
  }

