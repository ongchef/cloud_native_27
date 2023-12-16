// App.js

import React from 'react';

import Box from '@mui/material/Box'; // 引入Box元件
import Typography from '@mui/material/Typography'; // 引入Typography元件
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';

const sports = [
	{ name: '羽球', image: 'badminton.png' },
	{ name: '桌球', image: 'ping-pong.png' },
	{ name: '排球', image: 'volleyball.png' },
	{ name: '籃球', image: 'basketball.png' },
];

export default function SelectSport() {
	return (
		<div>
			<h1>Select Sport</h1>
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					gap: '5px',
					alignItems: 'center',
					justifyContent: 'center',
				}}>
				<Box width="80vw">
					<Typography variant="h3" textAlign="center">
						今天想打什麼球？
					</Typography>
				</Box>
				<Box>
					<Grid container spacing={3}>
						{sports.map((sport, index) => (
							<Grid item xs={6} md={3} key={index}>
								<Card>
									<CardMedia
										component="img"
										height="140"
										image={sport.image}
										alt={sport.name}
									/>
									<Typography variant="h6" align="center">
										{sport.name}
									</Typography>
								</Card>
							</Grid>
						))}
					</Grid>
				</Box>
			</Box>
		</div>
	);
}
