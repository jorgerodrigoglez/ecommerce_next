import React, { useState } from "react";
import { Form, Button } from "semantic-ui-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import useAuth from "../../../hooks/useAuth";
import { createAddressApi, updateAddressApi } from "../../../api/address";
import { toast } from "react-toastify";

export default function AddressForm(props) {
  // props de account
  const { setShowModal, setRealoadAddresses, newAddress, address } = props;
  // estado del loading
  const [loading, setLoading] = useState(false);
  // context global de la app
  const { auth, logout } = useAuth();

  const formik = useFormik({
    initialValues: initialValues(address),
    validationSchema: Yup.object(validationSchema()),
    onSubmit: formData => {
      //console.log(formData);
      //createAddress(formData);
      // actualizar dirección
      /*if(newAddress){
            console.log("Creando dirección");
          }else{
            console.log("actualizando dirección");
        }*/
      newAddress ? createAddress(formData) : updateAddress(formData);
    }
  });

  // crea la direccion y la envia a strapi
  const createAddress = async formData => {
    setLoading(true);
    //console.log(formData);
    const formDataTemp = {
      ...formData,
      users_permissions_user: auth.idUser
    };
    //console.log(formDataTemp);
    const response = await createAddressApi(formDataTemp, logout);

    if (!response) {
      toast.warning("Error al crear la dirección");
      setLoading(false);
    } else {
      formik.resetForm();
      setRealoadAddresses(true);
      setLoading(false);
      setShowModal(false);
    }

    setLoading(false);
  };

  // actualizar direccion y la envía a strapi
  const updateAddress = formData => {
    //console.log("Actualizando dirección")
    //console.log(formData)
    setLoading(true);
    const formDataTemp = {
      ...formData,
      users_permissions_user: auth.idUser
    };
    const response = updateAddressApi(address._id, formDataTemp, logout);

    if (!response) {
      toast.warning("Error al actualizar la direccion");
      setLoading(false);
    } else {
      formik.resetForm();
      setRealoadAddresses(true);
      setLoading(false);
      setShowModal(false);
    }
  };

  return (
    <div>
      <Form onSubmit={formik.handleSubmit}>
        <Form.Input
          name="title"
          type="text"
          label="Título de la dirección"
          placeholder="Título de la dirección"
          onChange={formik.handleChange}
          value={formik.values.title}
          error={formik.errors.title}
        />

        <Form.Group widths="equal">
          <Form.Input
            name="name"
            type="text"
            label="Nombre y apellidos"
            placeholder="Nombre y apellidos"
            onChange={formik.handleChange}
            value={formik.values.name}
            error={formik.errors.name}
          />
          <Form.Input
            name="address"
            type="text"
            label="Dirección"
            placeholder="Dirección"
            onChange={formik.handleChange}
            value={formik.values.address}
            error={formik.errors.address}
          />
        </Form.Group>

        <Form.Group widths="equal">
          <Form.Input
            name="city"
            type="text"
            label="Ciudad"
            placeholder="Ciudad"
            onChange={formik.handleChange}
            value={formik.values.city}
            error={formik.errors.city}
          />
          <Form.Input
            name="state"
            type="text"
            label="Estado/Provincia/Región"
            placeholder="Estado/Provincia/Región"
            onChange={formik.handleChange}
            value={formik.values.state}
            error={formik.errors.state}
          />
        </Form.Group>
        <Form.Group widths="equal">
          <Form.Input
            name="postalCode"
            type="text"
            label="Código Postal"
            placeholder="Código Postal"
            onChange={formik.handleChange}
            value={formik.values.postalCode}
            error={formik.errors.postalCode}
          />
          <Form.Input
            name="phone"
            type="text"
            label="Número de teléfono"
            placeholder="Número de teléfono"
            onChange={formik.handleChange}
            value={formik.values.phone}
            error={formik.errors.phone}
          />
        </Form.Group>
        <div className="actions">
          <Button className="submit" type="submit" loading={loading}>
            {newAddress ? "Create" : "Update"}
          </Button>
        </div>
      </Form>
    </div>
  );
}

function initialValues(address) {
  return {
    title: address?.title || "",
    name: address?.name || "",
    address: address?.address || "",
    city: address?.city || "",
    state: address?.state || "",
    postalCode: address?.postalCode || "",
    phone: address?.phone || ""
  };
}

function validationSchema() {
  return {
    title: Yup.string().required(true),
    name: Yup.string().required(true),
    address: Yup.string().required(true),
    city: Yup.string().required(true),
    state: Yup.string().required(true),
    postalCode: Yup.string().required(true),
    phone: Yup.string().required(true)
  };
}
