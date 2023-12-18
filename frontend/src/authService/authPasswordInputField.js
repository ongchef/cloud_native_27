import React from 'react';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const AuthPasswordInputField = ({
	label,
	type,
	name,
	setValue,
	showPassword,
	setShowPassword,
}) => {
	const handleShowPassword = () => {
		console.log(showPassword);
		setShowPassword((show) => !show);
	};
	return (
		<TextField
			margin="small"
			required
			fullWidth
			name={name}
			label={label}
			type={type}
			id={name}
			autoComplete={name}
			onChange={(e) => {
				setValue(e.target.value);
			}}
			InputProps={{
				endAdornment: (
					<InputAdornment position="end">
						<IconButton
							aria-label="toggle password visibility"
							onClick={handleShowPassword}
							edge="end">
							{showPassword ? <VisibilityOff /> : <Visibility />}
						</IconButton>
					</InputAdornment>
				),
			}}
		/>
	);
};

export default AuthPasswordInputField;
