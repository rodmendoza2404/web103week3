const BASE_URL = 'http://localhost:3001'

export const getAllEvents = async () => {
  const response = await fetch(`${BASE_URL}/events`)
  const data = await response.json()
  return data
}

export const getEventsByLocationId = async (locationId) => {
  const response = await fetch(`${BASE_URL}/events/location/${locationId}`)
  const data = await response.json()
  return data
}