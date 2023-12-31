import './App.css';
import { Routes, Route, Link, Router, Navigate } from 'react-router-dom';
import { styled, useTheme } from '@mui/material/styles';
import Login from './authService/login';
import Register from './authService/register';
import { useCallback, useContext, useEffect, useState } from 'react';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import Drawer from '@mui/material/Drawer';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { AppBar, Box, Button } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import AuthService from './authService/authService';
import eventBus from './authService/eventBus';
import AuthVerify from './authService/authVerify';
import OrderStadium from './userService/orderStadium';
import JoinStadium from './userService/joinStadium';
import UserHistory from './userService/userHistory';
import OrderStadiumDetail from './userService/orderStadiumDetail';
import JoinStadiumDetail from './userService/joinStadiumDetail';
import AdminStadiumStatus from './adminService/adminStadiumStatus';
import { useNavigate } from 'react-router-dom'; // 引入useNavigate鉤子
import StadiumBoard from './provider/stadiumBoard';
import StadiumBookingDetail from './provider/stadiumBookingDetail';
import ReadStadium from './provider/CRUD/readStadium';
import CreateStadium from './provider/CRUD/createStadium';
import AdminStadiumDetail from './adminService/adminStadiumDetail';
import AdminAddProvider from './adminService/adminAddProvider';
import AdminUserHistory from './adminService/adminUserHistory';
import UserProfile from './userService/userProfile';
import Map from './commonService/map';
import UpdateStadium from './provider/CRUD/updateStadium';
import AdminUserHistoryDetail from './adminService/adminUserHistoryDetail';
import AdminUserProfile from './adminService/adminUserProfile';
import SelectSport from './userService/selectSport';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import SimpleBadge from './commonService/notification';
import Home from './home';

const drawerWidth = 240;

