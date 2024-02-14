import { combineReducers } from "@reduxjs/toolkit";
import ringReducers from "./ringReducers";
const allReducers = combineReducers({
  ring: ringReducers,
});

export default allReducers;
