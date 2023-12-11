import axios from 'axios';
import { UserContext } from '../UserContext';
import { useContext } from 'react';
import fakeUser from '../testData/fakeUser';

const API_URL = 'http://localhost:8080/api/auth/';

// const register = ({ username, password, name, email, phone, lineId }) => {
const register = ({ username, password, name, email, phone, lineId }) => {
	return axios.post(API_URL + 'signup', {
		username,
		password,
		name,
		phone,
		email,
		lineId,
	});
};

const login = (userName, password) => {
	function delay() {
		return new Promise(function (resolve, reject) {
			setTimeout(function () {
				if (
					userName !== 'user' &&
					userName !== 'provider' &&
					userName !== 'admin'
				) {
					reject(fakeUser(userName));
				} else {
					resolve(fakeUser(userName));
				}
			}, 1000);
		});
	}
	// return delay()
	//   .then((response) => {
	//   if (response.data.accessToken) {
	//     localStorage.setItem("user", JSON.stringify(response.data));
	//   }
	//   console.log(response.data)
	//   return response.data;
	// });
	return axios
		.post('http://localhost:3000/api/users/login', {
			name: userName,
			password: password,
		})
		.then((res) => {
			console.log(res);
			const role =
				res.data.role_id === 1
					? 'ROLE_ADMIN'
					: res.data.role_id === 2
					? 'ROLE_USER'
					: 'ROLE_PROVIDER';
			localStorage.setItem(
				'user',
				JSON.stringify({
					role: role,
					accessToken: res.data.user_id,
				})
			);
			return res;
		});

	// return axios
	//   .post(API_URL + "signin", {
	//     userName,
	//     password,
	//   })
	//   .then((response) => {
	//     if (response.data.accessToken) {
	//       localStorage.setItem("user", JSON.stringify(response.data));
	//     }

	//     return response.data;
	//   });
};

const logout = () => {
	localStorage.removeItem('user');
};

const getCurrentUser = () => {
	return JSON.parse(localStorage.getItem('user'));
};

const AuthService = {
	register,
	login,
	logout,
	getCurrentUser,
};

export default AuthService;
