const initialState = {
  isLoading: false,
  accessToken: "",
  error: "",
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case "USER_LOGIN":
      return { ...state, accessToken: action.payload };
    default:
      return state;
  }
};

export default user;
