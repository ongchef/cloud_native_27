import React from 'react';
import {
	Table,
	TableContainer,
	TableHead,
	TableBody,
	TableRow,
	TableCell,
	Button,
} from '@mui/material';

const adminUserHistory = ({ userData }) => {
	const fakeUsers = [
		{
			userId: 1,
			username: 'John Doe',
			email: 'johndoe@gmail.com',
			phone: '0912345678',
		},
		{
			userId: 1,
			username: 'Jane Doe',
			email: 'janedoe@gmail.com',
			phone: '0987654321',
		},
		// ... 添加更多測試資料
	];

	const handleViewHistory = (userId) => {
		console.log(`查看使用者 ${userId} 的歷史紀錄`);
	};

	return (
		<TableContainer>
			<Table>
				<TableHead>
					<TableRow>
						<TableCell>使用者名稱</TableCell>
						<TableCell>信箱</TableCell>
						<TableCell>電話</TableCell>
						<TableCell>查看使用者歷史紀錄</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{fakeUsers.map((user) => (
						<TableRow key={user.userId}>
							<TableCell>{user.username}</TableCell>
							<TableCell>{user.email}</TableCell>
							<TableCell>{user.phone}</TableCell>
							<TableCell>
								<Button
									variant="outlined"
									onClick={() => handleViewHistory(user.userId)}>
									查看歷史紀錄
								</Button>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
};

export default adminUserHistory;
