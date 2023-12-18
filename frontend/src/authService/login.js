import React, {
	Component,
	useContext,
	useEffect,
	useState,
	useRef,
} from 'react';
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import CheckButton from 'react-validation/build/button';

import { useNavigate } from 'react-router-dom';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { UserContext } from '../UserContext';
import axios from 'axios';
import AuthService from './authService';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Container from '@mui/material/Container';
import AuthInputField from './authInputField';

const required = (value) => {
	if (!value) {
		return (
			<div className="alert alert-danger" role="alert">
				This field is required!
			</div>
		);
	}
};

export default function Login() {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [loading, setLoading] = useState(false);
	const [message, setMessage] = useState('');
	const form = useRef();
	const checkBtn = useRef();
	const [user, setUser] = useContext(UserContext);
	const navigate = useNavigate();

	async function handleLogin(e) {
		e.preventDefault();
		setMessage('');
		setLoading(true);
		// form.current.validateAll();
		try {
			const res = await AuthService.login(username, password);
			console.log(res);
			let url;
			switch (res.data.role_id) {
				case 1:
					url = '/adminStadiumStatus';
					break;
				case 2:
					url = '/selectSport';
					break;
				case 3:
					url = '/stadiumBoard';
					break;
				default:
					// 預設情況，指定一個默認的 URL
					url = '/';
					break;
			}
			window.location.href = url;
			// navigate(url);
		} catch (error) {
			const resMessage =
				(error.response &&
					error.response.data &&
					error.response.data.message) ||
				error.message ||
				error.toString();
			setLoading(false);
			setMessage(resMessage);
		}
		// }
		try {
			const res = await AuthService.login(username, password);
			navigate('/');
			// console.log(res.data.role_id);
			// let url;
			// switch (res.data.role_id) {
			// 	case 1:
			// 		url = '/adminStadiumStatus';
			// 		break;
			// 	case 2:改了
			// 		url = '/selectSport';
			// 		break;
			// 	case 3:
			// 		url = '/stadiumBoard';
			// 		break;
			// 	default:
			// 		url = '/';
			// 		break;
			// }
			// navigate(url);
			setLoading(false);
		} catch (error) {
			const resMessage =
				(error.response &&
					error.response.data &&
					error.response.data.message) ||
				error.message ||
				error.toString();
			setLoading(false);
			setMessage(resMessage);
		}
		// AuthService.login(username, password).then(
		// 	() => {
		// 		// this.props.history.push("/profile");
		// 		window.location.href = '/';
		// 	},
		// 	(error) => {
		// 		const resMessage =
		// 			(error.response &&
		// 				error.response.data &&
		// 				error.response.data.message) ||
		// 			error.message ||
		// 			error.toString();
		// 		setLoading(false);
		// 		setMessage(resMessage);
		// 	}
		// );
	}

	return (
		<Container component="main" maxWidth="xs">
			<CssBaseline />
			<Box
				sx={{
					marginTop: 8,
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
				}}>
				<Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography component="h1" variant="h5">
					登入
				</Typography>
				<Box component="form" onSubmit={handleLogin} sx={{ mt: 3 }}>
					<Grid container spacing={2}>
						<Grid item xs={12}>
							<AuthInputField
								label="Username"
								type="username"
								name="username"
								setValue={setUsername}
							/>
						</Grid>
						<Grid item xs={12}>
							<AuthInputField
								label="Password"
								type="password"
								name="password"
								setValue={setPassword}
							/>
						</Grid>
						{/* <FormControlLabel
						control={<Checkbox value="remember" color="primary" />}
						label="Remember me"
					/> */}
					</Grid>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						sx={{ mt: 3, mb: 2 }}
						ref={checkBtn}>
						登入
					</Button>
					<Grid container>
						{/* <Grid item xs>
							<Link href="#" variant="body2">
							Forgot password?
							</Link>
						</Grid> */}
						<Grid item>
							<Link href="/register" variant="body2">
								還沒有帳號？註冊
							</Link>
						</Grid>
					</Grid>
				</Box>
			</Box>
		</Container>
	);
}
