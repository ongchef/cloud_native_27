import React, { useState } from 'react';
import {
	Box,
	TextField,
	Button,
	FormControl,
	Select,
	MenuItem,
	Typography,
} from '@mui/material';
import axios from 'axios';
import FetchData from '../authService/fetchData';

const AdminAddProvider = () => {
	const [name, setName] = useState('');
	const [phone, setPhone] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const [loading, setLoading] = useState(false);

	const API_URL = 'http://localhost:3000/api/admin/courtsProvider';

	const registerProvider = async () => {
		const provider = {
			role_id: 3,
			name: name,
			password: password,
			email: email,
			phone: phone,
		};

		try {
			const response = FetchData.postData(API_URL, provider);

			console.log('Registration successful:', response.data);
			return response.data;
		} catch (error) {
			console.error('Registration failed:', error.message);
			throw error; // Re-throw the error for further analysis
		}
	};

	const handleAddProvider = (e) => {
		e.preventDefault();
		setLoading(true);
		if (name && phone && email && password) {
			console.log({
				unitName: name,
				contactPhone: phone,
				contactEmail: email,
				loginPassword: password,
			});
		}
		try {
			registerProvider();
		} catch (error) {
			console.log(error);
		}

		setLoading(false);
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
			<form onSubmit={handleAddProvider}>
				<FormControl fullWidth margin="normal">
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
				</FormControl>

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
