import React, { useState, useEffect } from "react";
import {
  format,
  startOfMonth,
  endOfMonth,
  addMonths,
  subMonths,
  eachDayOfInterval,
  startOfWeek,
  endOfWeek,
  isToday,
} from "date-fns";

const CalendarWithBeautifiedStyles = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [events, setEvents] = useState([]);

  // Departments and their pastel color codes
  const departments = {
    IT: "#FFB6C1",
    HR: "#FFDAB9",
    FI: "#E6E6FA",
    MA: "#B0E0E6",
  };
  const weekdays = [
    "Sun يوم الأحد", 
    "Mon يوم الإثنين", 
    "Tue يوم الثلاثاء", 
    "Wed يوم الأربعاء", 
    "Thu يوم الخميس", 
    "Fri يوم الجمعة", 
    "Sat يوم السبت"];
  // Fetch event data from local file
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("/events.json"); 
        // File in public folder
        if (!response.ok) {
          throw new Error("Failed to load events");
        }
        const data = await response.json();
        setEvents(data);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  const daysInMonth = eachDayOfInterval({
    start: startOfWeek(startOfMonth(currentMonth), { weekStartsOn: 0 }),
    end: endOfWeek(endOfMonth(currentMonth), { weekStartsOn: 0 }),
  });

  const handlePrevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));
  const handleNextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const handleGoToDate = (date) => setSelectedDate(new Date(date));

  const getEventsForDay = (day) => {
    const dayKey = format(day, "yyyy-MM-dd");
    return events.filter((event) => event.date === dayKey);
  };

  return (
    <div className="calendar-container">
      {/* Header */}
      <header className="calendar-header">
        <button className="nav-btn" onClick={handlePrevMonth}>
          &lt;
        </button>
        <h2 className="month-title">
          {format(currentMonth, "MMMM yyyy")}
        </h2>
        <button className="nav-btn" onClick={handleNextMonth}>
          &gt;
        </button>
      </header>

      {/* Weekdays */}
      <div className="calendar-grid weekdays">
        {weekdays.map((weekday) => (
          <div key={weekday} className="weekday">
            {weekday}
          </div>
        ))}
      </div>

      {/* Days */}
      <div className="calendar-grid days">
        {daysInMonth.map((day) => {
          const dayEvents = getEventsForDay(day);

          return (
            <div
              key={format(day, "yyyy-MM-dd")}
              className={`day ${
                format(day, "MM") !== format(currentMonth, "MM") ? "outside" : ""
              } ${isToday(day) ? "today" : ""}`}
              onClick={() => setSelectedDate(day)}
            >
              <span>{format(day, "d")}</span>
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
          );
        })}
      </div>

      {/* Selected Date Details */}
      {selectedDate && (
        <div className="selected-date">
          <h3>Selected Date: {format(selectedDate, "yyyy-MM-dd")}</h3>
          <ul>
            {getEventsForDay(selectedDate).map((event, idx) => (
              <li key={idx}>
                <span
                  style={{
                    color: departments[event.department],
                  }}
                >
                  {event.department}
                </span>
                : {event.event}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Department Legend */}
      <div className="department-legend">
        <h4>Department Legend:</h4>
        <ul>
          {Object.entries(departments).map(([department, color]) => (
            <li key={department} style={{ color: color }}>
              <span className="legend-dot" style={{ backgroundColor: color }}></span>
              {department}
            </li>
          ))}
        </ul>
      </div>

      {/* Beautified Styles */}
      <style jsx>{`
        .calendar-container {
          font-family: Arial, sans-serif;
          max-width: 700px;
          margin: 0 auto;
          padding: 20px;
          background-color: #f9f9f9;
          border-radius: 8px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }
        .calendar-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }
        .month-title {
          font-size: 1.5rem;
          font-weight: bold;
          color: #333;
        }
        .nav-btn {
          background-color: #d4f1f4;
          color: #008cba;
          border: none;
          padding: 8px 12px;
          font-size: 1rem;
          cursor: pointer;
          border-radius: 4px;
          transition: all 0.3s ease;
        }
        .nav-btn:hover {
          background-color: #b2ebf2;
        }
        .calendar-grid {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          gap: 10px;
          margin-bottom: 20px;
        }
        .weekdays {
          font-weight: bold;
          text-align: center;
          color: #666;
        }
        .day {
          min-width: 30px;
          aspect-ratio: 1 / 1;
          background-color: #fff;
          border: 1px solid #e0e0e0;
          padding: 5px;
          border-radius: 4px;
          text-align: center;
          position: relative;
          cursor: pointer;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        .outside {
          color: #aaa;
          background-color: #f0f0f0;
        }
        .today {
          border: 2px solid #ffadad;
        }
        .event {
          padding: 2px 5px;
          border-radius: 3px;
          font-size: 10px;
          margin-top: 2px;
          color: #333;
        }
        .selected-date {
          margin-top: 20px;
          padding: 10px;
          border: 1px solid #e0e0e0;
          border-radius: 4px;
          background-color: #fff;
        }
        .department-legend {
          margin-top: 20px;
          padding: 10px;
          background-color: #fff;
          border-radius: 4px;
          border: 1px solid #e0e0e0;
        }
        .department-legend ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        .department-legend li {
          display: flex;
          align-items: center;
          margin-bottom: 5px;
        }
        .legend-dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          margin-right: 10px;
        }
      `}</style>
    </div>
  );
};

export default CalendarWithBeautifiedStyles;
