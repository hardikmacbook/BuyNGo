import React from "react";

const Heading = ({ heading, desc }) => (
  <div className="text-center mt-5 mb-5">
    <h1
      className="text-5xl font-bold mb-4 tracking-tight"
      style={{ color: "#000" }}
    >
      {heading}
    </h1>
        <div className="w-40 h-px bg-gray-900 mx-auto mb-4"></div>
    <p className="text-xl" style={{ color: "gray", opacity: 0.6 }}>
      {desc}
    </p>
  </div>
);

export default Heading;
