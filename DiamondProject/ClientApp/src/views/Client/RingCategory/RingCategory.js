import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getRingCategory } from "../../../actions/ring";
import Loading from "../../../components/Loading/Loading";
import "./ring-category.css";
import { Icon } from "@iconify/react";
import { Checkbox } from "@mui/material";
import ListRingFilter from "./ListRingFilter";

export default function RingCategory() {
  const params = useParams();
  const dispatch = useDispatch();
  const [category, setCategory] = useState(null);
  const [rings, setRings] = useState([]);
  const [toggleArrow, setToggleArrow] = useState(false);
  const [filter, setFilter] = useState(0);

  const [madeIn, setMadeIn] = useState([]);
  const [selectedMadeIn, setSelectedMadeIn] = useState([]);

  const [material, setMaterial] = useState([]);
  const [selectedMaterial, setSelectedMaterial] = useState([]);

  const [arrange, setArrange] = useState(0);
  const listArrange = [
    { value: 0, text: "-- Chọn tiêu chí --" },
    { value: 1, text: "Giá tăng dần" },
    { value: 2, text: "Giá giảm dần" },
  ];
  //const [productWidth, setProductWidth] = useState("initial");
  useEffect(() => {
    const fetchCategory = async () => {
      let temp = await dispatch(getRingCategory(params.id));

      // setMadeInArray
      let madeInFlag = {};
      temp.rings.forEach((ring) => {
        if (madeInFlag[ring.madeIn] !== undefined) {
          madeInFlag[ring.madeIn]++;
        } else {
          madeInFlag[ring.madeIn] = 1;
        }
      });
      setMadeIn(Object.entries(madeInFlag));

      // setMaterialArray
      let materialFlag = {};
      temp.rings.forEach((ring) => {
        if (materialFlag[ring.material] !== undefined) {
          materialFlag[ring.material]++;
        } else {
          materialFlag[ring.material] = 1;
        }
      });
      setMaterial(Object.entries(materialFlag));

      setCategory(temp);
      setRings(temp.rings);
    };

    fetchCategory();
  }, [params]);

  useEffect(() => {
    filterBySelected();
  }, [selectedMadeIn, selectedMaterial]);

  const handleClickSlideDescription = () => {
    setToggleArrow(!toggleArrow);
  };
  const handleCheckMadeIn = (mi, e) => {
    setFilter(0);
    if (e.target.checked) {
      setSelectedMadeIn((prev) => [...prev, mi[0]]);
    } else {
      setSelectedMadeIn((prev) => prev.filter((item) => item !== mi[0]));
    }
    //filterBySelected();
  };

  const handleDeleteMadeIn = (val) => {
    setSelectedMadeIn((prev) => prev.filter((item) => item !== val));
    //filterBySelected();
  };

  const handleCheckMaterial = (ma, e) => {
    setFilter(0);
    if (e.target.checked) {
      setSelectedMaterial((prev) => [...prev, ma[0]]);
    } else {
      setSelectedMaterial((prev) => prev.filter((item) => item !== ma[0]));
    }
  };
  const handleDeleteMaterial = (val) => {
    setSelectedMaterial((prev) => prev.filter((item) => item !== val));
  };

  const filterBySelected = () => {
    //let temp = rings;
    let filterResult = [];
    let madeInResult = [];
    selectedMadeIn.forEach((item) => {
      let temp = category.rings.filter((ring) => ring.madeIn === item);
      madeInResult = [...madeInResult, ...temp];
    });
    selectedMaterial.forEach((item) => {
      let temp = category.rings.filter((ring) => ring.material === item);
      filterResult = [...filterResult, ...temp];
    });
    if (selectedMadeIn.length > 0 && selectedMaterial.length > 0) {
      let temp = [...madeInResult, ...filterResult];
      //console.log();
      temp = temp.sort((a, b) => a.ringId.localeCompare(b.ringId));
      let result = [];
      for (let index = 0; index < temp.length - 1; index++) {
        if (temp[index].ringId === temp[index + 1].ringId) {
          result.push(temp[index]);
        }
      }
      setRings(result);
    } else if (selectedMadeIn.length > 0) {
      setRings(madeInResult);
    } else if (selectedMaterial.length > 0) {
      setRings(filterResult);
    } else {
      setRings(category && category.rings);
    }
  };
  const handleChangeSort = (e) => {
    setArrange(e.target.value);
    switch (e.target.value) {
      case "1":
        setRings((prev) => prev.sort((a, b) => a.price - b.price).slice());
        break;
      case "2":
        setRings((prev) => prev.sort((a, b) => b.price - a.price).slice());
        break;
      default:
        setRings(category.rings);
        break;
    }
  };

  return category ? (
    <section className="">
      <div className="follow">
        <div className="bread-crumb">Hiển thị theo loại</div>
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
            <select onChange={handleChangeSort} value={arrange}>
              {listArrange.map((item, index) => {
                return (
                  <option value={item.value} key={index}>
                    {item.text}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
      </div>
      <div className="relative-filter">
        <div className="selected-filter-list">
          {selectedMadeIn.length > 0
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
            : null}
        </div>
        <div className={`filter-option ${filter !== 0 ? "active" : ""}`}>
          <div className="option">
            {madeIn && filter === 1
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
              : null}
            {material && filter === 2
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
              : null}
          </div>
        </div>
      </div>
      <div className="follow list-product row">
        <ListRingFilter rings={rings} />
      </div>
    </section>
  ) : (
    <Loading />
  );
}
