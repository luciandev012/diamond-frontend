const brand = (state = [], action) => {
  switch (action.type) {
    case "GET_BRANDS":
      return action.payload;
    case "ADD_BRAND":
      return [...state, action.payload];
    default:
      return state;
  }
};

export default brand;
