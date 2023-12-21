import React, { useState, useEffect, useCallback } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import AdminUserRow from './adminUserRow';
import FetchData from '../authService/fetchData';
import Box from '@mui/material/Box';
import Pagination from '@mui/material/Pagination';
import TablePagination from '@mui/material/TablePagination';

export default function AdminUserHistory() {
	const [users, setUsers] = useState([]);
	const [page, setPage] = useState(1);
	const [totalPage, setTotalPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);

	const API_URL = 'api/admin/userHistories';

	const fetchUsers = useCallback(async () => {
		try {
			const fetchedUsers = await FetchData.getData(API_URL);
			console.log(fetchedUsers);
			setUsers(fetchedUsers);
		} catch (error) {
			console.error('Error fetching data:', error);
		}
	}, []);

	useEffect(() => {
		fetchUsers();
	}, [fetchUsers]);

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};
	return (
		<Box>
			<h3>adminUserHistory</h3>
			<TableContainer
				sx={{
					margin: 'auto',
					overflowY: 'auto',
					height: '70vh',
					width: '70vw',
					alignItems: 'center',
					justifyContent: 'center',
				}}>
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
			{/* <Box display="flex" justifyContent="center" marginTop="20px">
				<TablePagination
					component="div"
					count={totalPage}
					page={page}
					onPageChange={handleChangePage}
					rowsPerPage={rowsPerPage}
					onRowsPerPageChange={handleChangeRowsPerPage}
				/>
			</Box> */}
		</Box>
	);
}
