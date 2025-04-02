import { lastDayOfMonth as lastDayOfMonthFn } from "date-fns";
import './App.css';
import { useState, useEffect } from "react";
import scheduleData from './fakeData.json';
import formatDate from "./utils/utils";


const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const fakeData = scheduleData;

export default function CalendarApp(){
  const currentDate = new Date;
  const [monthIndex, setMonthIndex] = useState(currentDate.getMonth());
  const [selectedDay, setSelectedDay] = useState(currentDate);
  const [indexFirstDayAvailable, setIndexFirstDayAvailable] = useState(-1)
  const dateToShow = new Date(currentDate.getFullYear(), monthIndex, 1);

  const totalDays = lastDayOfMonthFn(dateToShow).getDate();
  
  // fills array dates with dates
  
  const dates = Array.from({ length: totalDays }, (_, i) => {
    const newDate = new Date(dateToShow);
    newDate.setDate(dateToShow.getDate() + i);
    console.log(newDate);
    
    return newDate;
  });
  
  useEffect(()=>{
    setIndexFirstDayAvailable(dates.findIndex((date) => {
      return Object.keys(fakeData).includes(formatDate(date)) && dateToShow.getTime() <= date.getTime() &&  fakeData[formatDate(date)] != '';
    }))
    setSelectedDay(dates[indexFirstDayAvailable]);
}, []);

  

  // Adjust the month using an offset (e.g., -1 for previous, +1 for next).
  const handleMonthChange = (offset) => {
    setMonthIndex((prev) => prev + offset);
  };
  
  return(
  <div className="container">
    <div className="wrapper calendar">
      <div className="date">
        <CalendarHeader 
          dateToShow={dateToShow} 
          onMonthChange={handleMonthChange}
        />
        <CalendarGrid 
          dates={dates} 
          onSelectDate={setSelectedDay}
          data={fakeData} 
          selectedDay={selectedDay} 
          currentDate={currentDate}
          indexFirstDayAvailable ={indexFirstDayAvailable}
        />
      </div>
      <div className="availability">
        <AvailabilitySection
          data={fakeData} 
          selectedDay={selectedDay}
        />
      </div>
    </div>
  </div>
  )
}

function CalendarHeader({dateToShow, onMonthChange}){
  const currentYear = dateToShow.getFullYear();
  const currentMonth = dateToShow.toLocaleString('default', { month: 'long' });

  const getPreviousMonth = <button className="mx-1" onClick={() => onMonthChange(-1)}>&lt;</button>
  const getNextMonth = <button className="mx-1" onClick={() => onMonthChange(1)}>&gt;</button>

  const year = <span className="mx-1 flex align-items-center">{currentYear}</span>
  const month = <span className="mx-1 flex align-items-center">{currentMonth}</span>

  return(
    <div className="my-3">
      <div className="buttons flex justify-center">
        {getPreviousMonth}
        {month} {year}
        {getNextMonth}
      </div>
    </div>
  )
}

function CalendarGrid({dates, onSelectDate, data, selectedDay, currentDate, indexFirstDayAvailable}){
  const daysOfTheWeek = daysOfWeek.map((day,i) => <span className="day" key={i} >{day}</span>);
  const firstDayOfTheMonth = dates[0].getDay() + 1; // from the first day(1) in the dates array, get the day of the week
  const todaysDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate())
  
  const today = formatDate(todaysDate); 

  function isAvailable(date){
    //TODO: determine if the element's date array is empty
    return Object.keys(data).includes(formatDate(date)) && todaysDate.getTime() <= date.getTime() ;
  }

  

  const datesArray = dates.map((date) => {
    const dateString = formatDate(date); // Format each date
    const isToday = dateString === today;
    
    return (
      <span 
        onClick={() => isAvailable(date) && onSelectDate(date)}
        data-date={date}
        key={date}
        className={`day${ isToday ? " today" : ""} ${ isAvailable(date) ? "available" : "notAvailable"} ${dateString === formatDate(dates[indexFirstDayAvailable]) && "selected-day"}`}
        style={{ gridColumnStart: date.getDate() === 1 && firstDayOfTheMonth }}
      >
        {date.getDate()}
      </span>
    );
  });

  return (
    <>
      <div className="grid-rep-7 my-3 align-center">
        {daysOfTheWeek}
        {datesArray}
      </div>
    </>
  )
}

function AvailabilitySection({data, selectedDay}){
  const selectedDateStr = formatDate(selectedDay);
  const hours = data[selectedDateStr] || []
  const formattedDate = selectedDay ? `${selectedDay.getDate()} ${selectedDay.toLocaleString('default', { month: 'long' })} ${selectedDay.getFullYear()}` : '';

  return(
    <div className="flex flex-col p-3">
      <span className="flex justify-center">{formattedDate}</span>
      {hours.length > 0 ? hours.map(hour => <span key={hour} className="hour">{hour}</span>) : <span className="hour">No availability</span>}
    </div>
  )
}