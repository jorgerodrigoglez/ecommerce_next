import React, { useState } from "react";
import { Form, Button } from "semantic-ui-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { updateEmailApi } from "../../../api/users";

export default function ChangeEmailForm(props) {
  const { user, logout, setReloadUser } = props;
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object(validationSchema()),
    onSubmit: async formData => {
      //console.log(formData);
      setLoading(true);
      const response = await updateEmailApi(user.id, formData.email, logout);
      if (!response) {
        toast.error("Error al actualizar el email");
      } else if (response?.statusCode === 400) {
        toast.error("El Email no se puede actualizar porque ya existe");
      } else {
        setReloadUser(true);
        //console.log("email actualizado");
        toast.success("El Email ha sido actualizado");
      }
      setLoading(false);
    }
  });

  return (
    <div className="change-email-form">
      <h4>Cambia tu email</h4>
      <span> Tu email actual es : {user.email} </span>

      <Form onSubmit={formik.handleSubmit}>
        <Form.Group widths="equal">
          <Form.Input
            name="email"
            placeholder="Nuevo email"
            onChange={formik.handleChange}
            value={formik.values.email}
            error={formik.errors.email}
          />
          <Form.Input
            name="repeatEmail"
            placeholder="Confirma tu nuevo email"
            onChange={formik.handleChange}
            value={formik.values.repeatEmail}
            error={formik.errors.repeatEmail}
          />
        </Form.Group>
        <Button type="submit" className="submit" loading={loading}>
          Actualizar
        </Button>
      </Form>
    </div>
  );
}

function initialValues() {
  return {
    email: "",
    repeatEmail: ""
  };
}

function validationSchema() {
  return {
    email: Yup.string()
      .email(true)
      .required(true)
      .oneOf([Yup.ref("repeatEmail")], true),
    repeatEmail: Yup.string()
      .email(true)
      .required(true)
      .oneOf([Yup.ref("email")], "El email no es igual, intentelo de nuevo")
  };
}
