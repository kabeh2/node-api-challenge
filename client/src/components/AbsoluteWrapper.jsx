import React from "react";

function AbsoluteWrapper({ children }) {
  return <div style={{ position: "absolute", width: "100%" }}>{children}</div>;
}

export default AbsoluteWrapper;
