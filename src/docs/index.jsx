import React from "react";
import { render } from "react-dom";
import Meta from '../lib/components/Meta'
import "./styles.css";

function Demo() {
  return (
    <div>
      <Meta title="Title">
        <div>
        </div>
      </Meta>
    </div>
  );
}

render(<Demo />, document.getElementById("app"));
