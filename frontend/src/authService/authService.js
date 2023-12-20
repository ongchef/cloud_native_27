import axios from 'axios';
import { UserContext } from '../UserContext';
import { useContext } from 'react';
import fakeUser from '../testData/fakeUser';

const REGISTER_API_URL = 'http://140.112.107.71/api/users/';
const LOGIN_API_URL = 'http://140.112.107.71/api/users/login';

// const register = ({ username, password, name, email, phone, lineId }) => {
const register = async ({
	username,
	password,
	name,
	email,
	phone,
	lineId,
	roleId,
}) => {
	try {
		const response = await axios.post(
			REGISTER_API_URL,
			JSON.stringify({
				line_id: lineId,
				role_id: roleId,
				password: password,
				name: username,
				email: email,
				phone: phone,
			}),
			{
				headers: { 'Content-Type': 'application/json' },
			}
		);

		console.log('Registration successful:', response.data);
		return response.data;
	} catch (error) {
		console.error('Registration failed:', error.message);
		throw error; // Re-throw the error for further analysis
	}
};

const login = async (userName, password) => {
	try {
		const res = await axios.post(LOGIN_API_URL, {
			name: userName,
			password: password,
		});
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
	} catch (error) {
		console.error('Login failed:', error.message);
		throw error; // Re-throw the error for further analysis
	}
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
