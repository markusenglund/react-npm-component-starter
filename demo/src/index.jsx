import React from "react";
import { render } from "react-dom";
// import "./styles.css";

function Demo() {
  return (
    <div>
      <h1>Hello world</h1>
    </div>
  );
}

render(<Demo />, document.getElementById("app"));
