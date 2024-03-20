const brand = (state = [], action) => {
  switch (action.type) {
    case "GET_BRANDS":
      return action.payload;
    case "ADD_BRAND":
      return [...state, action.payload];
    case "UPDATE_BRAND":
      return state.map((brand) =>
        brand.brandId !== action.payload.brandId ? brand : action.payload
      );
    case "DELETE_BRAND":
      return state.filter((brand) => brand.brandId !== action.payload);
    default:
      return state;
  }
};

export default brand;
