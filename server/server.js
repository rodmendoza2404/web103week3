import express from 'express'
import cors from 'cors'
import locationsRouter from './routes/locations.js'
import eventsRouter from './routes/events.js'

const app = express()

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Virtual Community Space API')
})

app.use('/locations', locationsRouter)
app.use('/events', eventsRouter)

const PORT = 3001

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})