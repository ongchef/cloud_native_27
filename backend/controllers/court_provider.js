import {
    getCourtsQuery,
    getCourtsByAdminIdQuery,
    searchCourtsAppointmentsByAdminIdQuery,
    searchCourtsByAdminIdQuery,
    putCourtsByIdQuery,
    postCourtsQuery,
    deleteCourtsByIdQuery,
    isCourtsAdmin,
    isCourtsProvider,
    getCourtsAppointmentByDate,
    insertCourtAvaTime,
    deleteCourtAvaTimeByIdQuery,
    putCourtAvaTimeByIdQuery
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
    try {
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
    } catch (err) {
        console.log(err);
        return res.status(500).send(err)
    }
}

export const getCourtsByAdminId = async(req,res) => {
    try {
    // TODO: the admin_id shoud be automatically added in the request, auth (got it from Frontend)
        // This api has been tested by postman
        const verify_data = {
            "user_id": req.token
        };
        const iscourtsprovider = await isCourtsProvider(verify_data);

        if (iscourtsprovider) {

            const { ball, address, court_name, court_id } = req.query;

            // get court info by court_id
            if (typeof court_id !== "undefined") {
                const courts_info = await getCourtsOrderInfoInIdListQuery(court_id);
                const courts_info_with_time = await Promise.all(
                    courts_info.map(async({...item}) => ({
                        ...item,
                        available_time: await getCourtsAvaTimeByIdQuery(item.court_id)
                    }))
                )
                return res.status(200).json(courts_info_with_time);
            }

            const data = {
                "admin_id": req.token,
                "ball_type_id": ball, 
                "address": address,
                "name": court_name
            }
            const all_courts = await searchCourtsByAdminIdQuery(data)

            // if the court provider do not have any courts registerd
            // or no search results
            // return empty array
            if (all_courts.length == 0) {
                return res.status(200).json([]);
            }

            // paging
            const page = req.query['page'] || 1;
            const limit = 10;
            let offset = (page - 1) * limit;

            const all_courts_id_list = all_courts.map((item) => item.court_id);

            if (offset > all_courts_id_list.length) {
                offset = offset%limit
            }
            const all_courts_id_list_page = all_courts_id_list.slice(offset, offset+limit)

            // return json
            const total_page = Math.ceil(all_courts_id_list.length/limit);

            const all_courts_info = await getCourtsOrderInfoInIdListQuery(all_courts_id_list_page);
            const all_courts_info_with_time = await Promise.all(
                all_courts_info.map(async({...item}) => ({
                    ...item,
                    available_time: await getCourtsAvaTimeByIdQuery(item.court_id)
                }))
            )

            const retrun_json = {
                "total_page": total_page,
                "courts": all_courts_info_with_time
            }
            return res.status(200).json(retrun_json);

        } else {
            return res.status(401).json("You are not the court provider!")
        }
    } catch (err) {
        console.log(err);
        return res.status(500).send(err)
    }
    
}

export const getCourtsAppointmentDetailByCourtId = async(req,res) => {
    try {
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
                        "end_time": item.end_time,
                        "attendence": item.attendence
                    }))
                    const court_info = await getCourtsOrderInfoInIdListQuery(data['court_id']);
                    const court_available_time =  await getCourtsAvaTimeByIdQuery(data['court_id'])

                    const return_json = {
                        ...court_info[0],
                        "appointments": appointment_date,
                        "available_time": court_available_time,
                    }
                    return res.status(200).json(return_json);

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
    } catch (err) {
        console.log(err);
        return res.status(500).send(err)
    }
    
}

export const searchCourtsAppointmentsByAdminId = async(req,res) => {
    try {
        let verify_data = {
            "user_id": req.token
        };
        const iscourtsprovider = await isCourtsProvider(verify_data);
        if (iscourtsprovider) {

            const { ball, address, date } = req.query;
            const data = {};
            data['date'] = date;
            data['date_add_one_day'] = add_one_day(date);
            data['ball_type_id'] = ball;
            data['address'] = address;
            data['admin_id'] = req.token;
            const courts_appointment = await searchCourtsAppointmentsByAdminIdQuery(data)

            // no search results
            // return empty array
            if (courts_appointment.length == 0) {
                return res.status(200).json([]);
            } else {
                // paging
                const page = req.query['page'] || 1;
                const limit = 10;
                let offset = (page - 1) * limit;

                const all_courts_id_list = courts_appointment.map((item) => item.court_id);

                if (offset > all_courts_id_list.length) {
                    offset = offset%limit
                }
                const all_courts_id_list_page = all_courts_id_list.slice(offset, offset+limit)
                
                // return json
                const total_page = Math.ceil(all_courts_id_list.length/limit);
                const all_courts_info = await getCourtsOrderInfoInIdListQuery(all_courts_id_list_page);
                const all_courts_info_with_time = await Promise.all(
                    all_courts_info.map(async({...item}) => ({
                        ...item,
                        available_time: await getCourtsAvaTimeByIdQuery(item.court_id)
                    }))
                )
                const retrun_json = {
                    "total_page": total_page,
                    "courts": all_courts_info_with_time
                }

                return res.status(200).json(retrun_json);
            }

        } else {
            return res.status(401).json("You are not the court provider!")
        }
    } catch (err) {
        console.log(err);
        return res.status(500).send(err)
    }
    
}

