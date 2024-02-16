import React, { useEffect, useState } from "react";
import CustomCarousel from "../../../components/CustomCarousel/CustomCarousel";
import "./detail-product.css";
import { useParams } from "react-router-dom";
import { getRing } from "../../../actions/ring";
import { useDispatch } from "react-redux";
import {
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
} from "@mui/material";
import { formatMoney } from "../../../helper/helper";
import Loading from "../../../components/Loading/Loading";

//define width height of selection
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
//end define

export default function DetailProduct() {
  const params = useParams();
  const dispatch = useDispatch();
  const [ring, setRing] = useState(null);
  const [ringSize, setRingSize] = useState(0);
  useEffect(() => {
    const fetchRing = async () => {
      const tempRing = await dispatch(getRing(params.id));
      setRing(tempRing);
      setRingSize(tempRing.size);
    };
    fetchRing();
  }, [params.id]);
  const handleChangeSelect = (event) => {
    setRingSize(event.target.value);
  };
  return ring ? (
    <div className="detail-content">
      <div className="grid-container">
        <div className="row" style={{ marginBottom: "10rem" }}>
          <div className="col-md-8">
            <CustomCarousel images={ring.images} />
          </div>
          <div className="col-md-4">
            <div className="ring-information">
              <h3 className="mg-bottom-1">{ring.ringName}</h3>
              <p className="quantity mg-bottom-1">
                Số lượng: {ring.quantity > 0 ? ring.quantity : "hết hàng"}
              </p>
              <h2 className="greeting mg-bottom-1">
                B.zero1 18 kt yellow gold three-band ring set with demi-pavé
                diamonds on the edges
              </h2>
              <FormControl sx={{ width: "100%", marginBottom: "1rem" }}>
                <InputLabel id="demo-multiple-name-label">Cỡ</InputLabel>
                <Select
                  labelId="demo-multiple-name-label"
                  id="demo-multiple-name"
                  value={ringSize}
                  onChange={handleChangeSelect}
                  input={<OutlinedInput label="Cỡ" />}
                  MenuProps={MenuProps}
                >
                  {/* {names.map((name) => (
                    <MenuItem
                      key={name}
                      value={name}
                      style={getStyles(name, personName, theme)}
                    >
                      {name}
                    </MenuItem>
                  ))} */}
                  <MenuItem key={ringSize} value={ringSize}>
                    {ringSize}
                  </MenuItem>
                </Select>
              </FormControl>
              <p className="ring-price-row" style={{ margin: "2rem 0 4rem 0" }}>
                <i className="fa-solid fa-dong-sign"></i>
                <span className="ring-price">{formatMoney(ring.price)}</span>
                <span className="tax">Bao gồm thuế</span>
              </p>
              <a href="#" className="ring-button mg-bottom-1">
                Tìm cửa hàng gần nhất
              </a>
              <a href="#" className="ring-button mg-bottom-1">
                Thông báo khi có hàng
              </a>
            </div>
          </div>
        </div>
        <div className="row" style={{ marginBottom: "10rem" }}>
          <div className="col-md-4">
            <h4 style={{ marginBottom: "2rem" }}>Mô tả</h4>
            <p className="description right-divider">{ring.ringDescription}</p>
          </div>
          <div className="col-md-4">
            <h4 style={{ marginBottom: "2rem" }}>Chi tiết</h4>
            <div className="description right-divider">
              <p>
                <span className="detail-title">
                  <i className="fa-solid fa-dice-d20"></i> Chất liệu:{" "}
                </span>
                {ring.material}
              </p>
              <p>
                <span className="detail-title">
                  <i className="fa-regular fa-gem"></i> Kim cương (Carats):{" "}
                </span>
                0.4
              </p>
              <p>
                <span className="detail-title">
                  <i className="fa-solid fa-gem"></i> Đá quý:{" "}
                </span>
                Kim cương
              </p>
              <p>
                <span className="detail-title">
                  <i className="fa-solid fa-palette"></i> Màu sắc:{" "}
                </span>
                vàng
              </p>
              <p>
                <span className="detail-title">
                  <i className="fa-solid fa-maximize"></i> Thay đổi cỡ:{" "}
                </span>
                {ring.resizable}
              </p>
              <p>
                <span className="detail-title">
                  <i className="fa-solid fa-location-crosshairs"></i> Xuất xứ:{" "}
                </span>
                {ring.madeIn}
              </p>
            </div>
          </div>
          <div className="col-md-4">
            <h4 style={{ marginBottom: "2rem" }}>Insight</h4>
            <p className="description">No Insight</p>
          </div>
        </div>
        <div className="row" style={{ marginBottom: "10rem" }}></div>
      </div>
    </div>
  ) : (
    <Loading />
  );
}
