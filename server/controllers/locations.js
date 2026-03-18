import { pool } from '../config/database.js'

const getAllLocations = async (req, res) => {
  try {
    const results = await pool.query(`
      SELECT * FROM locations
      ORDER BY id ASC
    `)

    res.status(200).json(results.rows)
  } catch (error) {
    res.status(409).json({ error: error.message })
  }
}

const getLocationById = async (req, res) => {
  try {
    const locationId = req.params.id

    const results = await pool.query(`
      SELECT * FROM locations
      WHERE id = $1
    `, [locationId])

    res.status(200).json(results.rows[0])
  } catch (error) {
    res.status(409).json({ error: error.message })
  }
}

export default {
  getAllLocations,
  getLocationById
}