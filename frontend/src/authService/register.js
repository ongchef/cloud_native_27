import React, { Component, useState, useRef, useEffect } from 'react';
import isEmail from 'validator/lib/isEmail';
import isMobilePhone from 'validator/lib/isMobilePhone';

import AuthService from './authService';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import Container from '@mui/material/Container';
import InputField from '../commonService/inputField';

const required = (value) => {
	if (!value) {
		return (
			<div className="alert alert-danger" role="alert">
				This field is required!
			</div>
		);
	}
};

const isValidEmail = (value) => {
	const isValid = value.trim() !== '' && isEmail(value);
	console.log('isemail', isValid);
	return isValid;
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
	const [phone, setPhone] = useState('');
	const [lineId, setLineId] = useState('');
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');

	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const [loading, setLoading] = useState(false);
	const [message, setMessage] = useState('');

	const handleRegister = async (e) => {
		e.preventDefault();
		setMessage('');
		setLoading(true);

		// form.current.validateAll();
		if (confirmPassword !== password) {
			alert('密碼與確認密碼不相同，請確認是否輸入正確');
			setLoading(false);
			return;
		}

		if (Boolean(email) && !isEmail(email)) {
			alert('Email格式不正確，請確認是否輸入正確');
			setLoading(false);
			return;
		}

		if (Boolean(phone) && !isMobilePhone(phone, 'zh-TW')) {
			alert('電話格式不正確，請確認是否輸入正確');
			setLoading(false);
			return;
		}

		try {
			const roleId = 2;
			const res = await AuthService.register({
				username,
				email,
				phone,
				password,
				lineId,
				roleId,
			});
			alert('註冊成功！');
			window.location.href = '/selectSport';
		} catch (error) {
			console.log('err', error);
			if (error.response.status === 400) alert(error.response.data);
			else alert('註冊失敗');
		} finally {
			setLoading(false);
		}

		setMessage('');
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
					justifyContent: 'center',
				}}>
				<Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
					<PersonAddAlt1Icon />
				</Avatar>
				<Typography component="h1" variant="h5">
					註冊
				</Typography>
				<Box
					component="form"
					onSubmit={handleRegister}
					sx={{ mt: 3 }}
					autoComplete="off">
					<Grid container spacing={2}>
						<Grid item xs={12}>
							<InputField
								label="帳號"
								type="username"
								name="username"
								setValue={setUsername}
							/>
						</Grid>
						<Grid item xs={12}>
							<InputField
								label="密碼"
								type={showPassword ? 'text' : 'password'}
								name="password"
								setValue={setPassword}
								showPassword={showPassword}
								setShowPassword={setShowPassword}
							/>
						</Grid>
						<Grid item xs={12}>
							<InputField
								label="確認密碼"
								type={showConfirmPassword ? 'text' : 'password'}
								name="Confirmpassword"
								setValue={setConfirmPassword}
								showPassword={showConfirmPassword}
								setShowPassword={setShowConfirmPassword}
								error={
									Boolean(password) &&
									Boolean(confirmPassword) &&
									password !== confirmPassword
								}
								helperText={'密碼與確認密碼不相同'}
							/>
						</Grid>
						<Grid item xs={12}>
							<InputField
								label="名稱"
								type="name"
								name="name"
								setValue={setName}
							/>
						</Grid>
						<Grid item xs={12}>
							<InputField
								label="信箱"
								type="email"
								name="email"
								setValue={setEmail}
								error={Boolean(email) && !isEmail(email)}
								helperText={
									Boolean(email) && !isEmail(email) && '請輸入正確email'
								}
							/>
						</Grid>
						<Grid item xs={12}>
							<InputField
								label="電話號碼"
								type="phone"
								name="phone"
								setValue={setPhone}
								error={Boolean(phone) && !isMobilePhone(phone, 'zh-TW')}
								helperText={
									Boolean(phone) &&
									!isMobilePhone(phone, 'zh-TW') &&
									'請輸入正確電話'
								}
							/>
						</Grid>
						<Grid item xs={12}>
							<InputField
								label="Line Id"
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
						sx={{ mt: 3, mb: 2 }}
						disabled={loading}>
						註冊
					</Button>
					<Grid container>
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
