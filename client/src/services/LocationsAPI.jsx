const BASE_URL = 'http://localhost:3001'

export const getAllLocations = async () => {
  const response = await fetch(`${BASE_URL}/locations`)
  if (!response.ok) {
    throw new Error(`Failed to fetch locations: ${response.status}`)
  }
  const data = await response.json()
  return data
}

export const getLocationById = async (id) => {
  const response = await fetch(`${BASE_URL}/locations/${id}`)
  if (!response.ok) {
    throw new Error(`Failed to fetch location ${id}: ${response.status}`)
  }
  const data = await response.json()
  return data
}