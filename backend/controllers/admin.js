import {
    getCourtsAppointmentDetailsQuery,
    getCourtsAppointmentQuery,
    getCourtAllAppointment,
    postCourtsProviderQuery,
    getUserHistoriesQuery,
    putUsersByIdQuery,
    deleteUsersByIdQuery,
    isAdmin,
    getProviders
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
    availableCourtChecker,
    parseISODate
} from '../utils/helper.js';

import { v4 as uuidv4 } from 'uuid';

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
        if (app_id.length === 0) {
            
            const message = "User doesn't exist!"
            return res.status(404).send(message)
        }
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
    req.query['query_time'] = req.query['query_time'].replace(/\+/g, ' ')

    const isadmin = await isAdmin(admin_id)
    if (isadmin) {
        const result = await getCourtsAppointmentQuery(req.query)
        //date filter
        let courts = []
        //if time is 00:00:00
        if (req.query['query_time'].split(" ")[1] === "00:00:00") {
            for (let i = 0; i < result.length; i++) {
                let court = await getCourtAllAppointment(result[i]['court_id'])
                let found = 0;
                for (let j = 0; j < court.length; j++) {
                    court[j]['date'] = parseISODate(court[j]['date'])
    
                    if (court[j]['date'].split(" ")[0] === req.query['query_time'].split(" ")[0]) {
                        found = 1
                        break;
                    }
                }
                if (found === 1) {
                    courts.push(result[i])
                }                
            }
        } else {
            for(let i = 0; i < result.length; i++) {
                let court = await getCourtAllAppointment(result[i]['court_id'])
                let found = 0;
                for(let j = 0; j < court.length; j++) {
                    court[j]['date'] = parseISODate(court[j]['date'])
    
                    if(availableCourtChecker(court[j], req.query['query_time'])) {
                        found = 1
                        break;
                    }
                }
                if (found === 1) {
                    courts.push(result[i])
                }
            }
        }
              
        //pagination and count the total page
        let limit = 10;
        let page = req.query['page'] !== undefined ? req.query['page'] : 1;
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;

        const paginatedResults = courts.slice(startIndex, endIndex);
        const total_page = Math.ceil(courts.length/limit);
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

export const getCourtsAppointmentDetails = async(req,res) => {

    // TODO: the admin_id shoud be automatically added in the request, auth (got it from Frontend)
    // This api has been tested by postman
    let data = {};
    data['court_id'] = req.query['court_id'];
    req.query['query_time'] = req.query['query_time'].replace(/\+/g, ' ')
    const admin_id = req.token;
    const isadmin = await isAdmin(admin_id)
    if (isadmin) {
        const result = await getCourtsAppointmentDetailsQuery(data)
        //date filter
        let courts = []
        //if time is 00:00:00
        if (req.query['query_time'].split(" ")[1] === "00:00:00") {
            for (let i = 0; i < result.length; i++) {
                result[i]['date'] = parseISODate(result[i]['date'])
                if (result[i]['date'] === req.query['query_time'].split(" ")[0]) {
                    courts.push(result[i])
                }       
            }
        }
        return res.status(200).json(courts)

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

export const getAllProviders = async(req,res) => {

    // TODO: the admin_id shoud be automatically added in the request, auth (got it from Frontend)
    // This api has been tested by postman
    const admin_id = req.token;
    const isadmin = await isAdmin(admin_id)
    if (isadmin) {
        const  result= await getProviders()
        return res.status(200).json(result)

    } else {

        const message = "You are not the admin!"
        return res.status(401).send(message)
    }
}