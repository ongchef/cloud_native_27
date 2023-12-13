import React from 'react';
import { TableRow, TableCell, Button } from '@mui/material';

export default function AdminUserRow({ user }) {
	const handleViewHistory = (userId) => {
		console.log(`查看使用者 ${userId} 的歷史紀錄`);
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
				<Button variant="outlined" onClick={() => handleViewHistory(user.id)}>
					查看歷史紀錄
				</Button>
			</TableCell>
			<TableCell>
				<Button variant="outlined" onClick={() => handleModifyUser(user.id)}>
					修改資料
				</Button>
			</TableCell>
		</TableRow>
	);
}