export const putCourtsById = async(req,res) => {
    try {
        // TODO: the admin_id shoud be automatically added in the request, auth (got it from Frontend)
        // This api has been tested by postman
        const verify_data = {
            "user_id": req.token
        };
        const iscourtsprovider = await isCourtsProvider(verify_data);
        if (iscourtsprovider) {
            const auth_data = {}
            auth_data['court_id'] = req.query['court_id'];
            auth_data['admin_id'] = req.token;
            const iscourtadmin = await isCourtsAdmin(auth_data);

            if (iscourtadmin) {

                // get the image or update data
                let image_file, update_data;
                let court_data = {}
                let court_ava_time;
                court_data = { ...auth_data };

                if (req.files.length != 0) {
                    for (let i=0; i<req.files.length; i++) {
                        if (req.files[i]['fieldname'] == 'img') {
                            image_file = req.files[i].buffer;
                            const upload_img = await imageClient(image_file);
                            court_data['image_url'] = upload_img['data']['link']
                        } else if (req.files[i]['fieldname'] == 'data') {
                            update_data = JSON.parse(req.files[i].buffer.toString());
                            court_data = {
                                ...court_data,
                                ...update_data
                            }
                            // update ball_type_id if necessary
                            if (typeof court_data['ball_type_id'] !== "undefined") {
                                court_data['ball_type_id'] = court_data['ball_type_id'].toString();
                            }
                            // update available_time if necessary
                            if (typeof court_data['available_time'] !== "undefined") {
                                court_ava_time = JSON.parse(JSON.stringify(court_data['available_time']))
                                delete court_data['available_time'];
                                try {
                                    // delete old available_time first
                                    // the court may not have available time in the table
                                    const delete_court_avatime_result = await deleteCourtAvaTimeByIdQuery(auth_data['court_id'])
                                }
                                finally {
                                    // insert the new available_time
                                    const insert_courttime_results = await insertCourtAvaTime(auth_data['court_id'], court_ava_time)
                                }
                                // const put_court_avatime_result = await Promise.all(
                                //     court_ava_time.map(async(item) => {
                                //         return await putCourtAvaTimeByIdQuery(auth_data['court_id'], item)
                                //     })
                                // )
                            }
                        }
                    }

                } else {
                    return res.status(400).json("Some of data is missing!");
                }
                
                const result = await putCourtsByIdQuery(court_data);
                
                return res.status(200).json(result);
        
            } else {
        
                const message = "You are not the owner of the court!"
                return res.status(401).json(message)
            }
        } else {
            return res.status(401).json("You are not the court provider!")
        }
    } catch (err) {
        console.log(err);
        return res.status(500).send(err)
    }
    
}

export const postCourts = async(req,res) => {
    try {
        // TODO: the fields shoud be automatically added in the req.body (got it from Frontend)
        // This api has been tested by postman
        const verify_data = {
            "user_id": req.token
        };
        const iscourtsprovider = await isCourtsProvider(verify_data);
        if (iscourtsprovider) {
            // get the image and court data
            let image_file, court_data;
            if (req.files.length == 2) {
                for (let i=0; i<req.files.length; i++) {
                    if (req.files[i]['fieldname'] == 'img') {
                        image_file = req.files[i].buffer;
                    } else if (req.files[i]['fieldname'] == 'data') {
                        court_data = JSON.parse(req.files[i].buffer.toString());
                    }
                }

                try{
                    // upload image and insert court table
                    const upload_img = await imageClient(image_file);
                    court_data['admin_id'] = req.token;
                    court_data['image_url'] = upload_img['data']['link']
                    court_data['ball_type_id'] = court_data['ball_type_id'].toString();
                    const available_time = JSON.parse(JSON.stringify(court_data['available_time']))
                    delete court_data['available_time'];
                    const insert_court_result = await postCourtsQuery(court_data);

                    // get the inserted court_id and insert court available time table
                    const court_id = insert_court_result['insertId'];
                    const insert_courttime_results = await insertCourtAvaTime(court_id, available_time)

                    return res.status(200).json("新增完成");

                } catch(error) {
                    console.log(error)
                    return res.status(400).json("Fail to create a court!");
                }
            } else {
                return res.status(400).json("Some of data is missing!");
            }

        } else {
            return res.status(401).json("You are not the court provider!")
        }
    } catch (err) {
        console.log(err);
        return res.status(500).send(err)
    }
    
}

export const deleteCourtsById = async(req,res) => {
    try {
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
    } catch (err) {
        console.log(err);
        return res.status(500).send(err)
    }
    
}