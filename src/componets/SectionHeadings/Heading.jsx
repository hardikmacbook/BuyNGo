import React from "react";

const Heading = ({ heading, desc }) => (
  <div className="text-center mb-16">
    <h1
      className="text-5xl font-bold mb-4 tracking-tight"
      style={{ color: "#000" }}
    >
      {heading}
    </h1>
    <p className="text-xl" style={{ color: "gray", opacity: 0.6 }}>
      {desc}
    </p>
  </div>
);

export default Heading;
