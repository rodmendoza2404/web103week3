const EventCountdown = ({ eventDate }) => {
  const today = new Date()
  const targetDate = new Date(eventDate)
  const timeDifference = targetDate - today
  const daysLeft = Math.ceil(timeDifference / (1000 * 60 * 60 * 24))

  if (daysLeft < 0) {
    return <p className="event-passed">This event has passed</p>
  }

  if (daysLeft === 0) {
    return <p className="event-countdown">Happening today!</p>
  }

  return <p className="event-countdown">{daysLeft} day(s) remaining</p>
}

export default EventCountdown