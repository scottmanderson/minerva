import React, { useEffect } from "react";
import Bokeh from "@bokeh/bokehjs";
import Button from "@material-ui/core/Button";

const BokehReturnsChart = (props) => {
  const handleClick = () => {
    window.Bokeh.embed.embed_item(
      JSON.parse(props.bokehReturnPlot),
      "bokeh_return_plot"
    );
  };

  return (
    <>
      <h5>Returns Plot</h5>
      <div id="bokeh_return_plot" className="bk-root" />
      <Button variant="outlined" onClick={handleClick}>
        Display
      </Button>
    </>
  );
};

export default BokehReturnsChart;
