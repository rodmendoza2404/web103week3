import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getLocationById } from '../services/LocationsAPI'
import { getEventsByLocationId } from '../services/EventsAPI'
import EventCountdown from '../components/EventCountdown'

const LocationDetails = () => {
  const { id } = useParams()
  const [location, setLocation] = useState(null)
  const [events, setEvents] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const locationData = await getLocationById(id)
      const eventsData = await getEventsByLocationId(id)

      setLocation(locationData)
      setEvents(eventsData)
    }

    fetchData()
  }, [id])

  if (!location) {
    return <p>Loading...</p>
  }

  return (
    <div className="page">
      <Link to="/">← Back to Home</Link>

      <h1>{location.name}</h1>
      <img src={location.image} alt={location.name} className="details-image" />
      <p><strong>Neighborhood:</strong> {location.neighborhood}</p>
      <p>{location.description}</p>

      <h2>Events at this location</h2>

      <div className="events-grid">
        {events.map((event) => (
          <div key={event.id} className="event-card">
            <img src={event.image} alt={event.title} />
            <h3>{event.title}</h3>
            <p><strong>Date:</strong> {event.event_date}</p>
            <EventCountdown eventDate={event.event_date} />
            <p><strong>Time:</strong> {event.event_time}</p>
            <p><strong>Category:</strong> {event.category}</p>
            <p><strong>Price:</strong> {event.price}</p>
            <p>{event.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default LocationDetails