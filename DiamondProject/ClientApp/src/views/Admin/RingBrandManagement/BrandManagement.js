import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBrands } from "../../../actions/ring-brand";

export default function BrandManagement() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getBrands());
  }, []);
  const brands = useSelector((state) => state.brand);
  console.log(brands);
  return <div>BrandManagement</div>;
}
