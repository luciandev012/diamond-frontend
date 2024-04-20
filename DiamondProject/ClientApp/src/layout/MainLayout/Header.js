import React, { useEffect, useState } from "react";
import "./header.css";
import SubMenuByCategory from "../../components/SubMenuByCategory";
import { useDispatch, useSelector } from "react-redux";
import { getRingCategories } from "../../actions/ring";
import { Link, useNavigate } from "react-router-dom";

const listMenu = [
  {
    id: 0,
    text: "Nhẫn tự chế tác",
    path: "",
    subMenu: [
      {
        id: 0,
        text: "Wedding rings",
        path: "",
      },
      {
        id: 1,
        text: "Couple rings",
        path: "",
      },
      {
        id: 2,
        text: "Custom rings",
        path: "",
      },
    ],
  },
  {
    id: 1,
    text: "Nhẫn hãng",
    path: "",
    subMenu: [],
  },
  {
    id: 2,
    text: "Lắc tay",
    path: "",
    subMenu: [],
  },
  {
    id: 3,
    text: "Dây chuyền",
    path: "",
    subMenu: [],
  },
  {
    id: 4,
    text: "Khuyên tai",
    path: "",
    subMenu: [],
  },
  {
    id: 5,
    text: "Chế độ thu đổi",
    path: "",
    subMenu: [],
  },
];

const Search = ({ mobile }) => {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState("");
  const handleSubmitSearch = (e) => {
    e.preventDefault();
    keyword !== "" && navigate(`/search/${keyword}`, { replace: true });
    setKeyword("");
  };
  return (
    <div className={`search-container ${mobile && "mb"}`}>
      <span>
        <i className="fa-solid fa-magnifying-glass"></i>
      </span>
      <form className="d-flex" onSubmit={(e) => handleSubmitSearch(e)}>
        <input
          className="search-input"
          type="search"
          placeholder="Nhập tên sản phẩm"
          aria-label="Search"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
      </form>
    </div>
  );
};

export default function Header() {
  const ringCategories = useSelector((state) => state.ringCategory);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getRingCategories());
  }, []);

  const [navigatonActive, setNavigationActive] = useState(-1);

  const handleNavigationActive = (index) => {
    if (navigatonActive === index) {
      setNavigationActive(-1);
    } else {
      setNavigationActive(index);
    }
  };

  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-light">
        <div className="container-fluid">
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
                <Search />
              </li>
            </ul>
            {/* <div>
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
            </div> */}
          </div>
        </div>
      </nav>
      <div className="custom-toggle">
        <input
          type="checkbox"
          className="custom-toggle-checkbox"
          id="custom-toggle"
        />
        <label htmlFor="custom-toggle" className="custom-toggle-button">
          <span className="custom-toggle-icon">&nbsp;</span>
        </label>
        <div className="custom-toggle-bg">&nbsp;</div>
        <nav className="navigation-nav">
          <ul className="navigation-list">
            {listMenu.map((menu) => {
              return (
                <li
                  className={`navigation-item ${
                    navigatonActive === menu.id ? "active" : ""
                  }`}
                  onClick={() => handleNavigationActive(menu.id)}
                  key={menu.id}
                >
                  <Link to={menu.path} className="navigation-link">
                    {menu.text}
                  </Link>
                  <i className="fa-solid fa-angle-right"></i>
                  <ul className="sub-navigation-list">
                    {menu.subMenu.map((sub) => {
                      return (
                        <li key={sub.id}>
                          <Link to={sub.path}>{sub.text}</Link>
                        </li>
                      );
                    })}
                  </ul>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
      <div className="logo-container">
        <Link to={"/"} className="logo-img text-logo">
          kim cương như an
        </Link>
      </div>
      <div className="header-bottom">
        <ul className="header-menu">
          <li className="menu-item">
            nhẫn tự chế tác
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
                        Theo bộ sưu tập
                      </a>{" "}
                      |<a className="view-all"> XEM TẤT CẢ</a>
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
          <li className="menu-item">Nhẫn hãng</li>
          <li className="menu-item">Lắc tay</li>
          <li className="menu-item">dây chuyền</li>
          <li className="menu-item">Khuyên tai</li>
          <li className="menu-item">chế độ thu đổi</li>
        </ul>
        <div className="mobile-search">
          <Search mobile={true} />
        </div>
      </div>
    </header>
  );
}
