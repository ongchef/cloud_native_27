import express from 'express';
import {
    getCourtsAppointmentDetails
} from '../controllers/admin.js';

const router = express.Router();

// GET /api/admin/courtsAppointmentDetails
router.get("/courtsAppointmentDetails", getCourtsAppointmentDetails);


export default router
