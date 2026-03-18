import { Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import LocationDetails from './pages/LocationDetails'
import AllEvents from './pages/AllEvents'
import PageNotFound from './pages/PageNotFound'
import './App.css'

function App() {
  return (
    <>
      <nav className="navbar">
        <Link to="/">Home</Link>
        <Link to="/events">All Events</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/locations" element={<Home />} />
        <Route path="/locations/:id" element={<LocationDetails />} />
        <Route path="/events" element={<AllEvents />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  )
}

export default App