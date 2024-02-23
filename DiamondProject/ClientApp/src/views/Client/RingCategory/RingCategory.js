import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getRingCategory } from "../../../actions/ring";
import Loading from "../../../components/Loading/Loading";
import "./ring-category.css";
import { Icon } from "@iconify/react";
import { Checkbox } from "@mui/material";
import { formatMoney } from "../../../helper/helper";
import ListRingFilter from "./ListRingFilter";

export default function RingCategory() {
  const params = useParams();
  const dispatch = useDispatch();
  const [category, setCategory] = useState(null);
  const [toggleArrow, setToggleArrow] = useState(false);
  const [filter, setFilter] = useState(0);
  const [madeIn, setMadeIn] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState([]);
  //const [productWidth, setProductWidth] = useState("initial");
  useEffect(() => {
    const fetchCategory = async () => {
      let temp = await dispatch(getRingCategory(params.id));
      let madeInFlag = {};
      temp.rings.forEach((ring) => {
        if (madeInFlag[ring.madeIn] !== undefined) {
          madeInFlag[ring.madeIn]++;
        } else {
          madeInFlag[ring.madeIn] = 1;
        }
      });
      console.log(madeInFlag);
      setMadeIn(Object.entries(madeInFlag));

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
  const handleCheckMadeIn = (mi) => {
    setSelectedFilter((prev) => [...prev, mi]);
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
              Xuất sứ{" "}
              <button
                onClick={() => setFilter((prev) => (prev !== 1 ? 1 : 0))}
                id="slideMenu"
                className={filter === 1 ? "active" : ""}
              >
                <Icon icon="icons8:angle-down" fontSize={25} />
              </button>
            </span>
            <span>
              Chất liệu{" "}
              <button
                onClick={() => setFilter((prev) => (prev !== 2 ? 2 : 0))}
                id="slideMenu"
                className={filter === 2 ? "active" : ""}
              >
                <Icon icon="icons8:angle-down" fontSize={25} />
              </button>
            </span>
            <span>
              Bộ sưu tập{" "}
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
            {selectedFilter.length > 0
              ? selectedFilter.map((select, index) => {
                  return (
                    <span className="selected-filter" key={index}>
                      <button>✖️</button>&nbsp;{select[0]}
                    </span>
                  );
                })
              : madeIn
              ? madeIn.map((mi, index) => {
                  return (
                    <div key={index} className="option-item">
                      <Checkbox
                        checked={false}
                        onChange={() => handleCheckMadeIn(mi)}
                        inputProps={{ "aria-label": "controlled" }}
                      />{" "}
                      {`${mi[0]} (${mi[1]})`}
                    </div>
                  );
                })
              : null}
          </div>
        </div>
      </div>
      <div className="follow list-product row">
        <ListRingFilter rings={category.rings} />
      </div>
    </section>
  ) : (
    <Loading />
  );
}
