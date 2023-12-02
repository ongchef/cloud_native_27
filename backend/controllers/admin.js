import {
    getCourtsAppointmentDetailsQuery,
    getCourtsAppointmentQuery,
    isAdmin
} from "../models/admin.js";

export const getCourtsAppointmentDetails = async(req,res) => {

    // TODO: the admin_id shoud be automatically added in the request, auth (got it from Frontend)
    // This api has been tested by postman
    req.body['court_id'] = req.query['court_id'];
    req.body['admin_id'] = req.token;
    const isadmin = await isAdmin(req.body)
    if (isadmin) {
        const result = await getCourtsAppointmentDetailsQuery(req.body)
        return res.status(200).json(result)

    } else {

        const message = "You are not the admin!"
        return res.status(401).send(message)
    }
}


export const getCourtsAppointments = async(req,res) => {

    // TODO: the admin_id shoud be automatically added in the request, auth (got it from Frontend)
    // This api has been tested by postman
    req.body['admin_id'] = req.token;
    const isadmin = await isAdmin(req.body)
    if (isadmin) {
        
        const result = await getCourtsAppointmentQuery()
        return res.status(200).json(result)

    } else {

        const message = "You are not the admin!"
        return res.status(401).send(message)
    }
}