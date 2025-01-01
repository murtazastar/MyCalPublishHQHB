import React, { useState, useEffect } from "react";
import { format, startOfMonth, endOfMonth, addMonths, subMonths, eachDayOfInterval, startOfWeek, endOfWeek } from "date-fns";

const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [dayData, setDayData] = useState({});
  const [selectedDate, setSelectedDate] = useState(null);

  // Fetch day data when the month changes
  useEffect(() => {
    fetchDayData();
  }, [currentMonth]);

  const fetchDayData = async () => {
    const start = format(startOfMonth(currentMonth), "yyyy-MM-dd");
    const end = format(endOfMonth(currentMonth), "yyyy-MM-dd");

    // Replace with your API call
    const response = await fetch(`/api/day-data?start=${start}&end=${end}`);
    const data = await response.json();
    setDayData(data);
  };

  const daysInMonth = eachDayOfInterval({
    start: startOfWeek(startOfMonth(currentMonth), { weekStartsOn: 0 }),
    end: endOfWeek(endOfMonth(currentMonth), { weekStartsOn: 0 }),
  });

  const handlePrevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));
  const handleNextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const handleGoToDate = (date) => setSelectedDate(new Date(date));

  return (
    <div>
      <header>
        <button onClick={handlePrevMonth}>Previous</button>
        <h2>{format(currentMonth, "MMMM yyyy")}</h2>
        <button onClick={handleNextMonth}>Next</button>
        {/* <input
          type="date"
          onChange={(e) => handleGoToDate(e.target.value)}
          placeholder="Go to Date"
        /> */}
      </header>

      <div className="calendar-grid">
        {daysInMonth.map((day) => {
          const dayKey = format(day, "yyyy-MM-dd");
          const data = dayData[dayKey] || {};

          return (
            <div
              key={dayKey}
              className={`day ${format(day, "MM") !== format(currentMonth, "MM") ? "outside" : ""}`}
              onClick={() => setSelectedDate(day)}
            >
              <span>{format(day, "d")}</span>
              {data.info && <div className="day-data">{data.info}</div>}
            </div>
          );
        })}
      </div>

      {selectedDate && (
        <div className="selected-date">
          <h3>Selected Date: {format(selectedDate, "yyyy-MM-dd")}</h3>
          {/* Display selected date details */}
        </div>
      )}

      <style jsx>{`
        .calendar-grid {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          gap: 10px;
        }
        .day {
          border: 1px solid #ccc;
          padding: 10px;
          text-align: center;
          cursor: pointer;
        }
        .outside {
          color: #aaa;
        }
        .selected-date {
          margin-top: 20px;
        }
      `}</style>
    </div>
  );
};

export default Calendar;
