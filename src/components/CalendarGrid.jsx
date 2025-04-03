import formatDate from "../utils/utils";

const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function CalendarGrid({dates, onSelectDate, data, selectedDay, currentDate, indexOfFirstDayAvailable}){
  const daysOfTheWeek = daysOfWeek.map((day,i) => <span className="day" key={i} >{day}</span>);
  const firstDayOfTheMonth = dates[0].getDay() + 1; // from the first day(1) in the dates array, get the day of the week
  const todaysDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate())
  
  const today = formatDate(todaysDate); 

  function isAvailable(date){
    return date >= currentDate && Object.keys(data).includes(formatDate(date)) ;
  }

  

  const datesArray = dates.map((date) => {
    const dateString = formatDate(date); // Format each date
    const isToday = dateString === today;
    // console.log(dates[indexOfFirstDayAvailable]);
    
    return (
      <span 
        onClick={() => isAvailable(date) && onSelectDate(date)}
        data-date={date}
        key={date}
        className={`day${ isToday ? " today" : ""} ${ isAvailable(date) ? "available" : "notAvailable"} ${dateString === formatDate(dates[indexOfFirstDayAvailable]) ? "selected-day" : ""}`}
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