import {
    getCourtsQuery,
    getCourtsByAdminIdQuery,
    getCourtsReservedByCourtIdQuery,
    putCourtsByIdQuery,
    postCourtsQuery,
    deleteCourtsByIdQuery,
    isCourtsAdmin,
    isCourtsProvider,
    getCourtsAppointmentByDate,
} from "../models/court_provider.js";

import {
    getCourtsOrderInfoInIdListQuery,
    getCourtsAvaTimeByIdQuery
} from "../models/appointment.js";

import {
    isUsersExist,
} from '../models/users.js'

import {
    add_one_day,
    imageClient,
} from "../utils/helper.js";

export const getCourts = async(req,res) => {

    const user_token = req.token
    const isusersexist = await isUsersExist(user_token);
    if (!isusersexist) {
        return res.status(401).json("You are not the user!")
    }

    const data = {
        "page": req.query.page
    }
    const result = await getCourtsQuery(data);
    return res.status(200).json(result);

}

export const getCourtsByAdminId = async(req,res) => {

    // TODO: the admin_id shoud be automatically added in the request, auth (got it from Frontend)
    // This api has been tested by postman
    req.body['admin_id'] = req.token;
    const verify_data = {
        "user_id": req.token
    };
    const iscourtsprovider = await isCourtsProvider(verify_data);

    if (iscourtsprovider) {
        const all_courts = await getCourtsByAdminIdQuery(req.body)

        // if the court provider do not have any courts registerd
        // return empty array
        if (all_courts.length == 0) {
            return res.status(200).json([]);
        }

        const all_courts_id_list = all_courts.map((item) => item.court_id);
        const all_courts_info = await getCourtsOrderInfoInIdListQuery(all_courts_id_list);
        const all_courts_info_with_time = await Promise.all(
            all_courts_info.map(async({...item}) => ({
                ...item,
                available_time: await getCourtsAvaTimeByIdQuery(item.court_id)
            }))
        )
        return res.status(200).json(all_courts_info_with_time);

    } else {
        return res.status(401).json("You are not the court provider!")
    }
}

export const getCourtsReservedByCourtId = async(req,res) => {

    // TODO: the admin_id shoud be automatically added in the request, auth (got it from Frontend)
    // This api has been tested by postman
    const verify_data = {
        "user_id": req.token
    };
    const iscourtsprovider = await isCourtsProvider(verify_data);
    if (iscourtsprovider) {

        const data = {};
        data['court_id'] = req.query['court_id'];
        data['date'] = req.query['date']
        data['date_add_one_day'] = add_one_day(req.query['date']);
        data['admin_id'] = req.token;

        const iscourtadmin = await isCourtsAdmin(data);
        if (iscourtadmin){
            const all_courts = await getCourtsByAdminIdQuery(data)
            if (all_courts.length == 0) {
                return res.status(200).json([]);
            }
            // check whether appointment exists on the query date
            const get_appointment_date = await getCourtsAppointmentByDate(data);
            // the court have appointment on the query date
            if (get_appointment_date.length > 0) {
                const appointment_date = get_appointment_date.map((item)=>({
                    "date": req.query['date'],
                    "start_time": item.start_time,
                    "end_time": item.end_time
                }))
                return res.status(200).json(appointment_date);

            // the court does not have appointment on the query date
            // just return a empty array
            } else {
                return res.status(200).json([]);
            }

        } else {
            const message = "You are not the owner of the court!"
            return res.status(401).json(message)
        }
    } else {
        return res.status(401).json("You are not the court provider!")
    }
}

export const putCourtsById = async(req,res) => {

    // TODO: the admin_id shoud be automatically added in the request, auth (got it from Frontend)
    // This api has been tested by postman
    const verify_data = {
        "user_id": req.token
    };
    const iscourtsprovider = await isCourtsProvider(verify_data);
    if (iscourtsprovider) {
        req.body['court_id'] = req.query['court_id'];
        req.body['admin_id'] = req.token;
        const iscourtadmin = await isCourtsAdmin(req.body)
        if (iscourtadmin) {
            if (typeof req.body['ball_type_id'] !== "undefined") {
                req.body['ball_type_id'] = req.body['ball_type_id'].toString();
            }
            const result = await putCourtsByIdQuery(req.body);
            return res.status(200).json(result);
    
        } else {
    
            const message = "You are not the owner of the court!"
            return res.status(401).json(message)
        }
    } else {
        return res.status(401).json("You are not the court provider!")
    }
}

export const postCourts = async(req,res) => {
    
    // TODO: the fields shoud be automatically added in the req.body (got it from Frontend)
    // This api has been tested by postman
    const verify_data = {
        "user_id": req.token
    };
    const iscourtsprovider = await isCourtsProvider(verify_data);
    if (iscourtsprovider) {
        // get the image and court data
        const image_file = req.files[0].buffer;
        let court_data = JSON.parse(req.files[1].buffer.toString());

        try{
            const upload_img = await imageClient(image_file);
            court_data['admin_id'] = req.token;
            court_data['image_url'] = upload_img['data']['link']
            court_data['ball_type_id'] = court_data['ball_type_id'].toString();
            const result = await postCourtsQuery(court_data);
            return res.status(200).json(result);
        } catch(error) {
            console.log(error)
            return res.status(400).json("Fail to create a court!");
        }

    } else {
        return res.status(401).json("You are not the court provider!")
    }
}

export const deleteCourtsById = async(req,res) => {

    // TODO: the admin_id shoud be automatically added in the request, auth (got it from Frontend)
    // This api has been tested by postman
    const verify_data = {
        "user_id": req.token
    };
    const iscourtsprovider = await isCourtsProvider(verify_data);
    if (iscourtsprovider) {

        req.body['court_id'] = req.query['court_id'];
        req.body['admin_id'] = req.token;
        const iscourtadmin = await isCourtsAdmin(req.body)
    
        if (iscourtadmin) {
    
            const result = await deleteCourtsByIdQuery(req.body);
            return res.status(200).json(result);
    
        } else {
    
            const message = "You are not the owner of the court!"
            return res.status(401).json(message)
        }

    } else {
        return res.status(401).json("You are not the court provider!")
    }
}