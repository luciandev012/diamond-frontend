import { combineReducers } from "@reduxjs/toolkit";
import ringReducers from "./ringReducers";
import ringCategoryReducers from "./ringCategoryReducers";
import brandReducers from "./brandReducer";
const allReducers = combineReducers({
  ring: ringReducers,
  ringCategory: ringCategoryReducers,
  brand: brandReducers,
});

export default allReducers;
