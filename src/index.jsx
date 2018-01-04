import React, { Component } from "react";

const MySuperCoolComponent = ({ children, color }) => (
  <button style={{ color }}>{children}</button>
);

export default MySuperCoolComponent;
