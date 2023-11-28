import {
    getCourtsQuery,
    getCourtsByAdminIdQuery,
    getCourtsReservedByCourtIdQuery,
    putCourtsInfoByIdQuery,
    postCreateCourtsQuery,
    deleteCourtsByIdQuery,
} from "../models/court_provider.js";

export const getCourts = async(req,res) => {

    const result = await getCourtsQuery();
    return res.status(200).json(result);

}

export const getCourtsByAdminId = async(req,res) => {

    // TODO: the admin_id shoud be automatically added in the req.body (got it from Frontend)
    // This api has been tested by postman (add admin_id in req.body), and it could work

    const result = await getCourtsByAdminIdQuery(req.body)
    return res.status(200).json(result)
}

export const getCourtsReservedByCourtId = async(req,res) => {

    // TODO: the admin_id shoud be automatically added in the req.body (got it from Frontend)
    // This api has been tested by postman (add admin_id in req.body), and it could work
    
    req.body['court_id'] = req.params['court_id'];
    const result = await getCourtsReservedByCourtIdQuery(req.body);

    return res.status(200).json(result);
}

export const putCourtsInfoById = async(req,res) => {

    // TODO: the admin_id shoud be automatically added in the req.body (got it from Frontend)
    // This api has been tested by postman, and it could work
    
    req.body['court_id'] = req.params['court_id'];
    const result = await putCourtsInfoByIdQuery(req.body);

    return res.status(200).json(result);
}

export const postCreateCourts = async(req,res) => {
    
    // TODO: the fields shoud be automatically added in the req.body (got it from Frontend)
    // This api has been tested by postman, and it could work

    const result = await postCreateCourtsQuery(req.body);

    return res.status(200).json(result);

}

export const deleteCourtsById = async(req,res) => {

    // TODO: the admin_id shoud be automatically added in the req.body (got it from Frontend)
    // This api has been tested by postman, and it could work
    
    req.body['court_id'] = req.params['court_id'];
    const result = await deleteCourtsByIdQuery(req.body);

    return res.status(200).json(result);
}