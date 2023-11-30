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

// PUT /api/courts/:court_id
router.put("/:court_id", putCourtsById);

// DELETE /api/courts/:court_id
router.delete("/:court_id", deleteCourtsById)

// GET /api/courts/admin
router.get("/admin", getCourtsByAdminId)

// GET /api/courts/:court_id/reserved
router.get("/:court_id/reserved", getCourtsReservedByCourtId);


export default router