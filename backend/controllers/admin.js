import {
    getCourtsAppointmentDetailsQuery
} from "../models/admin.js";

export const getCourtsAppointmentDetails = async(req,res) => {

    const result = await getCourtsAppointmentDetailsQuery()
    return res.status(200).json(result)
}