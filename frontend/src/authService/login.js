import React, { useContext, useState, useRef } from 'react';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { UserContext } from '../UserContext';
import AuthService from './authService';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import InputField from '../commonService/inputField';
import LoginIcon from '@mui/icons-material/Login';
import AlertMessage from '../commonService/alertMessage';

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
	const [hasError, setHasError] = useState(false);
	const [loginSuccessful, setLoginSuccessful] = useState(false);
	const [showPassword, setShowPassword] = useState(false);

	async function handleLogin(e) {
		e.preventDefault();
		setMessage('');
		setLoading(true);
		setHasError(false);
		setLoginSuccessful(false);
		// form.current.validateAll();
		try {
			const res = await AuthService.login(username, password);
			console.log(res);
			// alert('登入成功！');
			setLoginSuccessful(true);
			setMessage('登入成功');
			let url;
			switch (res.data.role_id) {
				case 1:
					url = '/adminStadiumStatus';
					break;
				case 2:
					url = '/';
					break;
				case 3:
					url = '/stadiumBoard';
					break;
				default:
					url = '/';
					break;
			}
			window.location.href = url;
			// navigate(url);
		} catch (error) {
			if (error.response.status === 401) {
				// alert('帳號或密碼錯誤！');
				setMessage('帳號或密碼錯誤！');
			} else {
				alert('登入失敗');
				setMessage('登入失敗！');
			}
			setHasError(true);
		} finally {
			setLoading(false);
			setLoginSuccessful(false);
		}
	}

	return (
		<Container
			component="main"
			maxWidth="xs"
			display="flex"
			justifyContent="center"
			alignItems="center">
			<CssBaseline />
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					justifyContent: 'center',
					height: '100vh',
				}}>
				<Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
					<LoginIcon />
				</Avatar>
				<Typography component="h1" variant="h5">
					登入
				</Typography>
				<Box
					component="form"
					onSubmit={handleLogin}
					sx={{ mt: 3 }}
					autoComplete="off"
					ref={form}>
					<Grid container spacing={2}>
						<Grid item xs={12}>
							<InputField
								label="帳號"
								type="username"
								name="username"
								setValue={setUsername}
							/>
						</Grid>
						<Grid item xs={12}>
							<InputField
								label="密碼"
								type={showPassword ? 'text' : 'password'}
								name="password"
								setValue={setPassword}
								showPassword={showPassword}
								setShowPassword={setShowPassword}
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
						ref={checkBtn}
						disabled={loading}>
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
			{/* <Stack sx={{ width: '100%' }} spacing={2}>
				{loginSuccessful && <Alert severity="success">{message}</Alert>}
				{hasError && <Alert severity="error">{message}</Alert>}
			</Stack> */}
			{hasError && <AlertMessage message={message} variant="error" />}
			{loginSuccessful && <AlertMessage message={message} variant="success" />}
		</Container>
	);
}
