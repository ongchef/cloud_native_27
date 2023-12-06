import {
    getCourtsQuery,
    getCourtsByAdminIdQuery,
    getCourtsReservedByCourtIdQuery,
    putCourtsByIdQuery,
    postCourtsQuery,
    deleteCourtsByIdQuery,
    isCourtsProvider,
    getCourtsAppointmentByDate
} from "../models/court_provider.js";

import {
    getCourtsOrderInfoInIdListQuery,
    getCourtsAvaTimeByIdQuery
} from "../models/appointment.js";

import {
    add_one_day
} from "../utils/helper.js";

export const getCourts = async(req,res) => {

    const result = await getCourtsQuery();
    return res.status(200).json(result);

}

export const getCourtsByAdminId = async(req,res) => {

    // TODO: the admin_id shoud be automatically added in the request, auth (got it from Frontend)
    // This api has been tested by postman
    req.body['admin_id'] = req.token;
    const all_courts = await getCourtsByAdminIdQuery(req.body)
    const all_courts_id_list = all_courts.map((item) => item.court_id);
    const all_courts_info = await getCourtsOrderInfoInIdListQuery(all_courts_id_list);
    const all_courts_info_with_time = await Promise.all(
        all_courts_info.map(async({...item}) => ({
            ...item,
            available_time: await getCourtsAvaTimeByIdQuery(item.court_id)
        }))
    )
    return res.status(200).json(all_courts_info_with_time);
}

export const getCourtsReservedByCourtId = async(req,res) => {

    // TODO: the admin_id shoud be automatically added in the request, auth (got it from Frontend)
    // This api has been tested by postman
    const data = {}
    data['court_id'] = req.query['court_id'];
    data['date'] = req.query['date']
    data['date_add_one_day'] = add_one_day(req.query['date']);
    data['admin_id'] = req.token;

    const iscourtproiver = await isCourtsProvider(data)

    if (iscourtproiver) {

        // check whether appointment exists on the query date
        const get_appointment_date = await getCourtsAppointmentByDate(data);
        // the court have appointment on the query date
        if (get_appointment_date.length > 0) {
            const appointment_date = get_appointment_date.map((item)=>({
                "date": req.query['date'],
                "start_time": item.start_time,
                "end_time": item.end_time
            }))
            res.status(200).json(appointment_date);

        // the court does not have appointment on the query date
        // just return the query date
        } else {
            const appointment_date = {
                "date": req.query['date']
            }
            res.status(200).json(appointment_date);
        }

    } else {

        const message = "You are not the owner of the court!"
        return res.status(401).send(message)
    }
}

export const putCourtsById = async(req,res) => {

    // TODO: the admin_id shoud be automatically added in the request, auth (got it from Frontend)
    // This api has been tested by postman
    
    req.body['court_id'] = req.query['court_id'];
    req.body['admin_id'] = req.token;
    const iscourtproiver = await isCourtsProvider(req.body)
    if (iscourtproiver) {

        const result = await putCourtsByIdQuery(req.body);
        return res.status(200).json(result);

    } else {

        const message = "You are not the owner of the court!"
        return res.status(401).send(message)
    }
}

export const postCourts = async(req,res) => {
    
    // TODO: the fields shoud be automatically added in the req.body (got it from Frontend)
    // This api has been tested by postman

    const result = await postCourtsQuery(req.body);

    return res.status(200).json(result);

}

export const deleteCourtsById = async(req,res) => {

    // TODO: the admin_id shoud be automatically added in the request, auth (got it from Frontend)
    // This api has been tested by postman
    
    req.body['court_id'] = req.query['court_id'];
    req.body['admin_id'] = req.token;
    const iscourtproiver = await isCourtsProvider(req.body)

    if (iscourtproiver) {

        const result = await deleteCourtsByIdQuery(req.body);
        return res.status(200).json(result);

    } else {

        const message = "You are not the owner of the court!"
        return res.status(401).send(message)
    }
}