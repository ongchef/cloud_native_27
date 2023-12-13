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

const AdminAddProvider = () => {
	const [unitName, setUnitName] = useState('');
	const [contactPhone, setContactPhone] = useState('');
	const [contactEmail, setContactEmail] = useState('');
	const [loginPassword, setLoginPassword] = useState('');

	const [loading, setLoading] = useState(false);

	const handleAddProvider = (e) => {
		e.preventDefault();
		setLoading(true);
		if (unitName && contactPhone && contactEmail && loginPassword) {
			console.log({
				unitName,
				contactPhone,
				contactEmail,
				loginPassword,
			});
		}
		const roleId = 3;

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
						value={unitName}
						onChange={(e) => setUnitName(e.target.value)}
						required
					/>
				</FormControl>

				<FormControl fullWidth margin="normal">
					<Typography variant="subtitle1">聯絡電話</Typography>
					<TextField
						variant="outlined"
						value={contactPhone}
						onChange={(e) => setContactPhone(e.target.value)}
						required
					/>
				</FormControl>

				<FormControl fullWidth margin="normal">
					<Typography variant="subtitle1">聯絡電子信箱</Typography>
					<TextField
						type="email"
						variant="outlined"
						value={contactEmail}
						onChange={(e) => setContactEmail(e.target.value)}
						required
					/>
				</FormControl>

				<FormControl fullWidth margin="normal">
					<Typography variant="subtitle1">登入密碼</Typography>
					<TextField
						type="password"
						variant="outlined"
						value={loginPassword}
						onChange={(e) => setLoginPassword(e.target.value)}
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
