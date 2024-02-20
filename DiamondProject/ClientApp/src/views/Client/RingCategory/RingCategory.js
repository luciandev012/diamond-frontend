import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getRingCategory } from "../../../actions/ring";
import Loading from "../../../components/Loading/Loading";
import "./ring-category.css";
import { Icon } from "@iconify/react";
import { Checkbox } from "@mui/material";

export default function RingCategory() {
  const params = useParams();
  const dispatch = useDispatch();
  const [category, setCategory] = useState(null);
  const [toggleArrow, setToggleArrow] = useState(false);
  const [productWidth, setProductWidth] = useState("initial");
  useEffect(() => {
    const fetchCategory = async () => {
      let temp = await dispatch(getRingCategory(params.id));
      setCategory(temp);
    };
    fetchCategory();
  }, [params]);

  const handleClickSlideDescription = () => {
    setToggleArrow(!toggleArrow);
  };
  const handleChange = () => {};
  const hover = () => {
    let curWidth = document.getElementById("product");
    let width = curWidth.clientWidth + "px";
    setProductWidth(width);
    console.log(width);
  };
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
              Category <Icon icon="icons8:angle-down" fontSize={25} />
            </span>
            <span>
              Material <Icon icon="icons8:angle-down" fontSize={25} />
            </span>
            <span>
              Collection <Icon icon="icons8:angle-down" fontSize={25} />
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
        <div className="filter-option follow">
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
                className="product-image"
                onMouseEnter={hover}
              />
              <div className="product-detail" style={{ width: productWidth }}>
                <h5>{ring.ringName}</h5>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  ) : (
    <Loading />
  );
}
