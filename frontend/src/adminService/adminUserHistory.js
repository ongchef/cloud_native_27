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
	const fakeUsers = Array(20)
		.fill({
			username: 'John Doe',
			email: 'johndoe@gmail.com',
			phone: '0912345678',
		})
		.map((fakeUser, idx) => {
			return { ...fakeUser, id: idx + 1 };
		});

	const users = [
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

	const handleModifyUser = (userId) => {
		console.log(`修改使用者 ${userId} 的資料`);
	};
	return (
		<TableContainer sx={{ overflowY: 'auto' }}>
			<Table>
				<TableHead>
					<TableRow
						sx={{
							'& th': {
								fontSize: '1rem',
								backgroundColor: 'gray',
								borderBottom: 1,
							},
						}}>
						<TableCell>使用者id</TableCell>
						<TableCell>使用者名稱</TableCell>
						<TableCell>信箱</TableCell>
						<TableCell>電話</TableCell>
						<TableCell>查看使用者歷史紀錄</TableCell>
						<TableCell>修改使用者資料</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{fakeUsers.map((user) => (
						<TableRow key={user.id}>
							<TableCell>{user.id}</TableCell>
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
							<TableCell>
								<Button
									variant="outlined"
									onClick={() => handleModifyUser(user.userId)}>
									修改資料
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
