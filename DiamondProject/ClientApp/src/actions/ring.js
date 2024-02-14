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
