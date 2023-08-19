import "react-calendar/dist/Calendar.css";
import Calendar from "react-calendar";
import { useState } from "react";

import "react-calendar/dist/Calendar.css";
import "./Calendar.css";

function Extra() {
  const [date, setDate] = useState(new Date());

  const handleDateChange = (selectedDate) => {
    setDate(selectedDate);
  };

  return (
    <div>
      <div className="calendar-container">
        <Calendar onChange={handleDateChange} value={date} />
      </div>
    </div>
  );
}

export default Extra;
