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
  console.log(data);
  dispatch({ type: "ADD_RING", payload: data });
};

export const getRing = (id) => async () => {
  const { data } = await api.getRing(id);
  return data;
};
