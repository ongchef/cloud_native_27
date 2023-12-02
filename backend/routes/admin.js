import express from 'express';
import {
    getCourtsAppointmentDetails,
    getCourtsAppointments,
} from '../controllers/admin.js';

const router = express.Router();

// GET /api/admin/courtsAppointmentDetails
router.get("/getCourtsAppointments", getCourtsAppointments);

// GET /api/admin/:court_id
router.get("/getCourtsAppointmentDetails/", getCourtsAppointmentDetails);

export default router
