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
        // try test id = 60b59b1f-b9c7-7bfe-43a6-9a42089ab18f
        db.query('SELECT * from STADIUM.USER WHERE user_id = ?', [data], (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
}

// put user info by id
// TODO: check which columns should be edited and which user_id
export const putUsersInfoByIdQuery = (data) => {
    return new Promise((resolve, reject) => {
        db.query('UPDATE * from STADIUM.USER SET = ? WHERE = ?', [data], (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
}

// post register users
// TODO: check values(user data) need to be inserted
// TODO: error handling(duplicate account/email)
export const postUsersRegisterQuery = (data) => {

    const user_columns = '(user_id, line_id, role_id, password, name, email, phone)'

    return new Promise((resolve, reject) => {
        db.query(`INSERT INTO STADIUM.USER ${user_columns} VALUES ?`, [data], (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
}

// post users login
// TODO: sql injection problem? how to login
export const postUsersLoginQuery = (data) => {

    return new Promise((resolve, reject) => {
        db.query('SELECT STADIUM.USER WHERE ?', [data], (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
}
