import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
// import $ from 'jquery';
// import Popper from 'popper.js';
import 'bootstrap/dist/js/bootstrap.bundle.min';
// import { Container, Row, Col } from "react-bootstrap";
// import Button from "react-bootstrap/Button";
// import ButtonGroup from "react-bootstrap/ButtonGroup";
// import {
//     FormatAlignCenter,
//     FormatAlignLeft,
//     FormatAlignRight,
// } from "@mui/icons-material";
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

const DayCal = () => {
	const [currentMonth, setCurrentMonth] = useState(new Date());
	const [selectedDate, setSelectedDate] = useState(null);
	const [events, setEvents] = useState([]);
	//
	  // Fetch event data from a JSON file
		useEffect(() => {
			const fetchEvents = async () => {
				try {
					const response = await fetch("/events.json"); // File in public folder
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
	// Departments and their color codes
  const departments = {
    HI: "#D1BDFF",
    IT: "#E2CBF7",
    HR: "#D6F6FF",
    FI: "#B3F5BC",
    MA: "#FFE699",
    MA: "#FCAE7C",
    MA: "#FA9189",
  };
	// Example event data
  // const events = [
  //   { date: "2024-12-01", department: "HI", event: "30 Jumada al-Ula 1446H" },
  //   { date: "2024-12-01", department: "IT", event: "RDO, RDM, ZI Visits for TWT & EDP planning" },
  //   { date: "2024-12-01", department: "HR", event: "UI Newsletter" },
  //   { date: "2024-12-02", department: "HI", event: "1 Jumada al-Ukhra 1446H" },
	// 	{ date: "2024-12-02", department: "IT", event: "RDO, RDM, ZI Visits for TWT & EDP planning" },
  //   { date: "2024-12-02", department: "HR", event: "EDP roll-out (All Jamiyat)" },
  //   { date: "2024-12-02", department: "HR", event: "UKK Disbursement" },
  //   { date: "2024-12-02", department: "FI", event: "Training Content Discussion (Communications)" },
  //   { date: "2024-12-02", department: "MA", event: "Partnership Module UAT" },
  //   { date: "2024-12-02", department: "MA", event: "Vepar Hawaij Module UAT" },
  //   { date: "2024-12-03", department: "HI", event: "2 Jumada al-Ukhra 1446H" },
	// 	{ date: "2024-12-03", department: "IT", event: "RDO, RDM, ZI Visits for TWT & EDP planning" },
  //   { date: "2024-12-03", department: "HR", event: "Initiation of Product Content Creation" },
  //   { date: "2024-12-03", department: "FI", event: "Hawaij & Sadat Kiram Cases Report" },
  //   { date: "2024-12-04", department: "HI", event: "3 Jumada al-Ukhra 1446H" },
	// 	{ date: "2024-12-04", department: "IT", event: "RDO, RDM, ZI Visits for TWT & EDP planning" },
  //   { date: "2024-12-05", department: "HI", event: "4 Jumada al-Ukhra 1446H" },
	// 	{ date: "2024-12-05", department: "IT", event: "RDO, RDM, ZI Visits for TWT & EDP planning" },
  //   { date: "2024-12-06", department: "HI", event: "5 Jumada al-Ukhra 1446H" },
	// 	{ date: "2024-12-06", department: "IT", event: "RDO, RDM, ZI Visits for TWT & EDP planning" },
  //   { date: "2024-12-07", department: "HI", event: "6 Jumada al-Ukhra 1446H" },
	// 	{ date: "2024-12-07", department: "IT", event: "RDO, RDM, ZI Visits for TWT & EDP planning" },
  //   { date: "2024-12-08", department: "HI", event: "7 Jumada al-Ukhra 1446H" },
  //   { date: "2024-12-09", department: "HI", event: "8 Jumada al-Ukhra 1446H" },
  //   { date: "2024-12-10", department: "HI", event: "9 Jumada al-Ukhra 1446H" },
  //   { date: "2024-12-11", department: "HI", event: "10 Jumada al-Ukhra 1446H" },
  //   { date: "2024-12-12", department: "HI", event: "11 Jumada al-Ukhra 1446H" },
  //   { date: "2024-12-13", department: "HI", event: "12 Jumada al-Ukhra 1446H" },
  //   { date: "2024-12-14", department: "HI", event: "13 Jumada al-Ukhra 1446H" },
  //   { date: "2024-12-15", department: "HI", event: "14 Jumada al-Ukhra 1446H" },
  //   { date: "2024-12-16", department: "HI", event: "15 Jumada al-Ukhra 1446H" },
  //   { date: "2024-12-17", department: "HI", event: "16 Jumada al-Ukhra 1446H" },
  //   { date: "2024-12-18", department: "HI", event: "17 Jumada al-Ukhra 1446H" },
  //   { date: "2024-12-19", department: "HI", event: "18 Jumada al-Ukhra 1446H" },
  //   { date: "2024-12-20", department: "HI", event: "19 Jumada al-Ukhra 1446H" },
  //   { date: "2024-12-21", department: "HI", event: "20 Jumada al-Ukhra 1446H" },
	// 	{ date: "2025-01-26", department: "IT", event: "Holiday" },
    

  // ];
	// // Example array of date-specific data
	// const dayData = [
	// 	{ date: "2024-12-01", info: "Event 1" },
	// 	{ date: "2024-12-05", info: "Event 2" },
	// 	{ date: "2024-12-25", info: "HIliday" },
	// 	{ date: "2025-01-01", info: "Event 1" },
	// 	{ date: "2025-01-05", info: "Event 2" },
	// 	{ date: "2025-01-26", info: "Holiday" },
	// ];

	const daysInMonth = eachDayOfInterval({
		start: startOfWeek(startOfMonth(currentMonth), { weekStartsOn: 0 }),
		end: endOfWeek(endOfMonth(currentMonth), { weekStartsOn: 0 }),
	});

	const weekdays = [
		"Sun يوم الأحد", 
		"Mon يوم الإثنين", 
		"Tue يوم الثلاثاء", 
		"Wed يوم الأربعاء", 
		"Thu يوم الخميس", 
		"Fri يوم الجمعة", 
		"Sat يوم السبت"];

	const handlePrevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));
	const handleNextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
	// const handleGoToDate = (date) => setSelectedDate(new Date(date));
	//
	// const getDayData = (day) => {
	// 	const dayKey = format(day, "yyyy-MM-dd");
	// 	return dayData.find((data) => data.date === dayKey);
	// };
	//
	const getEventsForDay = (day) => {
    const dayKey = format(day, "yyyy-MM-dd");
    return events.filter((event) => event.date === dayKey);
  };
	//
	return (
		<div>
			<header>
				<h2 style={{ display: "inline" }}>{format(currentMonth, "MMMM yyyy")}</h2>
				<button onClick={handlePrevMonth} style={{ display: "inline" }}>Previous</button>
				<button onClick={handleNextMonth}>Next</button>
				{/* <ButtonGroup aria-label="Basic example">
					<Button variant="primary" onClick={handlePrevMonth}>
							<FormatAlignLeft />
					</Button>
					<Button variant="warning" onClick={handleNextMonth}>
							<FormatAlignRight />
					</Button>
				</ButtonGroup> */}
				{/* <input
          type="date"
          onChange={(e) => handleGoToDate(e.target.value)}
          placeholder="Go to Date"
        /> */}
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
			<div className="calendar-grid">
				{daysInMonth.map((day) => {
					// const data = getDayData(day);
					const dayEvents = getEventsForDay(day);
					console.log({dayEvents}, {day})
					return (
						<div
							key={format(day, "yyyy-MM-dd")}
							className={`day ${format(day, "MM") !== format(currentMonth, "MM") 
								? "outside" 
								: ""}  ${isToday(day) ? "today" : ""}`}
							onClick={() => setSelectedDate(day)}
						>
							<span>{format(day, "d")}</span>
							{/* {data && <div className="day-data">{data.info}</div>} */}
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
			{/* Department Legend */}
      <div className="department-legend">
        <b>Department Legend:</b>
        <ul>
          {Object.entries(departments).map(([department, color]) => (
            <li key={department} style={{ color }}>
              {department}
            </li>
          ))}
        </ul>
      </div>
			{/* {selectedDate && (
        <div className="selected-date">
          <h3>Selected Date: {format(selectedDate, "yyyy-MM-dd")}</h3>
          {/* Display details for the selected date */}
			{/* {getDayData(selectedDate)?.info && (
            <p>Details: {getDayData(selectedDate).info}</p>
          )}
        </div>
      )} */}

			<style jsx>{`
				body {
					font-size: 10px;
				}
			  header {
					text-align: center;
				}
        .calendar-grid {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          gap: 3px;
          margin: 10px;
        }
        .weekdays {
          font-weight: bold;
          text-align: center;
          margin-bottom: 5px !important;
        }
        .weekday {
          text-align: center;
          padding: 5px;
					border: 1px solid #ccc;
					border-radius: 5px;
        }
        .day {
					min-width: 10px;
					aspect-ratio: 1 / 1; /* Ensures the cells are square */
					border: 1px solid #ccc;
					padding: 3px;
					text-align: center;
					xcursor: pointer;
					display: flex;
					flex-direction: column;
					xjustify-content: space-between;
					align-items: center;
					border-radius: 5px;
        }
				.day > span {
					border-bottom: 1px solid #ccc;
					width: 100%;
				}
				.day > div {
					border-bottom: 1px solid #ccc;
					width: 100%;
				}
        .outside {
          color: #aaa;
        }
        .selected-date {
          margin-top: 20px;
        }
        .today {
          background-color: #F9FFB5; /* Highlight today's date */
          border-color: #fbc02d;
        }
      `}</style>
		</div>
	);
};

export default DayCal;
