import React from "react";

export default function HomePage() {
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
          <img src="/images/must-have.png" alt="" />
        </div>
      </section>
      <div className="social-network">
        <div className="follow">
          <span className="social-text">Follow us</span>
          <span className="social-icon">
            <a href="#">
              <i className="fa-brands fa-facebook-f"></i>
            </a>
          </span>
          <span className="social-icon">
            <a href="#">
              <i className="fa-brands fa-instagram"></i>
            </a>
          </span>
          <span className="social-icon">
            <a href="#">
              <i className="fa-brands fa-youtube"></i>
            </a>
          </span>
          <span className="social-icon">
            <a href="#">
              <i className="fa-brands fa-linkedin"></i>
            </a>
          </span>
        </div>
      </div>
    </>
  );
}
