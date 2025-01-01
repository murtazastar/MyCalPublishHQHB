import React from "react";
import { format, isToday } from "date-fns";

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

  return (
    <div className="calendar-container">
      {daysInMonth.map((week, weekIdx) => (
        <div key={weekIdx} className="week-row">
          {week.map((day) => {
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
                  {dayEvents.map((event, idx) => (
                    <div
                      key={idx}
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
