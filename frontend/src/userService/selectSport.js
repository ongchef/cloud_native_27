// App.js

import React from 'react';
import {
	Card,
	CardActionArea,
	CardMedia,
	Typography,
	Box,
	Grid,
} from '@mui/material';
import { useNavigate } from 'react-router-dom'; // 引入useNavigate

const sports = [
	{ name: '羽球', image: 'badminton.png', index: 1 },
	{ name: '籃球', image: 'basketball.png', index: 2 },
	{ name: '桌球', image: 'ping-pong.png', index: 3 },
	{ name: '排球', image: 'volleyball.png', index: 4 },
];

export default function SelectSport() {
	const navigate = useNavigate();

	const handleSelectSport = (sport) => {
		navigate(`/joinStadium?sport=${sport.index}`);
		console.log(`已選擇${sport.name} index=${sport.index}`);
	};

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
					<Grid
						container
						spacing={3}
						direction="row"
						justify="space-evenly"
						alignItems="stretch">
						{sports.map((sport, index) => (
							<Grid item xs={6} md={6} key={index} display="flex">
								<Card
									sx={{
										margin: '0 auto',
										padding: '0.1em',
									}}>
									<CardActionArea onClick={() => handleSelectSport(sport)}>
										<CardMedia
											component="img"
											height="140"
											image={sport.image}
											alt={sport.name}
											sx={{ padding: '0 1em 0 0', objectFit: 'contain' }}
										/>
										<Typography variant="h6" align="center">
											{sport.name}
										</Typography>
									</CardActionArea>
								</Card>
							</Grid>
						))}
					</Grid>
				</Box>
			</Box>
		</div>
	);
}
