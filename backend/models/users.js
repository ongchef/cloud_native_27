import db from './connection_db.js';

// get all users
export const getUsersQuery = () => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * from STADIUM.USER', (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
}

// get a user by id
export const getUsersByIdQuery = (data) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * from STADIUM.USER WHERE user_id = ?', [data], (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
}

// check duplicate name
export const isDuplicateName = (name) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT name FROM STADIUM.USER', (error, results) => {
            
            if (error) {
                reject(false);
            } else {
                for (let i = 0; i < results.length; i++){
                    if (results[i].name === name) {
                        resolve(true)
                    }
                }
                resolve(false)
            }
        });
    })
}

// check duplicate email
export const isDuplicateEmail = (email) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT email FROM STADIUM.USER', (error, results) => {
            
            if (error) {
                reject(false);
            } else {
                for (let i = 0; i < results.length; i++){
                    if (results[i].email === email) {
                        resolve(true)
                    }
                }
                resolve(false)
            }
        });
    })
}

// check if users name exist
export const isUsersNameExist = (data) => {

    return new Promise((resolve, reject) => {
        db.query(`SELECT * FROM STADIUM.USER WHERE name = ?`, [data], (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });    
}

// check if users exist
export const isUsersExist = (data) => {

    return new Promise((resolve, reject) => {
        db.query(`SELECT * FROM STADIUM.USER WHERE user_id = ?`, [data], (error, results) => {
            if (error) {
                reject(error);
            } else {
                if (typeof results[0] === 'undefined'){
                    resolve(false);
                }
                resolve(true)
            }
        });
    });    
}

// post register users
export const postUsersRegisterQuery = (data) => {

    return new Promise((resolve, reject) => {
        db.query(`INSERT INTO STADIUM.USER SET ?`, [data], (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve("新增成功!");
            }
        });
    });
}

// post users login
// TODO: sql injection problem? how to login
export const postUsersLoginQuery = (data) => {

    return new Promise((resolve, reject) => {
        db.query('SELECT user_id, role_id, password FROM STADIUM.USER WHERE name = ?', [data], (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
}

// put user by id
export const putUsersQuery = (data) => {

    const { user_id, ...update_col_dict } = data
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

// get user appointment
export const getUsersAppointmentIdQuery = (data) => {
    return new Promise((resolve, reject) => {
        db.query(`SELECT appointment_id FROM STADIUM.PARTICIPANT where user_id = ?`,[data],(error, result) => {
            if (error) {
                reject(error);
            } else {
                resolve(result);
            }
        })
    })
}

// order a court (post user appointment)
export const postUsersAppointmentQuery = (data) => {

    return new Promise((resolve, reject) => {
        db.query('INSERT INTO STADIUM.APPOINTMENT SET ?', [data], (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
}