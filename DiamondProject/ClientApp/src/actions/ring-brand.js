import * as api from "../apis/ring-brand";

export const getBrands = () => async (dispatch) => {
  const { data } = await api.getBrands();
  console.log(data);
  dispatch({ type: "GET_BRANDS", payload: data });
};

export const addBrands = (model) => async (dispatch) => {
  const { data } = await api.addBrands(model);
  dispatch({ type: "ADD_BRAND", payload: data });
};

export const deleteBrand = (id) => async (dispatch) => {
  const { status } = await api.deleteBrand(id);
  if (status === 200) {
    dispatch({ type: "DELETE_BRAND", payload: id });
    return true;
  } else {
    return false;
  }
};
