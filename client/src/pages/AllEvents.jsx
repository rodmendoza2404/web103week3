import { useEffect, useState } from 'react'
import { getAllEvents } from '../services/EventsAPI'
import { getAllLocations } from '../services/LocationsAPI'
import EventCountdown from '../components/EventCountdown'

const AllEvents = () => {
  const [events, setEvents] = useState([])
  const [locationsData, setLocationsData] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedLocation, setSelectedLocation] = useState('All')

  useEffect(() => {
    const fetchData = async () => {
      const [eventsData, locations] = await Promise.all([
        getAllEvents(),
        getAllLocations()
      ])

      setEvents(eventsData)
      setLocationsData(locations)
    }

    fetchData()
  }, [])

  const filteredEvents = events.filter((event) => {
    const matchesCategory =
      selectedCategory === 'All' || event.category === selectedCategory

    const matchesLocation =
      selectedLocation === 'All' || event.location_id === Number(selectedLocation)

    return matchesCategory && matchesLocation
  })

  const categories = ['All', ...new Set(events.map((event) => event.category))]

  return (
    <div className="page">
      <h1>All Miami Events</h1>

      <label>Filter by category: </label>
      <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>

      <label style={{ marginLeft: '12px' }}>Filter by location: </label>
      <select
        value={selectedLocation}
        onChange={(e) => setSelectedLocation(e.target.value)}
      >
        <option value="All">All Locations</option>
        {locationsData.map((loc) => (
          <option key={loc.id} value={loc.id}>
            {loc.name}
          </option>
        ))}
      </select>

      <div className="events-grid">
        {filteredEvents.map((event) => (
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

export default AllEvents