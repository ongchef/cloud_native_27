import express from 'express'
import {
    getCourts,
    getCourtsByAdminId,
    getCourtsReservedByCourtId,
    putCourtsInfoById,
    postCreateCourts,
    deleteCourtsById
} from '../controllers/court_provider.js';

const router = express.Router();

// GET /api/courts
router.get("/", getCourts);

// GET /api/courts/admin
router.get("/admin", getCourtsByAdminId)

// GET /api/courts/reserved/:court_id
router.get("/reserved/:court_id", getCourtsReservedByCourtId);

// PUT /api/courts/:court_id
router.put("/:court_id", putCourtsInfoById);

// POST /api/courts
router.post("/", postCreateCourts)

// DELETE /api/courts/:court_id
router.delete("/:court_id", deleteCourtsById)


export default router