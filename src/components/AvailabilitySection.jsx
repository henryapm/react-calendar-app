import formatDate from "../utils/utils";

export default function AvailabilitySection({data, dates, indexOfFirstDayAvailable}){
  const selectedDay = dates[indexOfFirstDayAvailable];
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