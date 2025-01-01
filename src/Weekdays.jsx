import React from "react";
const weekdays = [
    "Sun يوم الأحد", 
    "Mon يوم الإثنين", 
    "Tue يوم الثلاثاء", 
    "Wed يوم الأربعاء", 
    "Thu يوم الخميس", 
    "Fri يوم الجمعة", 
    "Sat يوم السبت"];
const Weekdays = () => (
    
  <div className="calendar-grid weekdays">
    {weekdays.map((day) => (
      <div key={day} className="weekday">
        {day}
      </div>
    ))}
  </div>
);

export default Weekdays;