const DrawerHeader = styled('div')(({ theme }) => ({
	display: 'flex',
	alignItems: 'center',
	padding: theme.spacing(0, 1),
	// necessary for content to be below app bar
	...theme.mixins.toolbar,
	justifyContent: 'flex-end',
}));
const DrawerFooter = styled('div')({
	flexGrow: 1,
});
export default function App() {
	const navigate = useNavigate(); // 獲取navigate函數
	const [open, setOpen] = useState(false);

	const handleDrawerOpen = () => {
		setOpen(true);
	};

	const handleDrawerClose = () => {
		setOpen(false);
		// const decodedJwt = JSON.parse(atob(user.accessToken.split(".")[1]));

		// console.log(decodedJwt.exp  )
	};

	const [verified, setVerified] = useState(false);
	const [user, setUser] = useState(false);
	const [admin, setAdmin] = useState(false);
	const [provider, setProvider] = useState(false);

	const logOut = useCallback(() => {
		AuthService.logout();
		setVerified(false);
		setUser(false);
		setAdmin(false);
		setProvider(false);
		navigate('/login');
	}, []);

	useEffect(() => {
		const user = AuthService.getCurrentUser();
		console.log(user);
		if (user) {
			setVerified(true);
			if (user.role === 'ROLE_USER') {
				setUser(true);
			} else if (user.role === 'ROLE_ADMIN') {
				setAdmin(true);
			} else if (user.role === 'ROLE_PROVIDER') {
				setProvider(true);
			}
		} else {
			if (
				window.location.pathname !== '/login' &&
				window.location.pathname !== '/register'
			)
				window.location.href = '/login';
		}

		eventBus.on('logout', () => {
			logOut();
		});

		return () => {
			eventBus.remove('logout');
		};
	}, [logOut]);

	return (
		<div>
			<AppBar open={open}>
				<Toolbar>
					
					<IconButton
						color="inherit"
						aria-label="open drawer"
						onClick={handleDrawerOpen}
						edge="start"
						sx={{ mr: 2, ...(open && { display: 'none' }) }}>
						<MenuIcon />
					</IconButton>
					<Typography variant="h6" noWrap component="div">
						Joinable
					</Typography>	
						<Box display='flex' sx={{marginLeft : 'auto'}}>
						{
							user&&
							<SimpleBadge/>
						}
				
						{
							verified && (
							<Button
								display="flex"
								variant="h6"
								onClick={logOut}
								// to="/login"
								>
								<LogoutIcon></LogoutIcon>
								登出
							</Button>
						) }
						</Box>
					
				</Toolbar>
			</AppBar>
			<Drawer
				sx={{
					width: drawerWidth,
					flexShrink: 0,
					'& .MuiDrawer-paper': {
						width: drawerWidth,
						boxSizing: 'border-box',
					},
				}}
				variant="persistent"
				anchor="left"
				open={open}>
				<DrawerHeader>
					<IconButton onClick={handleDrawerClose}>
						{<ChevronLeftIcon />}
					</IconButton>
				</DrawerHeader>
				<Divider />
				<List>
					{verified ? (
						''
					) : (
						<>
							<ListItem disablePadding>
								<ListItemButton to="/register">
									<ListItemIcon>
										{<PersonAddAlt1Icon></PersonAddAlt1Icon>}
									</ListItemIcon>
									<ListItemText primary={'註冊'} />
								</ListItemButton>
							</ListItem>
							<ListItem disablePadding>
								<ListItemButton to="/login">
									<ListItemIcon>{<LoginIcon></LoginIcon>}</ListItemIcon>
									<ListItemText primary={'登入'} />
								</ListItemButton>
							</ListItem>
						</>
					)}
					{user ? (
						<>
							<ListItem disablePadding>
								<ListItemButton to="/selectSport">
									<ListItemIcon></ListItemIcon>
									<ListItemText primary={'加入場地'} />
								</ListItemButton>
							</ListItem>
							<ListItem disablePadding>
								<ListItemButton to="/orderStadium">
									<ListItemIcon></ListItemIcon>
									<ListItemText primary={'預約場地'} />
								</ListItemButton>
							</ListItem>
							<ListItem disablePadding>
								<ListItemButton to="/userHistory">
									<ListItemIcon></ListItemIcon>
									<ListItemText primary={'歷史紀錄'} />
								</ListItemButton>
							</ListItem>
						</>
					) : (
						''
					)}

					{provider ? (
						<>
							<ListItem disablePadding>
								<ListItemButton to="/stadiumBoard">
									<ListItemIcon></ListItemIcon>
									<ListItemText primary={'球場狀態查詢'} />
								</ListItemButton>
							</ListItem>
							<ListItem disablePadding>
								<ListItemButton to="/readStadium">
									<ListItemIcon></ListItemIcon>
									<ListItemText primary={'球場管理'} />
								</ListItemButton>
							</ListItem>
							<ListItem disablePadding>
								<ListItemButton>
									<ListItemIcon></ListItemIcon>
									<ListItemText primary={'歷史紀錄'} />
								</ListItemButton>
							</ListItem>
						</>
					) : (
						''
					)}
					{admin ? (
						<>
							<ListItem disablePadding>
								<ListItemButton to="/adminStadiumStatus">
									<ListItemIcon></ListItemIcon>
									<ListItemText primary={'球場狀態查詢'} />
								</ListItemButton>
							</ListItem>
							<ListItem disablePadding>
								<ListItemButton>
									<ListItemIcon></ListItemIcon>
									<ListItemText primary={'球場管理'} />
								</ListItemButton>
							</ListItem>
							<ListItem disablePadding>
								<ListItemButton to="/adminUserHistory">
									<ListItemIcon></ListItemIcon>
									<ListItemText primary={'使用者歷史紀錄'} />
								</ListItemButton>
							</ListItem>
							<ListItem disablePadding>
								<ListItemButton to="/adminAddProvider">
									<ListItemIcon></ListItemIcon>
									<ListItemText primary={'註冊球場供應商'} />
								</ListItemButton>
							</ListItem>
						</>
					) : (
						''
					)}
				</List>
				<Divider />
				{user ? (
					<DrawerFooter>
						<List style={{ position: 'absolute', bottom: '0' }}>
							<ListItem disablePadding>
								<ListItemButton to="/userProfile">
									<ListItemIcon></ListItemIcon>
									<ListItemText primary={'個人資料修改'} />
								</ListItemButton>
							</ListItem>
						</List>
					</DrawerFooter>
				) : (
					''
				)}
			</Drawer>
			<Routes>
				<Route exact path="/" element={<Home />} />
				<Route exact path="/login" element={<Login />} />
				<Route exact path="/register" element={<Register />} />
				<Route exact path="/selectSport" element={<SelectSport />} />

				{/* {user && ( */}
				<>
					<Route exact path="/orderStadium" element={<OrderStadium />} />

					<Route exact path="/joinStadium" element={<JoinStadium />} />

					<Route
						exact
						path="/joinStadiumDetail"
						element={<JoinStadiumDetail />}
					/>
					<Route
						exact
						path="/orderStadiumDetail"
						element={<OrderStadiumDetail />}
					/>
				</>
				{/* )} */}
				<Route exact path="/userProfile" element={<UserProfile />} />
				<Route exact path="/userHistory" element={<UserHistory />} />
				{/* provider */}
				<Route exact path="/stadiumBoard" element={<StadiumBoard />} />
				<Route
					exact
					path="/stadiumBookingDetail"
					element={<StadiumBookingDetail />}
				/>
				<Route exact path="/readStadium" element={<ReadStadium />} />
				<Route exact path="/createStadium" element={<CreateStadium />} />
				<Route exact path="/updateStadium" element={<UpdateStadium />} />
				<Route exact path="/map" element={<Map />} />
				{/* admin */}
				<Route
					exact
					path="/adminStadiumStatus"
					element={<AdminStadiumStatus />}
				/>
				<Route
					exact
					path="/adminStadiumDetail"
					element={<AdminStadiumDetail />}
				/>
				<Route exact path="/adminAddProvider" element={<AdminAddProvider />} />
				<Route exact path="/adminUserHistory" element={<AdminUserHistory />} />
				{/* <Route exact path="*" element={<Navigate to="/"/>}/> */}
				<Route
					exact
					path="/adminUserHistoryDetail"
					element={<AdminUserHistoryDetail />}
				/>
				<Route exact path="/adminUserProfile" element={<AdminUserProfile />} />
			</Routes>
			<AuthVerify logOut={logOut} />
		</div>
	);
}
