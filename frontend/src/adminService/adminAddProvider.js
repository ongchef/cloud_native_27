import React, { useState } from 'react';
import { Box, Button, FormControl, Typography } from '@mui/material';
import FetchData from '../authService/fetchData';
import InputField from '../commonService/inputField';

import isEmail from 'validator/lib/isEmail';
import isMobilePhone from 'validator/lib/isMobilePhone';

const AdminAddProvider = () => {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [phoneNumber, setPhoneNumber] = useState('');

	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);

	const [loading, setLoading] = useState(false);

	const API_URL = 'api/admin/courtsProvider';

	const handleAddProvider = async (e) => {
		e.preventDefault();
		setLoading(true);

		const provider = {
			role_id: 3,
			name: name,
			password: password,
			email: email,
			phone: phoneNumber,
		};

		if (confirmPassword !== password) {
			alert('密碼與確認密碼不相同，請確認是否輸入正確');
			setLoading(false);
			return;
		}

		if (Boolean(email) && !isEmail(email)) {
			alert('Email輸入錯誤，請確認是否輸入正確');
			setLoading(false);
			return;
		}

		if (Boolean(phoneNumber) && !isMobilePhone(phoneNumber, 'zh-TW')) {
			alert('電話格式不正確，請確認是否輸入正確');
			setLoading(false);
			return;
		}

		try {
			const response = await FetchData.postData(API_URL, provider);
			alert('註冊成功！');
			window.location.href = '/adminStadiumStatus';
		} catch (error) {
			console.log('err', error);
			if (error.response.status === 400) alert(error.response.data);
			else alert('伺服器錯誤，註冊失敗！');
		} finally {
			setLoading(false);
		}
	};

	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
				gap: '5px',
				alignItems: 'center',
				justifyContent: 'center',
			}}>
			<h1>add provider</h1>

			<Box width="80vw">
				<Typography variant="h3">註冊球場提供商</Typography>
			</Box>
			<form onSubmit={handleAddProvider} autoComplete="off">
				<FormControl fullWidth margin="normal">
					<InputField
						label="提供商帳號"
						type="text"
						name="name"
						setValue={setName}
					/>
				</FormControl>
				<FormControl fullWidth margin="normal">
					<InputField
						label="密碼"
						type={showPassword ? 'text' : 'password'}
						name="password"
						setValue={setPassword}
						showPassword={showPassword}
						setShowPassword={setShowPassword}
					/>
				</FormControl>

				<FormControl fullWidth margin="normal">
					<InputField
						label="確認密碼"
						type={showConfirmPassword ? 'text' : 'password'}
						name="Confirmpassword"
						setValue={setConfirmPassword}
						showPassword={showConfirmPassword}
						setShowPassword={setShowConfirmPassword}
						error={password && confirmPassword && password !== confirmPassword}
						helperText={'密碼與確認密碼不相同'}
					/>
				</FormControl>

				<FormControl fullWidth margin="normal">
					<InputField
						label="聯絡信箱"
						type="email"
						name="email"
						setValue={setEmail}
						error={Boolean(email) && !isEmail(email)}
						helperText={Boolean(email) && !isEmail(email) && '請輸入正確email'}
					/>
				</FormControl>
				<FormControl fullWidth margin="normal">
					<InputField
						label="聯絡電話"
						type="phone"
						name="phone"
						setValue={setPhoneNumber}
						error={Boolean(phoneNumber) && !isMobilePhone(phoneNumber, 'zh-TW')}
						helperText={
							Boolean(phoneNumber) &&
							!isMobilePhone(phoneNumber, 'zh-TW') &&
							'請輸入正確電話'
						}
					/>
				</FormControl>

				{/* <FormControl fullWidth margin="normal">
					<Typography variant="subtitle1">單位名稱</Typography>
					<TextField
						variant="outlined"
						value={name}
						onChange={(e) => setName(e.target.value)}
						required
					/>
				</FormControl>
				<FormControl fullWidth margin="normal">
					<Typography variant="subtitle1">聯絡電話</Typography>
					<TextField
						variant="outlined"
						value={phone}
						onChange={(e) => setPhone(e.target.value)}
						required
					/>
				</FormControl>

				<FormControl fullWidth margin="normal">
					<Typography variant="subtitle1">聯絡電子信箱</Typography>
					<TextField
						type="email"
						variant="outlined"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
					/>
				</FormControl>

				<FormControl fullWidth margin="normal">
					<Typography variant="subtitle1">登入密碼</Typography>
					<TextField
						type="password"
						variant="outlined"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
				</FormControl> */}

				<FormControl fullWidth margin="normal">
					<Button
						type="submit"
						variant="contained"
						color="primary"
						disabled={loading}>
						註冊
					</Button>
				</FormControl>
			</form>
		</Box>
	);
};

export default AdminAddProvider;
