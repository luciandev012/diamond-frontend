import React, { useEffect } from "react";
import "./header.css";
import SubMenuByCategory from "../../components/SubMenuByCategory";
import { useDispatch, useSelector } from "react-redux";
import { getRingCategories } from "../../actions/ring";

export default function Header() {
  const ringCategories = useSelector((state) => state.ringCategory);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getRingCategories());
  }, []);
  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-light">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo02"
            aria-controls="navbarTogglerDemo02"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#">
                  <i className="fa-solid fa-location-dot"></i> Find a store
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  <i className="fa-solid fa-bell-concierge"></i> Services
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  <i className="fa-solid fa-headphones-simple"></i> Contact us
                </a>
              </li>
              <li className="nav-item">
                <div className="search-container">
                  <span>
                    <i className="fa-solid fa-magnifying-glass"></i>
                  </span>
                  <form className="d-flex">
                    <input
                      className="search-input"
                      type="search"
                      placeholder="Search"
                      aria-label="Search"
                    />
                  </form>
                </div>
              </li>
            </ul>
            <div>
              <a className="header-right-item">
                <i className="fa-regular fa-envelope"></i> Newsletter
              </a>
              <a className="header-right-item">
                <i className="fa-regular fa-user"></i> My account
              </a>
              <a className="header-right-item">
                <i className="fa-solid fa-bag-shopping"></i> My shopping cart
              </a>
              <a className="header-right-item">
                <i className="fa-regular fa-heart"></i> My wishlist
              </a>
            </div>
          </div>
        </div>
      </nav>
      <div className="logo-container">
        <a className="logo-img text-logo">BULGARI</a>
      </div>
      <div className="header-bottom">
        <ul className="header-menu">
          <li className="menu-item">high jewelry</li>
          <li className="menu-item">jewelry</li>
          <li className="menu-item">
            engagement & wedding
            <div className="sub-menu">
              <div className="sub-menu-container">
                <div className="sub-menu-left">
                  {ringCategories ? (
                    <SubMenuByCategory
                      menu={"ring-category"}
                      subMenu={ringCategories}
                    />
                  ) : null}
                  <div className="sub-menu-by-type">
                    <p className="type-row">
                      <a href="#" className="type">
                        BY COLLECTION
                      </a>{" "}
                      |<a className="view-all"> View All</a>
                    </p>
                    <div className="sub-menu-items">
                      <div className="img-item">
                        <img src="/images/diamond_rings.png" alt="Infinito" />
                        <p>Infinito</p>
                      </div>
                      <div className="img-item">
                        <img src="/images/diamond_rings.png" alt="Infinito" />
                        <p>Infinito</p>
                      </div>
                      <div className="img-item">
                        <img src="/images/diamond_rings.png" alt="Infinito" />
                        <p>Infinito</p>
                      </div>
                      <div className="img-item">
                        <img src="/images/diamond_rings.png" alt="Infinito" />
                        <p>Infinito</p>
                      </div>
                      <div className="img-item">
                        <img src="/images/diamond_rings.png" alt="Infinito" />
                        <p>Infinito</p>
                      </div>
                      <div className="img-item">
                        <img src="/images/diamond_rings.png" alt="Infinito" />
                        <p>Infinito</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="sub-menu-right">
                  <div className="guide">
                    <p>guide to bvlgari diamonds</p>
                    <ul className="guides">
                      <li className="guide-item">
                        <a>Diamond Carrat weight</a>
                      </li>
                      <li className="guide-item">
                        <a>Diamon Clarity</a>
                      </li>
                      <li className="guide-item">
                        <a>Diamond Color</a>
                      </li>
                      <li className="guide-item">
                        <a>Diamond Cut</a>
                      </li>
                      <li className="guide-item">
                        <a>Responsible Sourcing</a>
                      </li>
                      <li className="guide-item">
                        <a>The GIA Certificate</a>
                      </li>
                    </ul>
                  </div>
                  <div className="discover">
                    <p>BRIDAL jewelry</p>
                    <p>
                      <button className="discover-button">
                        Discover the creation
                      </button>
                    </p>
                    <p>
                      <button className="discover-button">
                        Discover the collection
                      </button>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </li>
          <li className="menu-item">watches</li>
          <li className="menu-item">bags and accessories</li>
          <li className="menu-item">fragrances</li>
          <li className="menu-item">gifts</li>
          <li className="menu-item">the maison</li>
        </ul>
      </div>
    </header>
  );
}
