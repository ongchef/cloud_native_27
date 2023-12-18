import React from 'react';
import TextField from '@mui/material/TextField';

const InputField = ({ label, type, name, setValue }) => {
	return (
		<TextField
			required
			fullWidth
			name={name}
			label={label}
			type={type}
			id={name}
			// autoComplete={name}
			onChange={(e) => {
				setValue(e.target.value);
			}}
		/>
	);
};

export default InputField;
