import React from "react";
import { createStore } from "redux";

import reducer from "./Reducer";

const initialState = {};

const store = createStore(reducer, initialState);

export default store;
