import express from 'express'
import {
    getCourts,
    getCourtsByAdminId,
    getCourtsReservedByCourtId,
    putCourtsById,
    postCourts,
    deleteCourtsById
} from '../controllers/court_provider.js';
import { upload } from '../middleware/multer.js';

const router = express.Router();

// GET /api/courts
router.get("/", getCourts);

// POST /api/courts
router.post("/", upload, postCourts)

// PUT /api/courts
router.put("/", upload, putCourtsById);

// DELETE /api/courts
router.delete("/", deleteCourtsById)

// GET /api/courts/admin
router.get("/admin", getCourtsByAdminId)

// GET /api/courts/reserved
router.get("/reserved", getCourtsReservedByCourtId);


export default router