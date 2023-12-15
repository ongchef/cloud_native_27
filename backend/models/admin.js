import db from './connection_db.js';

// get courts appointment query
export const getCourtsAppointmentQuery = (params) => {
    const name = params.name !== undefined ? params.name : null;
    const ball = params.ball !== undefined ? params.ball : null;
    const address = params.address !== undefined ? params.address : null;

    let searchQuery = "";
    let inti = 0;
    if (address !== null) {
        searchQuery += `WHERE address like '%${address}%'`;
        inti = 1;
    }
    if (name !== null) {
        if (inti === 0) {
            searchQuery += `WHERE U.name = '${name}'`
        } else {
            searchQuery += ` AND U.name = '${name}'`;
        }
    }

    return new Promise((resolve, reject) => {

        db.query(`SELECT * from STADIUM.COURT C JOIN STADIUM.USER U ON C.admin_id = U.user_id
            ${searchQuery}`, (error, results) => {
            if (error) {
                reject(error);
            } else {
                if (ball === null) {
                    resolve(results);
                }
                else {
                    const search_results = results.reduce((result, court) => {
                        const ball_type_id_list = court['ball_type_id'].split(',')
                        const ball_query = []
                        for (let i = 0; i < ball.length; i++) {
                            ball_query.push(ball[i])
                        }
                        const found = ball_query.some(r => ball_type_id_list.includes(r))
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

//get court all appointments
export const getCourtAllAppointment = (court_id) => {
    return new Promise((resolve, reject) => {
        db.query(`SELECT A.appointment_id, AT.date, AT.start_time, AT.end_time FROM STADIUM.APPOINTMENT A JOIN STADIUM.APPOINTMENT_TIME AT ON A.appointment_id = AT.appointment_id`, [court_id], (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
}

// get courts appointment details query
export const getCourtsAppointmentDetailsQuery = (data) => {

    const { court_id } = data

    return new Promise((resolve, reject) => {

        db.query(`SELECT C.*, date, AT.start_time, AT.end_time, COUNT(P.appointment_id) AS participant_count, U.name 
        FROM STADIUM.APPOINTMENT_TIME AS AT INNER JOIN STADIUM.APPOINTMENT AS A ON AT.appointment_id = A.appointment_id 
        LEFT JOIN STADIUM.PARTICIPANT AS P ON A.appointment_id = P.appointment_id
        LEFT JOIN STADIUM.COURT as C ON A.court_id = C.court_id
        LEFT JOIN STADIUM.USER AS U ON A.creator_id = U.user_id
        WHERE A.court_id = ? GROUP BY AT.start_time, AT.end_time`, [court_id], (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
}

// get court available time
export const getCourtAvailableQuery = (court_id) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT weekday, start_time, end_time FROM COURT_AVAILABLE_TIME WHERE court_id = ?', [court_id], (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
}

// get user histories query
export const getUserHistoriesQuery = () => {
    return new Promise((resolve, reject) => {
        db.query('SELECT user_id, name, email, phone FROM USER WHERE role_id = 2', (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
}

//post court provider
export const postCourtsProviderQuery = (data) => {

    return new Promise((resolve, reject) => {
        db.query(`INSERT INTO STADIUM.USER SET ?`, [data], (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve("新增完成!");
            }
        });
    });
}

// put user info by user_id
export const putUsersByIdQuery = async(data) => {

    const { user_id, ...update_col_dict } = data;

    return new Promise((resolve, reject) => {
        db.query('UPDATE STADIUM.USER SET ? WHERE user_id = ?', [update_col_dict, user_id], (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve("變更完成!");
            }
        });
    });
}

// delete user info by user_id
export const deleteUsersByIdQuery = async(data) => {
    const user_id = data;

    return new Promise((resolve, reject) => {
        db.query('DELETE FROM STADIUM.USER WHERE user_id = ?', [user_id], (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve("刪除完成!");
            }
        });
    });
}

// check admin_id 
export const isAdmin = (data) => {
    return new Promise((resolve, reject) => {
        const admin_id = data
        db.query('SELECT u.user_id, r.role_id FROM USER u JOIN ROLE_REF r ON u.role_id = r.role_id WHERE u.user_id = ? AND r.role_id = 1;', [admin_id], (error, results) => {
        
            if (error) {
                reject(false);
            } else {

                if (results.length === 0) {
                    resolve(false)
                } else {
                    resolve(true)
                }
            }
        });
    });
}

// get all providers
export const getProviders = () => {
    return new Promise((resolve, reject) => {
        db.query('SELECT user_id, name FROM USER WHERE role_id = 3', (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
}

// get user detail
export const getUserDetailQuery = (data) => {
    return new Promise((resolve, reject) => {
        db.query(`SELECT * FROM STADIUM.USER where user_id = ?`,[data],(error, result) => {
            if (error) {
                reject(error);
            } else {
                resolve(result);
            }
        })
    })
}