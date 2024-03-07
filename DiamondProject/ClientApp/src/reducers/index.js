import { combineReducers } from "@reduxjs/toolkit";
import ringReducers from "./ringReducers";
import ringCategoryReducers from "./ringCategoryReducers";
import brandReducers from "./brandReducers";
import userReducers from "./userReducers";
const allReducers = combineReducers({
  ring: ringReducers,
  ringCategory: ringCategoryReducers,
  brand: brandReducers,
  user: userReducers,
});

export default allReducers;
