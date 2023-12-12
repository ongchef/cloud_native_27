import db from './connection_db.js';

// get all courts
export const getCourtsQuery = (data) => {
    const page = data['page'] || 1;
    const limit = 10;
    let offset = (page - 1) * limit;
    return new Promise((resolve, reject) => {
        db.query('SELECT * from STADIUM.COURT LIMIT ? OFFSET ?', [limit, offset], (error, results) => {
            if (error) {
                reject(error);
            } else {
                const total_page = Math.ceil(results.length/limit);
                const retrun_json = {
                    "total_page": total_page,
                    "courts": results
                }
                resolve(retrun_json);
            }
        });
    });
}

// get all courts by admin id
export const getCourtsByAdminIdQuery = (data) => {

    const { admin_id } = data

    return new Promise((resolve, reject) => {
        db.query('SELECT * from STADIUM.COURT WHERE admin_id = ?', [admin_id], (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
}

export const searchCourtsByAdminIdQuery = (data) => {

    const { admin_id, ball_type_id, address } = data;

    let searchQuery;

    if (typeof address !== "undefined") {
        searchQuery = `WHERE c.address like '%${address}%' AND c.admin_id = ?`;
    } else {
        searchQuery = `WHERE c.admin_id = ?`;
    }
    return new Promise((resolve, reject) => {
        db.query(`SELECT c.name, c.location, c.address, c.available, c.court_id, c.image_url, c.ball_type_id
        FROM STADIUM.COURT c 
        ${searchQuery}`, [admin_id], (error, results) => {
            if (error) {
                reject(error);
            } else {
                // no need to search ball type id
                if (typeof ball_type_id === "undefined") {
                    resolve(results);
                // need to search ball type id
                } else {
                    const search_results = results.reduce((result, court) => {
                        const ball_type_id_list = court['ball_type_id'].split(',')
                        const ball_query = ball_type_id.toString().split(',')
                        const found = ball_query.some(r=> ball_type_id_list.includes(r))
                        if (found) {
                            result.push(court)
                        }
                        return result
                    }, [])
                    resolve(search_results);
                }
            }
        });
    });
}

export const searchCourtsAppointmentsByAdminIdQuery = (data) => {

    const { admin_id, ball_type_id, address, date, date_add_one_day } = data;

    let searchQuery = `WHERE app_t.date >= '${date}' AND app_t.date < '${date_add_one_day}'`

    if (typeof address !== "undefined") {
        searchQuery += `AND c.address like '%${address}%'`;
    }
    return new Promise((resolve, reject) => {
        db.query(`SELECT c.name, c.location, c.address, c.available, c.court_id, c.image_url, c.ball_type_id
        FROM STADIUM.APPOINTMENT_TIME app_t
        INNER JOIN STADIUM.APPOINTMENT app ON app_t.appointment_id = app.appointment_id
        INNER JOIN STADIUM.COURT c ON app.court_id = c.court_id
        ${searchQuery} AND c.admin_id = ?
        GROUP BY c.court_id`, [admin_id], (error, results) => {
            if (error) {
                reject(error);
            } else {
                // no need to search ball type id
                if (typeof ball_type_id === "undefined") {
                    resolve(results);
                // need to search ball type id
                } else {
                    const search_results = results.reduce((result, court) => {
                        const ball_type_id_list = court['ball_type_id'].split(',')
                        const ball_query = ball_type_id.toString().split(',')
                        const found = ball_query.some(r=> ball_type_id_list.includes(r))
                        if (found) {
                            result.push(court)
                        }
                        return result
                    }, [])
                    resolve(search_results);
                }
            }
        });
    });
}

// check admin_id of the court
export const isCourtsAdmin = (data) => {
    return new Promise((resolve, reject) => {

        const { court_id, admin_id } = data

        db.query('SELECT admin_id FROM STADIUM.COURT WHERE court_id = ?', [court_id], (error, results) => {
            
            if (error) {
                reject(false);
            } else {
                const court_admin_id = results[0]['admin_id']
                if (court_admin_id === admin_id){
                    resolve(true);
                }
                resolve(false)
            }
        });
    });
}

// check the role_id of the request issuer
export const isCourtsProvider = (data) => {
    return new Promise((resolve, reject) => {

        const { user_id } = data

        db.query('SELECT role_id FROM STADIUM.USER WHERE user_id = ?', [user_id], (error, results) => {
            
            if (error) {
                reject(false);
            } else {
                if (typeof results[0] === "undefined"){
                    resolve(false)
                } else if (results[0]['role_id'] == "3"){
                    resolve(true);
                } else {
                    resolve(false)
                }
            }
        });
    });
}

export const getCourtsAppointmentByDate = (data) => {
    
    const { court_id, date, date_add_one_day } = data;

    return new Promise((resolve, reject) => {
        db.query(`SELECT * FROM STADIUM.APPOINTMENT_TIME INNER JOIN 
        STADIUM.APPOINTMENT ON STADIUM.APPOINTMENT_TIME.appointment_id = STADIUM.APPOINTMENT.appointment_id 
        WHERE court_id = ? AND 
        APPOINTMENT_TIME.date >= ? AND
        APPOINTMENT_TIME.date < ?`, [court_id, date, date_add_one_day], (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
}

// get court's reserved time by court id
export const getCourtsReservedByCourtIdQuery = (data) => {
    
    const court_id = data['court_id']

    return new Promise((resolve, reject) => {
        db.query(`SELECT start_time, end_time FROM STADIUM.APPOINTMENT_TIME INNER JOIN 
        STADIUM.APPOINTMENT ON STADIUM.APPOINTMENT_TIME.appointment_id = STADIUM.APPOINTMENT.appointment_id 
        WHERE court_id = ?`, [court_id], (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });

}

// put court info by court_id
export const putCourtsByIdQuery = (data) => {

    const { court_id, admin_id, ...update_col_dict } = data;

    return new Promise((resolve, reject) => {
        db.query('UPDATE STADIUM.COURT SET ? WHERE court_id = ?', [update_col_dict, court_id], (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve("變更完成!");
            }
        });
    });
}

// post courts
export const postCourtsQuery = (data) => {

    return new Promise((resolve, reject) => {
        db.query(`INSERT INTO STADIUM.COURT SET ?`, [data], (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve("新增完成!");
            }
        });
    });
}

// delete courts
export const deleteCourtsByIdQuery = (data) => {

    const { court_id } = data;

    return new Promise((resolve, reject) => {
        db.query('DELETE FROM STADIUM.COURT WHERE court_id = ?', [court_id], (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve("刪除完成!");
            }
        });
    });
}