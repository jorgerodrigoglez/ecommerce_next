import React, { useState } from "react";
import { Image, Modal } from "semantic-ui-react";
//yarn add react-slick
import Slider from "react-slick";
//lodash
import { map } from "lodash";

// configuracion de screenshots
const settings = {
  className: "carousel-screenshots",
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 2,
  swipeToSlider: true
};

export default function CarouselScreenshots(props) {
  const { title, screenshots } = props;
  //console.log(props);
  const [showModal, setShowModal] = useState(false);
  const [urlImage, setUrlImage] = useState(null);

  const openImage = url => {
    setUrlImage(url);
    setShowModal(true);
  };

  return (
    <>
      <h2>Imágenes:</h2>
      <Slider {...settings}>
        {map(screenshots, screenshot => (
          <Image
            key={screenshot.id}
            src={screenshot.url}
            alt={screenshot.name}
            //onClick={() => console.log("Abrir imagen")}
            onClick={() => openImage(screenshot.url)}
          />
        ))}
      </Slider>

      <Modal open={showModal} onClose={() => setShowModal(false)} size="large">
        <Image src={urlImage} alt={title} />
      </Modal>
    </>
  );
}
