import React from "react";
import { Button } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export const DatePickerCustom = ({ maxDate, selected, onChange }) => {
  function YearRange(startYear, endYear) {
    const years = [];
    for (let i = startYear; i < endYear; i++) {
      years.push(i);
    }
    return years;
  }
  const years = YearRange(1945, maxDate ? maxDate : new Date().getFullYear() + 1);
  const months = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];
  return (
    <DatePicker
      dateFormat="dd/MM/yyyy"
      id="date-picker"
      wrapperClassName="form-control"
      calendarClassName="picker-calendar"
      dayClassName={(date) => "calendar-day"}
      renderCustomHeader={({
        date,
        changeYear,
        changeMonth,
        decreaseMonth,
        increaseMonth,
        prevMonthButtonDisabled,
        nextMonthButtonDisabled,
      }) => (
        <div
          style={{
            padding: 10,
            display: "flex",
            justifyContent: "center",
            color: "#000",
            backgroundColor: "#26182D"
          }}
        >
          <Button className="btn-quark" onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>
            {"<"}
          </Button>
          <select
            value={date.getFullYear()}
            onChange={({ target: { value } }) => changeYear(value)}
            id="picker"
          >
            {years.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>

          <select
            value={months[date.getMonth()]}
            onChange={({ target: { value } }) =>
              changeMonth(months.indexOf(value))
            }
            id="picker"
          >
            {months.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>

          <Button className="btn-quark" onClick={increaseMonth} disabled={nextMonthButtonDisabled}>
            {">"}
          </Button>
        </div>
      )}
      selected={selected}
      onChange={onChange}
    />
  );
};
