import express from 'express';
import {
    getCourtsAppointmentDetails,
    getCourtsAppointments,
} from '../controllers/admin.js';

const router = express.Router();

// GET /api/admin/courtsAppointmentDetails
router.get("/court", getCourtsAppointments);

// GET /api/admin/:court_id
router.get("/courtDetail/", getCourtsAppointmentDetails);

export default router
