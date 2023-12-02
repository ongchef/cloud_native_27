import {
    getCourtsQuery,
    getCourtsByAdminIdQuery,
    getCourtsReservedByCourtIdQuery,
    putCourtsByIdQuery,
    postCourtsQuery,
    deleteCourtsByIdQuery,
    isCourtsProvider,
} from "../models/court_provider.js";

export const getCourts = async(req,res) => {

    const result = await getCourtsQuery();
    return res.status(200).json(result);

}

export const getCourtsByAdminId = async(req,res) => {

    // TODO: the admin_id shoud be automatically added in the request, auth (got it from Frontend)
    // This api has been tested by postman
    req.body['admin_id'] = req.token;
    const result = await getCourtsByAdminIdQuery(req.body)
    return res.status(200).json(result)
}

export const getCourtsReservedByCourtId = async(req,res) => {

    // TODO: the admin_id shoud be automatically added in the request, auth (got it from Frontend)
    // This api has been tested by postman
    req.body['court_id'] = req.params['court_id'];
    req.body['admin_id'] = req.token;
    const iscourtproiver = await isCourtsProvider(req.body)

    if (iscourtproiver) {

        const result = await getCourtsReservedByCourtIdQuery(req.body);
        return res.status(200).json(result);

    } else {

        const message = "You are not the owner of the court!"
        return res.status(401).send(message)
    }
}

export const putCourtsById = async(req,res) => {

    // TODO: the admin_id shoud be automatically added in the request, auth (got it from Frontend)
    // This api has been tested by postman
    
    req.body['court_id'] = req.params['court_id'];
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
    
    req.body['court_id'] = req.params['court_id'];
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