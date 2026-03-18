import express from 'express'
import EventsController from '../controllers/events.js'

const router = express.Router()

router.get('/', EventsController.getAllEvents)
router.get('/location/:locationId', EventsController.getEventsByLocationId)

export default router