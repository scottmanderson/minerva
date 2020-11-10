import React, { useReducer } from "react";
import reducer from "./Reducer";

export const initialState = {};

export const Context = React.createContext({});
export const Store = (props) => {
  const [globalState, dispatch] = useReducer(reducer, initialState);
  return (
    <Context.Provider value={{ globalState, dispatch }}>
      {props.children}
    </Context.Provider>
  );
};
