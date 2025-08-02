import React from "react";

const years = [
  { year: "2022", event: "Founded our store with a vision for accessible quality." },
  { year: "2023", event: "Launched exclusive collections—reached our first 1,000 customers." },
  { year: "2024", event: "Expanded our team and logistics to serve nationwide." }
];

export default function TimeLine() {
  return (
    <div className="max-w-2xl mx-auto py-8">
      <h2 className="text-2xl font-bold text-black text-center mb-6 tracking-wider">Our Story</h2>
      <ol className="relative border-l border-black">
        {years.map((item, idx) => (
          <li key={idx} className="mb-8 ml-6">
            <span className="absolute w-4 h-4 bg-black rounded-full -left-2 border-2 border-white"></span>
            <h3 className="font-semibold text-lg text-black">{item.year}</h3>
            <p className="text-base text-gray-800">{item.event}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
