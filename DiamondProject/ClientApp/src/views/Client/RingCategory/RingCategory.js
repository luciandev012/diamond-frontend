import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getRingCategory } from "../../../actions/ring";

export default function RingCategory() {
  const params = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchCategory = async () => {
      const category = await dispatch(getRingCategory(params.id));
      console.log(category);
    };
    fetchCategory();
  }, [params]);
  return <div>RingCategory</div>;
}
