/* eslint-disable react/prop-types */
import { useState } from "react";
import "./slider.scss";

export default function Slider({ images }) {
  const [imageIndex, setImageIndex] = useState(null);

  //desactiva el scroll si esta abierto el fullSlider
  if (imageIndex !== null) {
    document.body.style.overflowY = "hidden";
    window.scrollTo(0, 0);
  } else {
    document.body.style.overflowY = "scroll";
  }

  const changeSlide = (direction) => {
    if (direction === "left") {
      if (imageIndex === 0) {
        setImageIndex(images.length - 1);
      } else {
        setImageIndex(imageIndex - 1);
      }
    } else {
      if (imageIndex === images.length - 1) {
        setImageIndex(0);
      } else {
        setImageIndex(imageIndex + 1);
      }
    }
  };

  return (
    <div className="slider">
      {imageIndex !== null && (
        <div className="fullSlider">
          <div className="arrow" onClick={() => changeSlide("left")}>
            <img src="/arrow.png" alt="arrow" />
          </div>
          <div className="imgContainer">
            <img src={images[imageIndex]} alt="img" />
          </div>
          <div className="arrow" onClick={() => changeSlide("right")}>
            <img src="/arrow.png" alt="arrow" className="right" />
          </div>
          <div className="close" onClick={() => setImageIndex(null)}>
            X
          </div>
        </div>
      )}
      <div className="bigImage">
        <img
          src={images[0]}
          alt="portada"
          onClick={() => {
            setImageIndex(0);
          }}
        />
      </div>
      <div className="smallImages">
        {images.slice(1).map((image, index) => {
          //solo muestro 3 imagenes pequeñas
          if (index < 3) {
            return (
              <img
                src={image}
                alt=""
                key={index}
                onClick={() => {
                  setImageIndex(index + 1);
                }}
              />
            );
          }
        })}
      </div>
    </div>
  );
}
