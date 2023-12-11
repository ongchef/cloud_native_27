import React from 'react';
import TextField from '@mui/material/TextField';

const AuthInputField = ({ label, type, name, setValue }) => {
	return (
		<TextField
			margin="normal"
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
		/>
	);
};

export default AuthInputField;
