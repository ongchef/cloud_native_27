import React from 'react';
// import Snackbar from '@material-ui/core/Snackbar';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
// import IconButton from '@material-ui/core/IconButton';
// import CloseIcon from '@material-ui/icons/Close';
import CloseIcon from '@mui/icons-material/Close';
import Alert from '@mui/material/Alert';

export default function AlertMassage({ message, variant }) {
	const [open, setOpen] = React.useState(true);

	function handleClose(event, reason) {
		if (reason === 'clickaway') {
			return;
		}
		setOpen(false);
	}

	return (
		<div>
			<Snackbar
				// anchorOrigin={{
				// 	vertical: 'bottom',
				// 	horizontal: 'left',
				// }}
				open={open}
				// autoHideDuration={2000}
				onClose={handleClose}
				ContentProps={{
					'aria-describedby': 'message-id',
				}}
				message={message}
				action={[
					<IconButton key="close" onClick={handleClose}>
						<CloseIcon />
					</IconButton>,
				]}>
				<Alert severity={variant}>{message}</Alert>
			</Snackbar>
		</div>
	);
}
