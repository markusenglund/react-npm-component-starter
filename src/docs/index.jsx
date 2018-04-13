import React from "react";
import { render } from "react-dom";
import Meta from '../lib/components/Meta'
import "./styles.css";

function Demo() {
  return (
    <div>
      <Meta title="vian app">
        <h1>Demo with examples of the component</h1>
      </Meta>
    </div>
  );
}

render(<Demo />, document.getElementById("app"));
