import { useLocation, useNavigate } from 'react-router-dom'; // 引入useNavigate
import Button from '@mui/material/Button'; // 引入Button元件
import React, { useState, useEffect } from 'react';
import Container from '@mui/material/Container'; // 引入Container元件
import Box from '@mui/material/Box'; // 引入Box元件

import { Card } from '@mui/material';

import Typography from '@mui/material/Typography';
import { TextField } from '@mui/material';
import axios from 'axios';
import authHeader from '../authService/authHeader';

export default function UserProfile() {
	const [userProfile, setUserProfile] = useState([]);
	const API_URL = 'http://localhost:3000/api/admin/user';
	const location = useLocation();
	const searchParams = new URLSearchParams(location.search);
	const id = searchParams.get('id');

	const navigate = useNavigate();

	async function getUserProfile() {
		return await axios.get(API_URL, {
			headers: authHeader(),
			params: {
				user_id: id,
			},
		});
	}

	useEffect(() => {
		getUserProfile().then((res) => {
			setUserProfile(res.data[0]);
			setProfile({
				name: res.data[0].name,
				email: res.data[0].email,
				phone: res.data[0].phone,
				line_ID: res.data[0].line_id,
			});
		});
	}, []);

	const [profile, setProfile] = useState({
		name: '',
		email: '',
		phone: '',
		line_ID: '',
		password: '',
	});
	useEffect(() => {
		console.log(userProfile);
	}, [userProfile]);
	useEffect(() => {
		console.log(profile);
	}, [profile]);
	const handleChange = (e) => {
		setProfile({ ...profile, [e.target.id]: e.target.value });
	};

	const handleBackToUserHistory = (e) => {
		e.preventDefault();
		// Update profile logic here
		navigate('/adminUserHistory');
	};

	return (
		<div>
			<h1>user Profile</h1>
			<Box display="flex" flexDirection="column" alignItems="center" gap={5}>
				<Container maxWidth="sm"></Container>

				<Box>
					<Card sx={{ width: '50vw', margin: 'auto' }}>
						<form>
							<Box
								my={4}
								display="flex"
								flexDirection="column"
								justifyContent="center"
								alignItems="center"
								gap={2}>
								<Typography variant="h4">User Profile</Typography>
								<Box
									display="flex"
									flexDirection="row"
									justifyContent="space-between"
									alignItems="center"
									width="70%">
									<Typography variant="h5" style={{}}>
										Name :
									</Typography>
									<TextField
										id="name"
										label="Name"
										onChange={handleChange}
										style={{ width: '70%' }}
										value={profile.name}
										inputProps={{ readOnly: true }}
									/>
								</Box>
								<Box
									display="flex"
									flexDirection="row"
									justifyContent="space-between"
									alignItems="center"
									width="70%">
									<Typography variant="h5" style={{}}>
										Email :
									</Typography>
									<TextField
										id="email"
										label="Email"
										onChange={handleChange}
										style={{ width: '70%' }}
										value={profile.email}
										inputProps={{ readOnly: true }}
									/>
								</Box>
								<Box
									display="flex"
									flexDirection="row"
									justifyContent="space-between"
									alignItems="center"
									width="70%">
									<Typography variant="h5" style={{}}>
										Line ID :
									</Typography>
									<TextField
										id="line_ID"
										label="Line ID"
										onChange={handleChange}
										style={{ width: '70%' }}
										value={profile.line_ID}
										inputProps={{ readOnly: true }}
									/>
								</Box>
								<Box
									display="flex"
									flexDirection="row"
									justifyContent="space-between"
									alignItems="center"
									width="70%">
									<Typography variant="h5" style={{}}>
										Phone :
									</Typography>
									<TextField
										id="phone"
										label="Phone"
										onChange={handleChange}
										style={{ width: '70%' }}
										value={profile.phone}
										inputProps={{ readOnly: true }}
									/>
								</Box>

								<Box display="flex" justifyContent="center" gap={2}>
									<Button variant="contained" onClick={handleBackToUserHistory}>
										回到使用者歷史紀錄
									</Button>
								</Box>
								{/* 其他輸入字段 */}
							</Box>
						</form>
					</Card>
				</Box>
			</Box>
			{/* 添加這一行 */}
		</div>
	);
}
