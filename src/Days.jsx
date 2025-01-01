import React from "react";
import { format, isToday, isValid } from "date-fns";

const Days = ({ daysInMonth, currentMonth, events }) => {
  const departments = {
    IT: "#FFB6C1",
    HR: "#FFDAB9",
    Finance: "#E6E6FA",
    Marketing: "#B0E0E6",
  };

  const getEventsForDay = (day) => {
    const dayKey = format(day, "yyyy-MM-dd");
    return events.filter((event) => event.date === dayKey);
  };

  const getBlankDays = (startOfMonthDay) => {
    const blankDays = [];
    for (let i = 0; i < startOfMonthDay; i++) {
      blankDays.push(null); // Placeholder for blank day
    }
    return blankDays;
  };

  // Get the start day of the month (0 = Sunday, 1 = Monday, etc.)
  const startOfMonthDay = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay();
  
  // Generate the blank days based on the start of the month
  const blankDays = getBlankDays(startOfMonthDay);

  // Combine blank days and actual days of the month
  const daysWithBlanks = [...blankDays, ...daysInMonth].reduce((result, day, index) => {
    const weekIndex = Math.floor(index / 7);
    if (!result[weekIndex]) result[weekIndex] = [];
    result[weekIndex].push(day);
    return result;
  }, []);

  return (
    <div className="calendar-container">
      {daysWithBlanks.map((week, weekIdx) => (
        <div key={weekIdx} className="week-row">
          {week.map((day, idx) => {
            // If the day is null (blank placeholder), render an empty div
            if (day === null) {
              return <div key={idx} className="day-item empty"></div>;
            }

            // Now we can check if the day is valid before rendering
            if (!isValid(day)) {
              return <div key={idx} className="day-item empty"></div>; // Invalid date
            }

            const dayEvents = getEventsForDay(day);

            return (
              <div
                key={format(day, "yyyy-MM-dd")}
                className={`day-item ${
                  format(day, "MM") !== format(currentMonth, "MM") ? "outside" : ""
                } ${isToday(day) ? "today" : ""}`}
              >
                <div className="day-number">{format(day, "d")}</div>
                <div className="events">
                  {dayEvents.map((event, eventIdx) => (
                    <div
                      key={eventIdx}
                      className="event"
                      style={{ backgroundColor: departments[event.department] }}
                    >
                      {event.event}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default Days;
