import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "./homepage.css";
export default function HomePage() {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      slidesToSlide: 1, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
  };
  return (
    <>
      <div className="banner-img">
        <img src="/images/banner.png" alt="banner img" />
      </div>
      <section className="main">
        <div className="text-content">
          <h1>B.Zero1 jewelry</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam,
            ipsum sapiente aspernatur libero repellat quis consequatur ducimus
            quam nisi exercitationem omnis earum qui.
          </p>
          <a href="#" className="hollow-button">
            DISCOVER JEWELRY
          </a>
          <a href="#" className="hollow-button">
            FIND YOUR B.ZERO1
          </a>
        </div>
      </section>
      <section className="must-have-section">
        <h2>must have icons</h2>
        <div className="grid-slide">
          <Carousel
            responsive={responsive}
            autoPlay={true}
            swipeable={true}
            draggable={true}
            infinite={true}
            transitionDuration={500}
            removeArrowOnDeviceType={["desktop", "mobile"]}
            itemClass="carousel-item-padding-40-px"
          >
            <div className="custom-carousel-item">
              <div className="carousel-img-container">
                <img src="/images/diamond_rings.png" alt="carousel-item" />
              </div>
              <p>B.ZERO1 rings</p>
            </div>
            <div className="custom-carousel-item">
              <div className="carousel-img-container">
                <img src="/images/diamond_rings.png" alt="carousel-item" />
              </div>
              <p>B.ZERO1 rings</p>
            </div>
            <div className="custom-carousel-item">
              <div className="carousel-img-container">
                <img src="/images/diamond_rings.png" alt="carousel-item" />
              </div>
              <p>B.ZERO1 rings</p>
            </div>
            <div className="custom-carousel-item">
              <div className="carousel-img-container">
                <img src="/images/diamond_rings.png" alt="carousel-item" />
              </div>
              <p>B.ZERO1 rings</p>
            </div>
          </Carousel>
        </div>
      </section>
    </>
  );
}
