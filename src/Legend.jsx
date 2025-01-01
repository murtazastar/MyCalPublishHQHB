import React from "react";

const Legend = () => {
  const departments = {
    IT: "#FFB6C1",
    HR: "#FFDAB9",
    Finance: "#E6E6FA",
    Marketing: "#B0E0E6",
  };

  return (
    <div className="legend">
      <h3>Departments</h3>
      {Object.entries(departments).map(([dept, color]) => (
        <div key={dept} className="legend-item">
          <span className="color-box" style={{ backgroundColor: color }}></span>
          {dept}
        </div>
      ))}
    </div>
  );
};

export default Legend;
