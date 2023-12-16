import React, { useState, useEffect, useCallback } from 'react';
import {
	Table,
	TableContainer,
	TableHead,
	TableBody,
	TableRow,
	TableCell,
	Box,
} from '@mui/material';
import AdminUserRow from './adminUserRow';
import FetchData from '../authService/fetchData';

export default function AdminUserHistory() {
	const [users, setUsers] = useState([]);
	const API_URL = 'http://localhost:3000/api/admin/userHistories';

	const fetchUsers = useCallback(async () => {
		try {
			const fetchedUsers = await FetchData.getData(API_URL);
			setUsers(fetchedUsers);
		} catch (error) {
			console.error('Error fetching data:', error);
		}
	}, []);

	useEffect(() => {
		fetchUsers();
	}, [fetchUsers]);

	return (
		<Box>
			<h3>adminUserHistory</h3>
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
							<TableCell
								sx={{
									justifyContent: 'center',
									textAlign: 'center',
								}}>
								使用者名稱
							</TableCell>
							<TableCell
								sx={{
									justifyContent: 'center',
									textAlign: 'center',
								}}>
								信箱
							</TableCell>
							<TableCell
								sx={{
									justifyContent: 'center',
									textAlign: 'center',
								}}>
								電話
							</TableCell>
							<TableCell
								sx={{
									justifyContent: 'center',
									textAlign: 'center',
								}}>
								查看使用者歷史紀錄
							</TableCell>
							<TableCell
								sx={{
									justifyContent: 'center',
									textAlign: 'center',
								}}>
								修改使用者資料
							</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{users &&
							users.map((user) => (
								<AdminUserRow key={user.user_id} user={user} />
							))}
					</TableBody>
				</Table>
			</TableContainer>
		</Box>
	);
}
