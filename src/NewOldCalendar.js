import React, { useState, useEffect } from "react";
import { format, startOfMonth, endOfMonth, addMonths, subMonths } from "date-fns";
// import { chunkArray, getEventsForDay } from "./utils";
import Header from "./Header";
import Weekdays from "./Weekdays";
import Days from "./Days";
import Legend from "./Legend";

// const chunkArray = (array, chunkSize) => {
//     if (!Array.isArray(array)) throw new Error("Input must be an array");
//     const result = [];
//     for (let i = 0; i < array.length; i += chunkSize) {
//       result.push(array.slice(i, i + chunkSize));
//     }
//     return result;
//   };
const chunkArray = (array, size) => {
  const result = [];
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size));
  }
  return result;
};
  
const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [expandedDays, setExpandedDays] = useState([]);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        // File in public folder
        const response = await fetch("/events.json");
        const data = await response.json();
        setEvents(data);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };
    fetchEvents();
  }, []);
  // console.log(Calendar); // Should show a function or component definition

  // const daysInMonth = chunkArray(
  //   Array.from(
  //     { length: endOfMonth(currentMonth).getDate() },
  //     (_, i) => new Date(currentMonth.getFullYear(), currentMonth.getMonth(), i + 1)
  //   ),
  // );
  // Days in the current month
  const daysInMonth = Array.from(
    { length: endOfMonth(currentMonth).getDate() },
    (_, i) => new Date(currentMonth.getFullYear(), currentMonth.getMonth(), i + 1)
  );

  // Chunk into weeks (7 days each)
  const weeks = chunkArray(daysInMonth, 7);
  console.log("Weeks:", weeks); // Debugging log

console.log({daysInMonth}, "daysInMonth")
  return (
    <div className="calendar-container">
      <Header
        currentMonth={currentMonth}
        onPrevMonth={() => setCurrentMonth(subMonths(currentMonth, 1))}
        onNextMonth={() => setCurrentMonth(addMonths(currentMonth, 1))}
      />
      <Weekdays />
      <Days
        daysInMonth={weeks}
        currentMonth={currentMonth}
        events={events}
        expandedDays={expandedDays}
        setExpandedDays={setExpandedDays}
      />
      <Legend />
    </div>
  );
};

export default Calendar;
