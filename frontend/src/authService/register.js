import React, { Component, useState, useRef } from 'react';
import { isEmail } from 'validator';

import AuthService from './authService';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import AuthInputField from './authInputField';

const required = (value) => {
	if (!value) {
		return (
			<div className="alert alert-danger" role="alert">
				This field is required!
			</div>
		);
	}
};

const validEmail = (value) => {
	if (!isEmail(value)) {
		return (
			<div className="alert alert-danger" role="alert">
				This is not a valid email.
			</div>
		);
	}
};

const vusername = (value) => {
	if (value.length < 3 || value.length > 20) {
		return (
			<div className="alert alert-danger" role="alert">
				The username must be between 3 and 20 characters.
			</div>
		);
	}
};

const vpassword = (value) => {
	if (value.length < 6 || value.length > 40) {
		return (
			<div className="alert alert-danger" role="alert">
				The password must be between 6 and 40 characters.
			</div>
		);
	}
};

const Register = () => {
	const form = useRef();
	const checkBtn = useRef();

	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [phoneNumber, setPhoneNumber] = useState('');
	const [lineId, setLineId] = useState('');
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [successful, setSuccessful] = useState(false);
	const [message, setMessage] = useState('');

	const handleRegister = (e) => {
		e.preventDefault();

		setMessage('');
		setSuccessful(false);

		// form.current.validateAll();

		try {
			const roleId = 2;
			AuthService.register({
				username,
				email,
				phoneNumber,
				password,
				lineId,
				roleId,
			});
		} catch (error) {
			console.log(error);
		}

		setMessage('');
		setSuccessful(true);
		// AuthService.register({
		// 	username,
		// 	email,
		// 	name,
		// 	phoneNumber,
		// 	password,
		// 	lineId,
		// }).then(
		// 	(response) => {
		// 		setMessage(response.data.message);
		// 		setSuccessful(true);
		// 	},
		// 	(error) => {
		// 		const resMessage =
		// 			(error.response &&
		// 				error.response.data &&
		// 				error.response.data.message) ||
		// 			error.message ||
		// 			error.toString();

		// 		setMessage(resMessage);
		// 		setSuccessful(false);
		// 	}
		// );
	};

	return (
		<Container component="main" maxWidth="xs">
			<CssBaseline />
			<Box
				sx={{
					marginTop: 8,
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
				}}>
				<Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography component="h1" variant="h5">
					註冊
				</Typography>
				<Box component="form" onSubmit={handleRegister} sx={{ mt: 3 }}>
					<Grid container spacing={2}>
						<Grid item xs={12}>
							<AuthInputField
								label="Username"
								type="username"
								name="username"
								setValue={setUsername}
							/>
						</Grid>
						<Grid item xs={12}>
							<AuthInputField
								label="Password"
								type="password"
								name="password"
								setValue={setPassword}
							/>
						</Grid>
						<Grid item xs={12}>
							<AuthInputField
								label="Name"
								type="name"
								name="name"
								setValue={setName}
							/>
						</Grid>
						<Grid item xs={12}>
							<AuthInputField
								label="Email Address"
								type="email"
								name="email"
								setValue={setEmail}
							/>
						</Grid>
						<Grid item xs={12}>
							<AuthInputField
								label="Phone Number"
								type="phone"
								name="phone"
								setValue={setPhoneNumber}
							/>
						</Grid>
						<Grid item xs={12}>
							<AuthInputField
								label="LineId"
								type="lineId"
								name="lineId"
								setValue={setLineId}
							/>
						</Grid>
					</Grid>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						sx={{ mt: 3, mb: 2 }}>
						註冊
					</Button>
					<Grid container justifyContent="flex-end">
						<Grid item>
							<Link href="/login" variant="body2">
								已經有帳號？登入
							</Link>
						</Grid>
					</Grid>
				</Box>
			</Box>
		</Container>
	);
};

export default Register;
