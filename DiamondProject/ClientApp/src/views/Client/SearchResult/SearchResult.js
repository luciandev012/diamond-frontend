import { Icon } from "@iconify/react/dist/iconify.js";
import { Checkbox } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../../helper/axios";
import Loading from "../../../components/Loading/Loading";
import ListRingFilter from "../RingCategory/ListRingFilter";

export default function SearchResult() {
  const params = useParams();
  const [results, setResults] = useState([]);
  useEffect(() => {
    const search = async () => {
      const { data } = await axiosInstance.get(`/search/${params.keyword}`);
      setResults(data);
    };
    search();
  }, [params.keyword]);
  console.log(params.keyword);
  return results ? (
    <section className="">
      <div className="follow">
        <div className="category-title">
          <h3 className="category-name">Tìm kiếm</h3>
          {/* <button
          onClick={handleClickSlideDescription}
          id="slideMenu"
          className={toggleArrow ? "active" : ""}
        >
          <Icon icon="icons8:angle-down" fontSize={25} />
        </button> */}
        </div>
        <div className="bread-crumb">
          Hiển thị kết quả cho: {params.keyword}
        </div>
        {/* <div className={`category-description ${toggleArrow ? "active" : ""}`}>
        <p>{category.description}</p>
      </div> */}
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
              {/* <button
              onClick={() => setFilter((prev) => (prev !== 1 ? 1 : 0))}
              id="slideMenu"
              className={filter === 1 ? "active" : ""}
            >
              <Icon icon="icons8:angle-down" fontSize={25} />
            </button> */}
            </span>
            <span>
              Chất liệu{" "}
              {/* <button
              onClick={() => setFilter((prev) => (prev !== 2 ? 2 : 0))}
              id="slideMenu"
              className={filter === 2 ? "active" : ""}
            >
              <Icon icon="icons8:angle-down" fontSize={25} />
            </button> */}
            </span>
            {/* <span>
        Bộ sưu tập{" "}
        <button
          onClick={() => setFilter((prev) => (prev !== 3 ? 3 : 0))}
          id="slideMenu"
          className={filter === 3 ? "active" : ""}
        >
          <Icon icon="icons8:angle-down" fontSize={25} />
        </button>
      </span> */}
          </div>
          <div className="sort">
            <span>Sắp xếp: </span>
            {/* <select onChange={handleChangeSort} value={arrange}>
            {listArrange.map((item, index) => {
              return (
                <option value={item.value} key={index}>
                  {item.text}
                </option>
              );
            })}
          </select> */}
          </div>
        </div>
      </div>
      <div className="relative-filter">
        <div className="selected-filter-list">
          {/* {selectedMadeIn.length > 0
          ? selectedMadeIn.map((select, index) => {
              return (
                <span className="selected-filter" key={index}>
                  <button onClick={() => handleDeleteMadeIn(select)}>
                    ✖️
                  </button>
                  &nbsp;{select}
                </span>
              );
            })
          : null}
        {selectedMaterial.length > 0
          ? selectedMaterial.map((select, index) => {
              return (
                <span className="selected-filter" key={index}>
                  <button onClick={() => handleDeleteMaterial(select)}>
                    ✖️
                  </button>
                  &nbsp;{select}
                </span>
              );
            })
          : null} */}
        </div>
        <div className={`filter-option`}>
          <div className="option">
            {/* {madeIn && filter === 1
            ? madeIn.map((mi, index) => {
                return (
                  <div key={index} className="option-item">
                    <Checkbox
                      checked={selectedMadeIn.includes(mi[0])}
                      onChange={(e) => handleCheckMadeIn(mi, e)}
                      inputProps={{ "aria-label": "controlled" }}
                    />{" "}
                    {`${mi[0]} (${mi[1]})`}
                  </div>
                );
              })
            : null} */}
            {/* {material && filter === 2
            ? material.map((ma, index) => {
                return (
                  <div key={index} className="option-item">
                    <Checkbox
                      checked={selectedMaterial.includes(ma[0])}
                      onChange={(e) => handleCheckMaterial(ma, e)}
                      inputProps={{ "aria-label": "controlled" }}
                    />{" "}
                    {`${ma[0]} (${ma[1]})`}
                  </div>
                );
              })
            : null} */}
          </div>
        </div>
      </div>
      <div className="follow list-product row">
        <ListRingFilter rings={results} />
      </div>
    </section>
  ) : (
    <Loading />
  );
}
