import {
    getCourtsAppointmentDetailsQuery,
    getCourtsAppointmentQuery,
    postCourtsProviderQuery,
    getUserHistoriesQuery,
    putUsersByIdQuery,
    deleteUsersByIdQuery,
    isAdmin
} from "../models/admin.js";
import {
    getUsersAppointmentIdQuery,
    getUsersByIdQuery,
    isDuplicateName,
    isDuplicateEmail,
} from '../models/users.js'
import {
    getCourtsInfoByAppointmentIdQuery,
} from '../models/appointment.js';
import {
    hashPassword,
} from '../utils/helper.js';

import { v4 as uuidv4 } from 'uuid';


export const getCourtsAppointmentDetails = async(req,res) => {

    // TODO: the admin_id shoud be automatically added in the request, auth (got it from Frontend)
    // This api has been tested by postman
    let data = {};
    data['court_id'] = req.query['court_id'];
    const admin_id = req.token;
    const isadmin = await isAdmin(admin_id)
    if (isadmin) {
        const result = await getCourtsAppointmentDetailsQuery(data)
        return res.status(200).json(result)

    } else {

        const message = "You are not the admin!"
        return res.status(401).send(message)
    }
}


export const getUserHistories = async(req,res) => {

    // TODO: the admin_id shoud be automatically added in the request, auth (got it from Frontend)
    // This api has been tested by postman
    let data = {};
    
    const admin_id = req.token;
    const isadmin = await isAdmin(admin_id)
    if (isadmin) {
        
        const result = await getUserHistoriesQuery()
        return res.status(200).json(result)

    } else {

        const message = "You are not the admin!"
        return res.status(401).send(message)
    }
}

export const getUserHistoryDetails = async(req,res) => {

    // TODO: the admin_id shoud be automatically added in the request, auth (got it from Frontend)
    // This api has been tested by postman
    let data = {};
    data['user_id'] = req.query['user_id'];
    const admin_id = req.token;
    const isadmin = await isAdmin(admin_id)
    if (isadmin) {
        const app_id = await getUsersAppointmentIdQuery(data['user_id'])
        const app_id_list = app_id.map(item => item.appointment_id);
        const history = await getCourtsInfoByAppointmentIdQuery(app_id_list)
        return res.status(200).json(history)

    } else {

        const message = "You are not the admin!"
        return res.status(401).send(message)
    }
}


export const getCourtsAppointments = async(req,res) => {

    // TODO: the admin_id shoud be automatically added in the request, auth (got it from Frontend)
    // This api has been tested by postman
    const admin_id = req.token;

    const isadmin = await isAdmin(admin_id)
    if (isadmin) {
        let limit = 10;
        let page = req.query['page'];
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;

        const result = await getCourtsAppointmentQuery(req.query)
        const paginatedResults = result.slice(startIndex, endIndex);
        const total_page = Math.ceil(result.length/limit);
        const returns = {
            "total_page": total_page,
            "courts": paginatedResults
        }
        return res.status(200).json(returns)

    } else {

        const message = "You are not the admin!"
        return res.status(401).send(message)
    }
}

export const courtsProvider = async(req,res) => {

    // TODO: the admin_id shoud be automatically added in the request, auth (got it from Frontend)
    // This api has been tested by postman
    // Generate a v4 (random) UUID
    const newUserId = uuidv4();

    let data = {};
    const admin_id = req.token;
    data['user_id'] = newUserId;
    data['line_id'] = null;
    data['role_id'] = 3;
    data['name'] = req.body['name'];
    data['email'] = req.body['email'];
    data['phone'] = req.body['phone'];
    data['line_id'] = req.body['line_id']

    const isduplicateemail = await isDuplicateEmail(data['email']);
    const isduplicatename = await isDuplicateName(data['name']);

    if (isduplicatename && isduplicateemail) {

        return res.send("名稱和電子郵件重複!");
    } else if (isduplicatename) {

        return res.send("名稱重複!");
    } else if (isduplicateemail){

        return res.send("電子郵件重複!");
    } else {

        // hash password
        const hashed_password = await hashPassword(req.body['password']);
        data['password'] = hashed_password;
        const isadmin = await isAdmin(admin_id)
        if (isadmin) {
            
            let result = {}
            result['message'] = await postCourtsProviderQuery(data)
            result['user_id'] = newUserId
            result['role_id'] = 3
            return res.status(200).json(result)

        } else {

            const message = "You are not the admin!"
            return res.status(401).send(message)
        }
    }
}

export const putUsersById = async(req,res) => {

    // TODO: the admin_id shoud be automatically added in the request, auth (got it from Frontend)
    // This api has been tested by postman
    let data = req.body;
    data['user_id'] = req.query['user_id'];
    const admin_id = req.token;

    const isduplicateemail = await isDuplicateEmail(data['email']);
    const isduplicatename = await isDuplicateName(data['name']);
    const userRole = await getUsersByIdQuery(data['user_id']);
    if (userRole.length === 0) {

        return res.send("沒有此使用者")
    }

    if (isduplicatename && isduplicateemail) {

        return res.send("名稱和電子郵件重複!");
    } else if (isduplicatename) {

        return res.send("名稱重複!");
    } else if (isduplicateemail){

        return res.send("電子郵件重複!");
    } else if (userRole[0]['role_id'] !== 2){

        return res.send("被更改身份非使用者!");
    } else {

        // hash password
        const hashed_password = await hashPassword(req.body['password']);
        data['password'] = hashed_password;
        const isadmin = await isAdmin(admin_id)
        if (isadmin) {
            
            const result = await putUsersByIdQuery(data)
            return res.status(200).json(result)

        } else {

            const message = "You are not the admin!"
            return res.status(401).send(message)
        }
    }
}

export const deleteUsersById = async(req,res) => {

    // TODO: the admin_id shoud be automatically added in the request, auth (got it from Frontend)
    // This api has been tested by postman
    
    let user_id = req.query['user_id']
    let admin_id = req.token;
    const isadmin = await isAdmin(admin_id);
    const userRole = await getUsersByIdQuery(user_id);
    if (userRole.length === 0) {

        return res.send("沒有此使用者")
    }
    if (isadmin) {
        if (userRole[0]['role_id'] !== 2){

            return res.send("被刪除身份非使用者!");
        } else {

            const result = await deleteUsersByIdQuery(user_id)
            return res.status(200).json(result)
        }
    } else {

        const message = "You are not the admin!"
        return res.status(401).send(message)
    }
}