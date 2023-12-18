import React from 'react';
import { TableRow, TableCell, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // Import useNavigate instead of useHistory

export default function AdminUserRow({ user }) {
	const navigate = useNavigate();

	const handleViewUserHistory = (userId) => {
		navigate(`/adminUserHistoryDetail?id=${userId}`);
	};

	const handleViewUserProfile = (userId) => {
		navigate(`/adminUserProfile?id=${userId}`);
	};

	return (
		<TableRow sx={{ margin: 'auto' }} style={{ marginBottom: '8px' }}>
			<TableCell
				sx={{
					justifyContent: 'center',
					textAlign: 'center',
				}}>
				{user.name}
			</TableCell>
			<TableCell
				sx={{
					justifyContent: 'center',
					textAlign: 'center',
				}}>
				{user.email}
			</TableCell>
			<TableCell
				sx={{
					justifyContent: 'center',
					textAlign: 'center',
				}}>
				{user.phone}
			</TableCell>
			<TableCell
				sx={{
					justifyContent: 'center',
					textAlign: 'center',
				}}>
				<Button
					variant="outlined"
					onClick={() => handleViewUserHistory(user.user_id)}>
					查看歷史紀錄
				</Button>
			</TableCell>
			<TableCell
				sx={{
					justifyContent: 'center',
					textAlign: 'center',
				}}>
				<Button
					variant="outlined"
					onClick={() => handleViewUserProfile(user.user_id)}>
					修改資料
				</Button>
			</TableCell>
		</TableRow>
	);
}
