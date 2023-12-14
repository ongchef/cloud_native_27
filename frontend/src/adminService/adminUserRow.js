import React from 'react';
import { TableRow, TableCell, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // Import useNavigate instead of useHistory

export default function AdminUserRow({ user }) {
	const navigate = useNavigate();

	const handleViewHistory = (userId) => {
		console.log(userId);
		navigate(`/adminUserHistoryDetail?id=${userId}`);
	};

	const handleModifyUser = (userId) => {
		console.log(`修改使用者 ${userId} 的資料`);
	};

	return (
		<TableRow>
			<TableCell>{user.name}</TableCell>
			<TableCell>{user.email}</TableCell>
			<TableCell>{user.phone}</TableCell>
			<TableCell>
				<Button
					variant="outlined"
					onClick={() => handleViewHistory(user.user_id)}>
					查看歷史紀錄
				</Button>
			</TableCell>
			<TableCell>
				<Button
					variant="outlined"
					onClick={() => handleModifyUser(user.user_id)}>
					修改資料
				</Button>
			</TableCell>
		</TableRow>
	);
}
