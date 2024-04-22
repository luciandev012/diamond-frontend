import React from "react";
import { Link } from "react-router-dom";
import { formatMoney, getImgUrl } from "../../../helper/helper";

export default function ListRingFilter({ rings }) {
  return rings
    ? rings.map((ring) => {
        return (
          <div className="col-md-3 product" id="product" key={ring.ringId}>
            <img
              src={
                ring.imageName
                  ? getImgUrl(ring.imageName)
                  : "/images/diamond_rings.png"
              }
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
              to={`/detail-product/${ring.pathName}`}
            />
          </div>
        );
      })
    : null;
}
