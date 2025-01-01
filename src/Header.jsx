import React from "react";
import { format } from "date-fns";

const Header = ({ currentMonth, onPrevMonth, onNextMonth }) => (
  <header className="calendar-header">
    <button onClick={onPrevMonth} className="nav-button">
      &#8592;
    </button>
    <h2>{format(currentMonth, "MMMM yyyy")}</h2>
    <button onClick={onNextMonth} className="nav-button">
      &#8594;
    </button>
  </header>
);

export default Header;
