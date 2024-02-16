import React, { useEffect, useState } from "react";
import "./custom-carousel.css";
import { getImage } from "../../apis/image";
import { getImgUrl } from "../../helper/helper";

export default function CustomCarousel({ images }) {
  const [activeItem, setActiveItem] = useState(0);

  const hanldeSlide = (direction) => {
    const imageList = document.querySelector(".image-list");

    const slideAmount = imageList.clientWidth * direction;
    imageList.scrollBy({ top: slideAmount, behavior: "smooth" });
    setActiveItem((prev) => {
      return prev + direction;
    });
  };

  const handleClickImage = (index) => {
    setActiveItem(index);
  };

  return (
    <div className="thumbnail-image">
      <div className="cus-carousel-container">
        <div className="slider-wrapper">
          <button
            id="prev-slide"
            className={`slider-button material-symbols-rounded${
              activeItem === 0 ? " disable" : ""
            }`}
            onClick={() => hanldeSlide(-1)}
            disabled={activeItem === 0}
          >
            <i className="fa-solid fa-chevron-up"></i>
          </button>
          <div className="image-list">
            {images
              ? images.map((img, index) => {
                  return (
                    <img
                      src={getImgUrl(img.path)}
                      alt="img-1"
                      className={`image-item${
                        activeItem === index ? " active" : ""
                      }`}
                      onClick={() => handleClickImage(index)}
                      key={index}
                    />
                  );
                })
              : null}
          </div>
          <button
            id="next-slide"
            className={`slider-button material-symbols-rounded${
              activeItem === images.length - 1 ? " disable" : ""
            }`}
            onClick={() => hanldeSlide(1)}
            disabled={activeItem === images.length - 1}
          >
            <i className="fa-solid fa-chevron-down"></i>
          </button>
        </div>
      </div>
      <div className="main-image-container">
        <img src={getImgUrl(images[activeItem].path)} alt="thumb" />
      </div>
    </div>
  );
}
