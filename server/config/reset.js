import { pool } from './database.js'

const dropTables = async () => {
  const dropLocationsTable = 'DROP TABLE IF EXISTS locations CASCADE'
  const dropEventsTable = 'DROP TABLE IF EXISTS events CASCADE'

  await pool.query(dropEventsTable)
  await pool.query(dropLocationsTable)
}

const createTables = async () => {
  const createLocationsTable = `
    CREATE TABLE IF NOT EXISTS locations (
      id SERIAL PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      neighborhood VARCHAR(100) NOT NULL,
      image TEXT NOT NULL,
      description TEXT NOT NULL
    )
  `

  const createEventsTable = `
    CREATE TABLE IF NOT EXISTS events (
      id SERIAL PRIMARY KEY,
      title VARCHAR(150) NOT NULL,
      event_date DATE NOT NULL,
      event_time VARCHAR(50) NOT NULL,
      category VARCHAR(100) NOT NULL,
      price VARCHAR(50) NOT NULL,
      description TEXT NOT NULL,
      image TEXT NOT NULL,
      location_id INT NOT NULL,
      FOREIGN KEY (location_id) REFERENCES locations(id) ON DELETE CASCADE
    )
  `

  await pool.query(createLocationsTable)
  await pool.query(createEventsTable)
}

const seedTables = async () => {
  const insertLocations = `
    INSERT INTO locations (name, neighborhood, image, description)
    VALUES
      (
        'Wynwood Walls',
        'Wynwood',
        'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80',
        'A vibrant arts district known for murals, live music, pop-ups, and nightlife.'
      ),
      (
        'Ball & Chain',
        'Little Havana',
        'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=800&q=80',
        'A classic Little Havana destination for salsa, live Latin music, and local culture.'
      ),
      (
        'Lummus Park',
        'South Beach',
        'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
        'A scenic beachfront area known for outdoor events, wellness activities, and nightlife nearby.'
      ),
      (
        'Bayside Marketplace',
        'Downtown Miami',
        'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=800&q=80',
        'A waterfront hotspot with shopping, live performances, and city events.'
      )
  `

  const insertEvents = `
    INSERT INTO events (title, event_date, event_time, category, price, description, image, location_id)
    VALUES
      (
        'Wynwood Art Walk',
        '2026-03-25',
        '7:00 PM',
        'Art',
        'Free',
        'Explore galleries, murals, food trucks, and live performances throughout Wynwood.',
        'https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=800&q=80',
        1
      ),
      (
        'Rooftop DJ Night',
        '2026-03-28',
        '9:00 PM',
        'Music',
        '$20',
        'A rooftop party with local DJs, cocktails, and skyline views.',
        'https://m-rad.com/wp-content/uploads/2024/12/Fabel-Dj-Booth-2.jpg',
        1
      ),
      (
        'Salsa Night Live',
        '2026-03-22',
        '8:00 PM',
        'Dance',
        '$15',
        'An energetic salsa night with live band performances and dancing.',
        'https://images.unsplash.com/photo-1504609773096-104ff2c73ba4?auto=format&fit=crop&w=800&q=80',
        2
      ),
      (
        'Cuban Coffee Tasting',
        '2026-03-24',
        '5:00 PM',
        'Food',
        '$10',
        'Taste traditional Cuban coffee blends and learn about local history.',
        'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=800&q=80',
        2
      ),
      (
        'Sunset Yoga by the Beach',
        '2026-03-21',
        '6:30 PM',
        'Wellness',
        'Free',
        'Join a guided yoga session during sunset by the ocean.',
        'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80',
        3
      ),
      (
        'Beachside Movie Night',
        '2026-03-29',
        '8:30 PM',
        'Entertainment',
        'Free',
        'Bring a blanket and enjoy an outdoor film screening under the stars.',
        'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=800&q=80',
        3
      ),
      (
        'Bayside Live Music',
        '2026-03-23',
        '7:30 PM',
        'Music',
        'Free',
        'Enjoy a live waterfront music performance with local artists.',
        'https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=800&q=80',
        4
      ),
      (
        'Night Market Miami',
        '2026-03-30',
        '6:00 PM',
        'Market',
        'Free',
        'Shop local vendors, try street food, and enjoy performances at the night market.',
        'https://images.unsplash.com/photo-1521334884684-d80222895322?auto=format&fit=crop&w=800&q=80',
        4
      )
  `

  await pool.query(insertLocations)
  await pool.query(insertEvents)
}

const resetDatabase = async () => {
  try {
    await dropTables()
    await createTables()
    await seedTables()
    console.log('Database reset and seeded successfully')
  } catch (error) {
    console.error('Error resetting database:', error)
  } finally {
    await pool.end()
  }
}

resetDatabase()