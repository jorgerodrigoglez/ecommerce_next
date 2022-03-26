import React, { useState } from "react";
import { Form, Button } from "semantic-ui-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
//de api/user
import { loginApi, resetPasswordApi } from "../../../api/users";
//de hooks userAuth para utilizar el contexto creado
import useAuth from "../../../hooks/useAuth";

export default function LoginForm(props) {
  const { showRegisterForm, onCloseModal } = props;
  // estado del boton
  const [loading, setLoading] = useState(false);
  //hooks useAuth
  const { login } = useAuth();
  //console.log(auth);

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object(validationSchema()),
    onSubmit: async formData => {
      //console.log(formData);
      setLoading(true);
      const response = await loginApi(formData);
      if (response?.jwt) {
        //console.log("Login OK");
        //console.log(response);
        login(response.jwt);
        onCloseModal();
        //toast.success("Login correcto");
      } else {
        toast.error("Email o contraseña incorrectos");
      }
      setLoading(false);
    }
  });

  // función de recuperar contraseña
  const resetPassword = () => {
    // reinicia los errores del formulario
    formik.setErrors({});
    const validateEmail = Yup.string().email().required();

    if (!validateEmail.isValidSync(formik.values.identifier)) {
      //console.log("Email incorrecto");
      formik.setErrors({ identifier: true });
    } else {
      //console.log("Email correcto");
      //console.log(formik.values.identifier);
      resetPasswordApi(formik.values.identifier);
    }
  };

  return (
    <Form className="login-form" onSubmit={formik.handleSubmit}>
      <Form.Input
        name="identifier"
        type="text"
        placeholder="Correo electrónico"
        onChange={formik.handleChange}
        error={formik.errors.identifier}
      />
      <Form.Input
        name="password"
        type="password"
        placeholder="Contraseña"
        onChange={formik.handleChange}
        error={formik.errors.password}
      />

      <div className="actions">
        <Button type="button" basic onClick={showRegisterForm}>
          Registrarse
        </Button>
        <div>
          <Button className="submit" type="submit" loading={loading}>
            Entrar
          </Button>
          <Button type="button" onClick={resetPassword}>
            ¿Has olvidado la contraseña?
          </Button>
        </div>
      </div>
    </Form>
  );
}

//Formik
function initialValues() {
  return {
    identifier: "",
    password: ""
  };
}
//Yup
function validationSchema() {
  return {
    identifier: Yup.string()
      .email(true)
      .required(true),
    password: Yup.string().required(true)
  };
}
