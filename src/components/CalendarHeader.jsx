export default function CalendarHeader({dateOnDisplay, onMonthChange}){
  const currentYear = dateOnDisplay.getFullYear();
  const currentMonth = dateOnDisplay.toLocaleString('default', { month: 'long' });

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