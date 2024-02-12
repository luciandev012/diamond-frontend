import React, { useState } from "react";
import "./custom-carousel.css";

export default function CustomCarousel() {
  const [activeItem, setActiveItem] = useState([0]);
  const hanldeSlide = (direction) => {
    const imageList = document.querySelector(".image-list");

    const slideAmount = imageList.clientWidth * direction;
    console.log(slideAmount);
    imageList.scrollBy({ top: slideAmount, behavior: "smooth" });
  };
  return (
    <div className="cus-carousel-container">
      <div className="slider-wrapper">
        <button
          id="prev-slide"
          className="slider-button material-symbols-rounded"
          onClick={() => hanldeSlide(-1)}
        >
          <i className="fa-solid fa-chevron-up"></i>
        </button>
        <div className="image-list">
          <img
            src="/images/diamond_rings.png"
            alt="img-1"
            className="image-item active"
          />
          <img src="/images/img_test.png" alt="img-2" className="image-item" />
          <img
            src="/images/diamond_rings.png"
            alt="img-1"
            className="image-item"
          />
          <img src="/images/img_test.png" alt="img-2" className="image-item" />
        </div>
        <button
          id="next-slide"
          className="slider-button material-symbols-rounded"
          onClick={() => hanldeSlide(1)}
        >
          <i className="fa-solid fa-chevron-down"></i>
        </button>
      </div>
    </div>
  );
}
