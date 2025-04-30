import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

function CalendarComponent() {
  const [date, setDate] = useState(new Date()); // Current date
  const markedDates = [new Date(2022, 8, 8), new Date(2022, 8, 14)]; // September 8 and 14

  const tileClassName = ({ date, view }) => {
    if (
      markedDates.some(
        markedDate =>
          date.getDate() === markedDate.getDate() &&
          date.getMonth() === markedDate.getMonth() &&
          date.getFullYear() === markedDate.getFullYear()
      )
    ) {
      return 'marked-date';
    }
  };

  return (
    <div style={{ padding: '0px' }}>
      <Calendar
        onChange={setDate}
        value={date}
        tileClassName={tileClassName}
        defaultView="month"
        minDetail="month"
        navigationLabel={({ date }) => {
          const months = [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December',
          ];
          return `${months[date.getMonth()]} ${date.getFullYear()}`;
        }}
      />
      <style>{`
        /* Calendar container */
        .react-calendar {
          width: 100%;
          border: none;
          font-family: Arial, sans-serif;
          line-height: 1.125em;
          padding: 12px;
        }

        /* Navigation area (month/year) */
        .react-calendar__navigation {
          height: 44px;
          margin-bottom: 20px;
        }

        .react-calendar__navigation button {
          min-width: 44px;
          background: none;
          font-size: 16px;
          color: #333;
        }

        .react-calendar__navigation__label {
          font-weight: bold;
          font-size: 18px;
          color: #333;
        }

        /* Weekday headers */
        .react-calendar__month-view__weekdays {
          text-align: center;
          text-transform: uppercase;
          font-weight: 500;
          font-size: 12px;
          color: #666;
        }

        .react-calendar__month-view__weekdays__weekday {
          padding: 8px;
        }

        .react-calendar__month-view__weekdays__weekday abbr {
          text-decoration: none;
          border: none;
        }

        /* Calendar days */
        .react-calendar__tile {
          max-width: 100%;
          height: 40px;
          padding: 0;
          background: none;
          text-align: center;
          line-height: 40px;
          font-size: 14px;
          color: #333;
          position: relative;
        }

        /* Only show background on hover */
        .react-calendar__tile:enabled:hover,
        .react-calendar__tile:enabled:focus {
          background: none;
          position: relative;
        }

        .react-calendar__tile:enabled:hover::before,
        .react-calendar__tile:enabled:focus::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 36px;
          height: 36px;
          background: #f0f0f0;
          border-radius: 50%;
          z-index: 0;
        }

        .react-calendar__tile abbr {
          position: relative;
          z-index: 1;
        }

        /* Selected date */
        .react-calendar__tile--active {
          background: none !important;
          position: relative;
        }

        .react-calendar__tile--active::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 36px;
          height: 36px;
          background: #007AFF;
          border-radius: 50%;
          z-index: 0;
        }

        .react-calendar__tile--active abbr {
          color: white;
          position: relative;
          z-index: 1;
        }

        /* Current date */
        .react-calendar__tile--now {
          background: none;
          color: #007AFF;
        }

        /* Marked dates with red dots */
        .marked-date {
          position: relative;
        }

        .marked-date::after {
          content: '';
          position: absolute;
          bottom: 4px;
          left: 50%;
          transform: translateX(-50%);
          width: 4px;
          height: 4px;
          background-color: #ff0000;
          border-radius: 50%;
          z-index: 1;
        }

        .react-calendar__tile {
          border: none;
        }

        .react-calendar__month-view__days__day--weekend {
          color: #333;
        }

        /* Navigation arrows */
        .react-calendar__navigation__arrow {
          font-size: 24px;
          transition: transform 0.2s ease;
        }

        .react-calendar__navigation__arrow:hover {
          transform: scale(1.1);
        }

        .react-calendar__navigation__prev2-button,
        .react-calendar__navigation__next2-button {
          display: none;
        }

        /* Disabled dates */
        .react-calendar__tile:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
      `}</style>
    </div>
  );
}

export default CalendarComponent;
