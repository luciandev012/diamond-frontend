const ringCategory = (state = [], action) => {
  switch (action.type) {
    case "GET_RING_CATEGORIES":
      return action.payload;
    case "ADD_RING_CATEGORY":
      return [...state, action.payload];
    case "DELETE_RING_CATEGORY":
      return state.filter((cate) => cate.ringCategoryId !== action.payload);
    default:
      return state;
  }
};

export default ringCategory;
