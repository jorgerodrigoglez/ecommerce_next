import React, { useState } from "react";
import { Image, Icon } from "semantic-ui-react";
import Link from "next/link";
// momment
import moment from "moment";
import "moment/locale/es";
// components
import BasicModal from "../../Modal/BasicModal";

export default function Order(props) {
  const { order } = props;
  //console.log(order);
  const { product, totalPayment, createdAt, addressShipping } = order;
  const { title, poster, url } = product;
  // estado de ventana modal
  const [showModal, setShowModal] = useState(false);
  //console.log(showModal);

  return (
    <>
      <div className="order">
        <div className="order__info">
          <div className="order__info__data">
            <Link href={`/${url}`}>
              <a>
                <Image src={poster.url} alt={title} />
              </a>
            </Link>
            <div>
              <h2>{title}</h2>
              <p>{totalPayment}</p>
            </div>
          </div>
          <div className="order__other">
            <p className="order__other--date">
              {moment(createdAt).format("L")} - {moment(createdAt).format("LT")}
            </p>
            <Icon name="eye" circular link onClick={() => setShowModal(true)} />
          </div>
        </div>
      </div>

      <AddressModal
        showModal={showModal}
        setShowModal={setShowModal}
        addressShipping={addressShipping}
        title={title}
      />
    </>
  );
}

function AddressModal(props) {
    const { showModal, setShowModal, addressShipping, title } = props;
    console.log(addressShipping, title);
  
    return (
      <BasicModal
        showModal={showModal}
        setShowModal={setShowModal}
        size="tiny"
        title={title}
      >
        <h3>El pedido se ha enviado a la siguiente dirección:</h3>
        <div>
          <p>{addressShipping.name}</p>
          <p>{addressShipping.address}</p>
          <p>{addressShipping.state}, {addressShipping.city}  <p>C.P: {addressShipping.postalCode}</p></p>
        </div>
        <p>Phone: {addressShipping.phone}</p>
      </BasicModal>
    );
  }
