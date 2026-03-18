import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getAllLocations } from '../services/LocationsAPI'

const Home = () => {
  const [locations, setLocations] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const data = await getAllLocations()
        setLocations(Array.isArray(data) ? data : [])
      } catch (err) {
        setError('Could not load locations. Make sure server is running on port 3001.')
        console.error(err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchLocations()
  }, [])

  return (
    <div className="page">
      <h1>Project 3 - Virtual Community Space</h1>
      <p>Explore things to do in Miami by location.</p>

      {isLoading && <p>Loading locations...</p>}
      {error && <p className="event-passed">{error}</p>}

      <div className="locations-grid">
        {locations.map((location) => (
          <Link to={`/locations/${location.id}`} key={location.id} className="location-card">
            <img src={location.image} alt={location.name} />
            <h2>{location.name}</h2>
            <p>{location.neighborhood}</p>
            <p>{location.description}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Home