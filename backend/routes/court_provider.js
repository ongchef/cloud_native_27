import express from 'express'
import {
    getCourts,
    getCourtsByAdminId,
    getCourtsReservedByCourtId,
    putCourtsById,
    postCourts,
    deleteCourtsById
} from '../controllers/court_provider.js';

const router = express.Router();

// GET /api/courts
router.get("/", getCourts);

// POST /api/courts
router.post("/", postCourts)

// PUT /api/courts
router.put("/", putCourtsById);

// DELETE /api/courts
router.delete("/", deleteCourtsById)

// GET /api/courts/admin
router.get("/admin", getCourtsByAdminId)

// GET /api/courts/reserved
router.get("/reserved", getCourtsReservedByCourtId);


export default router