import React, { useState, useEffect, useCallback } from 'react';
import {
	Table,
	TableContainer,
	TableHead,
	TableBody,
	TableRow,
	TableCell,
	Button,
	Box,
} from '@mui/material';
import AdminUserRow from './adminUserRow';
import axios from 'axios';
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

	// const fetchUsers = async () => {
	// 	try {
	// 		return FetchData.getData(API_URL);
	// 	} catch (error) {
	// 		console.error('Error fetching data:', error);
	// 	}
	// };

	// useEffect(() => {
	// 	try {
	// 		const response = fetchUsers();
	// 		setUsers(response.data);
	// 	} catch (error) {
	// 		console.error('Error fetching data:', error);
	// 	}
	// }, []);

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
							<TableCell>使用者名稱</TableCell>
							<TableCell>信箱</TableCell>
							<TableCell>電話</TableCell>
							<TableCell>查看使用者歷史紀錄</TableCell>
							<TableCell>修改使用者資料</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{users &&
							users.map((user) => <AdminUserRow key={user.id} user={user} />)}
					</TableBody>
				</Table>
			</TableContainer>
		</Box>
	);
}
