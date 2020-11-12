import React from "react";
import ObjectPane from "./ObjectPane";
import DisplayPane from "./DisplayPane";

const App = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-2">
          <ObjectPane />
        </div>
        <div className="col-10">
          <DisplayPane />
        </div>
      </div>
    </div>
  );
};

export default App;
