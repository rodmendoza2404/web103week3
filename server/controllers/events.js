import { pool } from '../config/database.js'

const getAllEvents = async (req, res) => {
  try {
    const results = await pool.query(`
      SELECT * FROM events
      ORDER BY event_date ASC
    `)

    res.status(200).json(results.rows)
  } catch (error) {
    res.status(409).json({ error: error.message })
  }
}

const getEventsByLocationId = async (req, res) => {
  try {
    const locationId = req.params.locationId

    const results = await pool.query(`
      SELECT * FROM events
      WHERE location_id = $1
      ORDER BY event_date ASC
    `, [locationId])

    res.status(200).json(results.rows)
  } catch (error) {
    res.status(409).json({ error: error.message })
  }
}

export default {
  getAllEvents,
  getEventsByLocationId
}