import * as api from "../apis/ring";

export const getRings = () => async (dispatch) => {
  const { data } = await api.getRings();
  dispatch({ type: "GET_RINGS", payload: data });
};

export const deleteRing = (id) => async (dispatch) => {
  const { status } = await api.deleteRing(id);
  console.log(status);
  if (status === 200) {
    dispatch({ type: "DELETE_RING", payload: id });
    return true;
  } else {
    return false;
  }
};

export const addRing = (model) => async (dispatch) => {
  const { data } = await api.addRing(model);
  dispatch({ type: "ADD_RING", payload: data });
};

export const getRing = (id) => async () => {
  const { data } = await api.getRing(id);
  return data;
};

export const getRingCategories = () => async (dispatch) => {
  const { data } = await api.getRingCategories();
  dispatch({ type: "GET_RING_CATEGORIES", payload: data });
};

export const deleteCategory = (id) => async (dispatch) => {
  const { status } = await api.deleteCategory(id);
  if (status === 200) {
    dispatch({ type: "DELETE_RING_CATEGORY", payload: id });
    return true;
  } else {
    return false;
  }
};

export const addRingCategory = (model) => async (dispatch) => {
  const { data } = await api.addRingCategory(model);
  dispatch({ type: "ADD_RING_CATEGORY", payload: data });
};
