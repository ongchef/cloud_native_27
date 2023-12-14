import express from 'express';
import {
    getCourtsAppointmentDetails,
    getCourtsAppointments,
    getUserHistoryDetails,
    getUserHistories,
    putUsersById,
    deleteUsersById,
    courtsProvider,
    getAllProviders,
    getUserDetail
} from '../controllers/admin.js';

const router = express.Router();

// GET /api/admin/court
router.get("/court", getCourtsAppointments);

// GET /api/admin/courtDetail?court_id=
router.get("/courtDetail", getCourtsAppointmentDetails);

// GET /api/admin/userHistories
router.get("/userHistories", getUserHistories);

// GET /api/admin/userHistoryDetail?user_id=
router.get("/userHistoryDetails", getUserHistoryDetails);

// POST /api/admin/courtsProvider
router.post("/courtsProvider", courtsProvider);

// PUT /api/admin/user?user_id
router.put("/user", putUsersById);

// DELETE /api/admin/user?user_id
router.delete("/user", deleteUsersById);

// GET /api/admin/getProviders
router.get("/getProviders", getAllProviders);

// GET /api/admin/getUserDetail
router.get("/getUserDetail", getUserDetail);

export default router
