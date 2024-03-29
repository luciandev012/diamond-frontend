const ring = (state = [], action) => {
  switch (action.type) {
    case "GET_RINGS":
      return action.payload;
    case "DELETE_RING":
      return state.filter((ring) => ring.ringId !== action.payload);
    case "ADD_RING":
      return [...state, action.payload];
    default:
      return state;
  }
};

export default ring;
