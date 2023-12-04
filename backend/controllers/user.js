import {
    getUsersQuery,
    getUsersByIdQuery,
    putUsersQuery,
    postUsersRegisterQuery,
    postUsersLoginQuery,
    getUsersAppointmentIdQuery,
    postUsersAppointmentQuery,
    isDuplicateName,
    isDuplicateEmail,
    isUsersExist,
} from '../models/users.js'

import {
    getCourtsAppointmentsQuery,
    getCourtsInfoByAppointmentIdQuery,
    getCourtsIdByAppointmentIdQuery,
    getCourtsNotInIdListQuery,
    getCourtsOrderInfoInIdListQuery,
    addParticipantQuery,
    addAppointmentTimeQuery,
    getCourtsAvaTimeByIdQuery,
    putAttendenceQuery,
} from '../models/appointment.js';

import {
    availableCourtChecker,
    joinableCourtChecker,
    hashPassword,
    comparePassword,
    generate_uuid,
    parseISODate
} from '../utils/helper.js';

import {
    getCourtsQuery
} from '../models/court_provider.js';


export const getUsers = async(req,res) =>{

    const result = await getUsersQuery()

    return res.status(200).json(result)
}

export const getUsersById = async(req,res) =>{
    
    const user_token = req.token
    const result = await getUsersByIdQuery(user_token)
    return res.status(200).json(result)
}

export const postUsers = async(req,res) => {

    const { name, email, password } = req.body;

    const isduplicateemail = await isDuplicateEmail(email);
    const isduplicatename = await isDuplicateName(name);

    if (isduplicatename && isduplicateemail) {

        return res.send("名稱和電子郵件重複!");
    } else if (isduplicatename) {

        return res.send("名稱重複!");
    } else if (isduplicateemail){

        return res.send("電子郵件重複!");
    } else {

        // hash password
        const hashed_password = await hashPassword(password);
        req.body['password'] = hashed_password;
        // generate user uuid
        req.body['user_id'] = generate_uuid();
        const result = await postUsersRegisterQuery(req.body)
        return res.status(200).json(result)
    }
}

export const putUsers = async(req,res) => {

    req.body["user_id"] = req.token;
    
    const result = await putUsersQuery(req.body);
    return res.status(200).json(result);

}

export const postUsersLogin = async(req,res) => {
    
    const { name, password } = req.body;
    const isusersexist = await isUsersExist(name);
    if (isusersexist.length > 0){
        const result = await postUsersLoginQuery(name);
        const hashed_password_in_db = result[0].password;
        const isSamePassword = await comparePassword(password, hashed_password_in_db);
        if (isSamePassword) {
            // login success, return user token
            return res.status(200).json(result[0].user_id);
        } else {
            return res.send("密碼錯誤!")
        }
    } else {
        return res.send("查無用戶名稱!")
    }
}

export const getUsersAppointmentHistory = async(req,res) => {

    const user_token = req.token;

    const app_id = await getUsersAppointmentIdQuery(user_token);
    const app_id_list = app_id.map(item => item.appointment_id);
    const app_history = await getCourtsInfoByAppointmentIdQuery(app_id_list)

    return res.status(200).json(app_history);
}

export const postUsersAppointment = async(req,res) => {

    const user_id = req.token;
    const { date, start_time, end_time, ...appointment_cols } = req.body;

    try {
        // insert appointment table first
        const app_result = await postUsersAppointmentQuery({
            "creator_id": user_id,
            "attendence": 1, // first order a court, creator as an attendence
            ...appointment_cols,
        });

        // if sucessfully inserted, also insert participant table
        const par_data = {
            "user_id": user_id,
            "appointment_id": app_result.insertId
        }
        const par_result = await addParticipantQuery(par_data);
        // if sucessfully inserted, also insert appointment time table
        const at_data = {
            "appointment_id": app_result.insertId,
            "date": date,
            "start_time": start_time,
            "end_time": end_time
        }
        const at_result = await addAppointmentTimeQuery(at_data);
        res.status(200).json("預約成功!");
        
    } catch {
        res.send("預約失敗!")
    }
}

export const getUsersAppointment = async(req,res) => {
    
    const appointments = await getCourtsAppointmentsQuery();
    const { query_time } = req.body;
    const unavailable_appointment_id_set = new Set();
    for (let i = 0; i < appointments.length; i++){
        // solve the ISOdate issue
        appointments[i]['date'] = parseISODate(appointments[i]['date'])
        if (availableCourtChecker(appointments[i], query_time)) {
            unavailable_appointment_id_set.add(appointments[i]['appointment_id']);
        }
    }

    // there are unavailable courts according to the query time period
    if (unavailable_appointment_id_set.size !== 0) {

        let unavailable_appointment_id_list = [...unavailable_appointment_id_set];
        const unavailable_courts_id = await getCourtsIdByAppointmentIdQuery(unavailable_appointment_id_list)
        const unavailable_court_id_list = unavailable_courts_id.map((item) => item.court_id);
        const available_courts_id = await getCourtsNotInIdListQuery(unavailable_court_id_list);
        const available_courts_id_list = available_courts_id.map((item) => item.court_id);
        const available_courts = await getCourtsOrderInfoInIdListQuery(available_courts_id_list);
        const available_courts_with_time = await Promise.all(
            available_courts.map(async({...item}) => ({
                ...item,
                available_time: await getCourtsAvaTimeByIdQuery(item.court_id)
            }))
        )
        return res.status(200).json(available_courts_with_time);
    
    // there are not unavailable courts according to the query time period
    // return all courts
    } else {
        const all_courts = await getCourtsQuery();
        const all_courts_id_list = all_courts.map((item) => item.court_id);
        const result = await getCourtsOrderInfoInIdListQuery(all_courts_id_list);
        const all_courts_with_time = await Promise.all(
            result.map(async({...item}) => ({
                ...item,
                available_time: await getCourtsAvaTimeByIdQuery(item.court_id)
            }))
        )
        return res.status(200).json(all_courts_with_time);
    }
}



export const getUsersAppointmentJoin = async(req,res) => {
    
    const appointments = await getCourtsAppointmentsQuery();
    const { query_time } = req.body;
    const { public_index } = req.body;
    const joinable_appointment_id_set = new Set();
    for (let i = 0; i < appointments.length; i++){
        // solve the ISOdate issue
        appointments[i]['date'] = parseISODate(appointments[i]['date'])
        if (joinableCourtChecker(appointments[i], query_time)) {
            // check private or public
            if (appointments[i]['public'] == public_index){
                joinable_appointment_id_set.add(appointments[i]['appointment_id']);
            }
        }
    }
    // there are joinable courts according to the query time period
    if (joinable_appointment_id_set.size !== 0) {

        let joinable_appointment_id_list = [...joinable_appointment_id_set];
        const joinable_courts_info = await getCourtsInfoByAppointmentIdQuery(joinable_appointment_id_list)
        return res.status(200).json(joinable_courts_info);
    
    // there are not joinable courts according to the query time period
    } else {

        return res.status(200).json("查詢時段無可加入的球場!");
    }
}

// TODO: if attendence > available -> join failed
export const postUsersAppointmentJoin = async(req,res) => {

    const user_id = req.token;
    const { appointment_id } = req.body;

    const par_data = {
        "user_id": user_id,
        "appointment_id": appointment_id
    }
    const par_result = await addParticipantQuery(par_data);
    // update attendence column
    const app_result = await putAttendenceQuery(appointment_id);
    res.status(200).json("加入成功!");
        
}
