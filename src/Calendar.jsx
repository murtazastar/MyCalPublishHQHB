import React, { useState, useEffect } from "react";
import { format, startOfMonth, endOfMonth, addMonths, subMonths, getDay } from "date-fns"; 
import Header from "./Header";
import Weekdays from "./Weekdays";
import Days from "./Days";
import Legend from "./Legend";

// Function to chunk an array into smaller chunks (weeks of 7 days)
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
        const response = await fetch("/events.json");
        const data = await response.json();
        setEvents(data);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };
    fetchEvents();
  }, []);

  // Calculate the first day of the month and the total number of days in the month
  const firstDayOfMonth = startOfMonth(currentMonth);
  const daysInMonth = Array.from(
    { length: endOfMonth(currentMonth).getDate() },
    (_, i) => new Date(currentMonth.getFullYear(), currentMonth.getMonth(), i + 1)
  );

  // Get the starting weekday for the current month
  const startDay = getDay(firstDayOfMonth); // Returns a number (0-6) for the starting day (0 = Sunday)

  // Add empty slots before the first day of the month to align the days correctly
  const blankDays = Array.from({ length: startDay }, () => null); // Nulls to represent empty days
  const fullCalendarDays = [...blankDays, ...daysInMonth];

  // Chunk into weeks (7 days each)
  const weeks = chunkArray(fullCalendarDays, 7);

  return (
    <div className="calendar-container">
      <Header
        currentMonth={currentMonth}
        onPrevMonth={() => setCurrentMonth(subMonths(currentMonth, 1))}
        onNextMonth={() => setCurrentMonth(addMonths(currentMonth, 1))}
      />
      <Weekdays />
      <Days
        // weeks={weeks}
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
