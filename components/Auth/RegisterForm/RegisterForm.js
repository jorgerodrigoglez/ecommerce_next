import React, { useState } from "react";
import { Form, Button } from "semantic-ui-react";
// libreria para el uso de estados del formulario
// npm i formik
import { useFormik } from "formik";
// libreria para la validación de los campos del formulario
// npm i yup
import * as Yup from "yup";
// registro de usuarios en strapi
import { registerApi } from "../../../api/users";
// npm i react-toastify
import { toast } from "react-toastify";

export default function RegisterForm(props) {
  const { showLoginForm } = props;
  // loading del boton de registro
  const [loading, setLoading] = useState(false);

  // hook de formik
  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object(validationSchema()),
    onSubmit: async formData => {
      //console.log(formData);
      setLoading(true);
      const response = await registerApi(formData);
      //console.log(response);
      if (response?.jwt) {
        toast.success("Registro correcto");
        showLoginForm();
      } else {
        toast.error("Error al registrar el usuario");
      }
      setLoading(false);
    }
  });
  return (
    <Form className="login-form" onSubmit={formik.handleSubmit}>
      <Form.Input
        name="name"
        type="text"
        placeholder="Nombre"
        onChange={formik.handleChange}
        error={formik.errors.name}
      />
      <Form.Input
        name="lastname"
        type="text"
        placeholder="Apellidos"
        onChange={formik.handleChange}
        error={formik.errors.lastname}
      />
      <Form.Input
        name="username"
        type="text"
        placeholder="Nombre de usuario"
        onChange={formik.handleChange}
        error={formik.errors.username}
      />
      <Form.Input
        name="email"
        type="text"
        placeholder="Email"
        onChange={formik.handleChange}
        error={formik.errors.email}
      />
      <Form.Input
        name="password"
        type="password"
        placeholder="Contraseña"
        onChange={formik.handleChange}
        error={formik.errors.password}
      />
      <div className="actions">
        <Button type="button" basic>
          Iniciar sesión
        </Button>
        <Button type="submit" className="submit" loading={loading}>
          Registrar
        </Button>
      </div>
    </Form>
  );
}

//Formik manejo de estado del formulario
function initialValues() {
  return {
    name: "",
    lastname: "",
    username: "",
    email: "",
    password: ""
  };
}

//Yup validaciones del formulario
function validationSchema() {
  return {
    name: Yup.string().required(true),
    lastname: Yup.string().required(true),
    username: Yup.string().required(true),
    email: Yup.string()
      .email(true)
      .required(true),
    password: Yup.string().required(true)
  };
}
