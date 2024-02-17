import { combineReducers } from "@reduxjs/toolkit";
import ringReducers from "./ringReducers";
import ringCategoryReducers from "./ringCategoryReducers";
const allReducers = combineReducers({
  ring: ringReducers,
  ringCategory: ringCategoryReducers,
});

export default allReducers;
