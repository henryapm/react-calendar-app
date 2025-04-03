import { lastDayOfMonth as lastDayOfMonthFn } from "date-fns";
import './App.css';
import { useState, useEffect } from "react";
import scheduleData from './fakeData.json';
import formatDate from "./utils/utils";
import CalendarHeader from "./components/CalendarHeader";
import CalendarGrid from "./components/CalendarGrid";
import AvailabilitySection from "./components/AvailabilitySection";


const fakeData = scheduleData;

export default function CalendarApp(){
  const currentDate = new Date;
  currentDate.setHours(0,0,0,0);
  const [monthIndex, setMonthIndex] = useState(currentDate.getMonth());
  const [selectedDay, setSelectedDay] = useState(currentDate);
  const dateOnDisplay = new Date(currentDate.getFullYear(), monthIndex, 1);
  const totalDays = lastDayOfMonthFn(dateOnDisplay).getDate();
  
  let indexOfFirstDayAvailable = -1;
  
  // fills array dates with dates
  const dates = Array.from({ length: totalDays }, (_, i) => {
    const newDate = new Date(dateOnDisplay);
    newDate.setDate(dateOnDisplay.getDate() + i);    
    return newDate;
  });
  
  indexOfFirstDayAvailable = dates.findIndex((date) => {
  // if formatted date is in fakeData and the evaluated date is after today
    console.log(`${date} ${currentDate} ${Object.keys(fakeData).includes(formatDate(date))} ${date >= dateOnDisplay}`);
    
    return date >= currentDate && Object.keys(fakeData).includes(formatDate(date)) ;
  })

  console.log(indexOfFirstDayAvailable);

  // Adjust the month using an offset (e.g., -1 for previous, +1 for next).
  const handleMonthChange = (offset) => {
    setMonthIndex((prev) => prev + offset);
    console.log(indexOfFirstDayAvailable);    
  };
  
  return(
  <div className="container">
    <div className="wrapper calendar">
      <div className="date">
        <CalendarHeader 
          dateOnDisplay={dateOnDisplay} 
          onMonthChange={handleMonthChange}
        />
        <CalendarGrid 
          dates={dates} 
          onSelectDate={setSelectedDay}
          data={fakeData} 
          selectedDay={selectedDay} 
          currentDate={currentDate}
          indexOfFirstDayAvailable ={indexOfFirstDayAvailable}
        />
      </div>
      <div className="availability">
        <AvailabilitySection
          data={fakeData}
          dates={dates}
          indexOfFirstDayAvailable ={indexOfFirstDayAvailable}
        />
      </div>
    </div>
  </div>
  )
}