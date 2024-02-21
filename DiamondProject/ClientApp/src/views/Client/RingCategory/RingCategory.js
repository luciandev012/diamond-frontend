import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getRingCategory } from "../../../actions/ring";
import Loading from "../../../components/Loading/Loading";
import "./ring-category.css";
import { Icon } from "@iconify/react";
import { Checkbox } from "@mui/material";
import { formatMoney } from "../../../helper/helper";

export default function RingCategory() {
  const params = useParams();
  const dispatch = useDispatch();
  const [category, setCategory] = useState(null);
  const [toggleArrow, setToggleArrow] = useState(false);
  const [filter, setFilter] = useState(0);
  //const [productWidth, setProductWidth] = useState("initial");
  useEffect(() => {
    const fetchCategory = async () => {
      let temp = await dispatch(getRingCategory(params.id));
      setCategory(temp);
    };
    // const resizeWindows = () => {
    //   let curWidth = document.getElementById("product");
    //   let width = curWidth.clientWidth + "px";
    //   setProductWidth(width);
    // };
    // window.addEventListener("load", resizeWindows);
    // window.addEventListener("resize", resizeWindows);
    fetchCategory();
  }, [params]);

  const handleClickSlideDescription = () => {
    setToggleArrow(!toggleArrow);
  };
  const handleChange = () => {};

  return category ? (
    <section className="">
      <div className="follow">
        <div className="bread-crumb">bread crumb</div>
        <div className="category-title">
          <h3 className="category-name">{category.name}</h3>
          <button
            onClick={handleClickSlideDescription}
            id="slideMenu"
            className={toggleArrow ? "active" : ""}
          >
            <Icon icon="icons8:angle-down" fontSize={25} />
          </button>
        </div>
        <div className={`category-description ${toggleArrow ? "active" : ""}`}>
          <p>{category.description}</p>
        </div>
        <div className="category-container"></div>
      </div>
      <div className="cate-filter-container">
        <div className="cate-filter follow">
          <div className="filter">
            <span>
              <Icon icon="mi:filter" fontSize={25} /> Lọc:{" "}
            </span>
            <span>
              Category{" "}
              <button
                onClick={() => setFilter((prev) => (prev !== 1 ? 1 : 0))}
                id="slideMenu"
                className={filter === 1 ? "active" : ""}
              >
                <Icon icon="icons8:angle-down" fontSize={25} />
              </button>
            </span>
            <span>
              Material{" "}
              <button
                onClick={() => setFilter((prev) => (prev !== 2 ? 2 : 0))}
                id="slideMenu"
                className={filter === 2 ? "active" : ""}
              >
                <Icon icon="icons8:angle-down" fontSize={25} />
              </button>
            </span>
            <span>
              Collection{" "}
              <button
                onClick={() => setFilter((prev) => (prev !== 3 ? 3 : 0))}
                id="slideMenu"
                className={filter === 3 ? "active" : ""}
              >
                <Icon icon="icons8:angle-down" fontSize={25} />
              </button>
            </span>
          </div>
          <div className="sort">
            <span>Sắp xếp: </span>
            <select>
              <option>Giá từ thấp đến cao</option>
              <option>Giá từ cao đến thấp</option>
              <option>Hàng mới về</option>
            </select>
          </div>
        </div>
      </div>
      <div>
        <div className={`filter-option follow ${filter !== 0 ? "active" : ""}`}>
          <div className="option">
            <div className="option-item">
              <Checkbox
                checked={false}
                onChange={handleChange}
                inputProps={{ "aria-label": "controlled" }}
              />{" "}
              Plantinum
            </div>
            <div className="option-item">
              <Checkbox
                checked={false}
                onChange={handleChange}
                inputProps={{ "aria-label": "controlled" }}
              />{" "}
              Gold
            </div>
            <div className="option-item">
              <Checkbox
                checked={false}
                onChange={handleChange}
                inputProps={{ "aria-label": "controlled" }}
              />{" "}
              Silver
            </div>
          </div>
        </div>
      </div>
      <div className="follow list-product row">
        {category.rings.map((ring) => {
          return (
            <div className="col-md-3 product" id="product" key={ring.ringId}>
              <img
                src="/images/diamond_rings.png"
                alt="img"
                className="card-product card-product-front"
                id={ring.ringId}
              />
              <div className="card-product card-product-back">
                <div className="back-content">
                  <h5>{ring.ringName}</h5>
                  <p className="back-title">Giá</p>
                  <p>{formatMoney(ring.price)}</p>
                  <p className="back-title">Chất liệu</p>
                  <p>{ring.material}</p>
                </div>
                <button className="discover-button">Xem chi tiết</button>
              </div>
              <Link
                className="absolute-link"
                to={`/detail-product/${ring.ringId}`}
              />
            </div>
          );
        })}
      </div>
    </section>
  ) : (
    <Loading />
  );
}
