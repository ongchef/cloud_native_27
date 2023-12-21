import Box from '@mui/material/Box'; // 引入Box元件
import Typography from '@mui/material/Typography'; // 引入Typography元件
import HistoryCard from '../userService/userHistoryCard.js'; // 引入StadiumCard元件

import { useEffect, useState } from 'react';
import moment from 'moment/moment';
import FetchData from '../authService/fetchData';
import { useLocation } from 'react-router-dom'; // 引入useNavigate

const balltype = ['羽球', '籃球', '桌球', '排球'];
export default function AdminUserHistoryDetail() {
	const [date, setDate] = useState(moment(new Date()).format('YYYY-MM-DD'));
	const [userHistoryList, setUserHistoryList] = useState([]);
	const API_URL = 'api/admin/userHistoryDetails';
	const location = useLocation();
	const searchParams = new URLSearchParams(location.search);
	const id = searchParams.get('id');

	async function getUserHistory({ id }) {
		return FetchData.getData(API_URL, 1, { user_id: id });
	}

	useEffect(() => {
		getUserHistory({ id }).then((res) => {
			const historyList = res.sort(function (a, b) {
				if (moment(a.date).isAfter(moment(b.date))) {
					return 1;
				} else {
					return -1;
				}
			});
			setUserHistoryList(historyList);
		});
	}, []);

	return (
		<div>
			<h1>user History</h1>
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					gap: '5px',
					alignItems: 'center',
					justifyContent: 'center',
				}}>
				{/* 修改這一行 */}
				<Box width="80vw">
					<Typography variant="h3">球場歷史紀錄</Typography>
				</Box>
				<Box m={0.5} sx={{ height: '70vh', overflowY: 'auto', width: '70%' }}>
					{[...userHistoryList].reverse().map((history) => {
						const currentDate = new Date();

						const currentTime = new Date();
						console.log(currentTime);
						const historyDateInGMT8 = new Date(history.date);
						historyDateInGMT8.setHours(history.end_time.substring(0, 2));
						historyDateInGMT8.setMinutes(history.end_time.substring(3, 5));
						console.log(historyDateInGMT8);
						let year = historyDateInGMT8.getFullYear();
						let month = historyDateInGMT8.getMonth() + 1; // getMonth() returns month index starting from 0
						let day = historyDateInGMT8.getDate();
						// Pad single digit month and day with leading 0
						month = month < 10 ? '0' + month : month;
						day = day < 10 ? '0' + day : day;
						let formattedDate = `${year}-${month}-${day}`;
						// console.log(formattedDate);

						const status = new Date(currentTime) <= new Date(historyDateInGMT8);
						console.log(status);
						return (
							<HistoryCard
								image={history.image_url.split('.jpg')[0] + '.jpg'}
								title={history.court_name + ' - ' + history.location}
								description={[
									history.address,
									formattedDate,
									history.start_time.substring(0, 5) +
										' ~ ' +
										history.end_time.substring(0, 5),
									[balltype[history.ball - 1], history.level, history.rule],
								]}
								status={status}
							/>
						);
					})}
					{/* <HistoryCard
            image={pic}
            title={"球場名稱1"}
            description={[
              "106台北市大安區羅斯福路四段1號",
              "2023-11-02",
              "19:00~21:00",
              ["Basketball", "新手友善", "雙打"],
            ]}
            status={true}
          />
          <HistoryCard
            image={pic2}
            title={"球場名稱2"}
            description={[
              "106台北市大安區羅斯福路四段1號",
              "2023-11-02",
              "19:00~21:00",
              ["Basketball", "新手友善", "雙打"],
            ]}
            status={true}
          />
          <HistoryCard
            image={pic2}
            title={"球場名稱3"}
            description={[
              "106台北市大安區羅斯福路四段1號",
              "2023-11-02",
              "19:00~21:00",
              ["Basketball", "新手友善", "雙打"],
            ]}
            status={false}
          /> */}
				</Box>
			</Box>
		</div>
	);

	// const [date, setDate] = useState(moment(new Date()).format('YYYY-MM-DD'));
	// const [userHistoryList, setUserHistoryList] = useState([]);
	// const API_URL = 'api/admin/userHistoryDetails';
	// const location = useLocation();
	// const searchParams = new URLSearchParams(location.search);
	// const id = searchParams.get('id');
	// const navigate = useNavigate();

	// async function getUserHistory({ id }) {
	// 	// return await axios.get(API_URL, {
	// 	// 	headers: authHeader(),
	// 	// 	params: {
	// 	// 		user_id: id,
	// 	// 	},
	// 	// });
	// 	try {
	// 		const res = await FetchData.getData(API_URL, 1, { user_id: id });
	// 		console.log(res);
	// 	} catch (error) {
	// 		console.log(error);
	// 		return [];
	// 	}
	// }

	// const handleBackToUserHistory = (e) => {
	// 	e.preventDefault();
	// 	navigate('/adminUserHistory');
	// };

	// useEffect(() => {
	// 	console.log(id);
	// 	getUserHistory({ id }).then((res) => setUserHistoryList(res));
	// }, []);

	// return (
	// 	<div>
	// 		<h1>user History</h1>
	// 		<Box
	// 			sx={{
	// 				display: 'flex',
	// 				flexDirection: 'column',
	// 				gap: '5px',
	// 				alignItems: 'center',
	// 				justifyContent: 'center',
	// 			}}>
	// 			{/* 修改這一行 */}
	// 			<Box width="80vw">
	// 				<Typography variant="h3">球場歷史紀錄</Typography>
	// 				<Button variant="contained" onClick={handleBackToUserHistory}>
	// 					回到使用者歷史紀錄
	// 				</Button>
	// 			</Box>
	// 			<Box m={0.5} sx={{ height: '70vh', overflowY: 'auto', width: '70%' }}>
	// 				{[...userHistoryList].reverse().map((history) => {
	// 					const currentDate = new Date();
	// 					const currentDateString = currentDate.toISOString().split('T')[0];

	// 					const historyDateInGMT8 = new Date(history.date);
	// 					console.log(historyDateInGMT8);
	// 					const historyDateInGMT8String = historyDateInGMT8
	// 						.toISOString()
	// 						.split('T')[0];
	// 					let year = historyDateInGMT8.getFullYear();
	// 					let month = historyDateInGMT8.getMonth() + 1; // getMonth() returns month index starting from 0
	// 					let day = historyDateInGMT8.getDate();

	// 					// Pad single digit month and day with leading 0
	// 					month = month < 10 ? '0' + month : month;
	// 					day = day < 10 ? '0' + day : day;

	// 					let formattedDate = `${year}-${month}-${day}`;
	// 					console.log(formattedDate);
	// 					const status =
	// 						new Date(currentDateString) <= new Date(historyDateInGMT8String);
	// 					//console.log(status);
	// 					return (
	// 						<HistoryCard
	// 							image={history.image_url.split('.jpg')[0] + '.jpg'}
	// 							title={history.court_name + ' - ' + history.location}
	// 							description={[
	// 								history.address,
	// 								formattedDate,
	// 								history.start_time.substring(0, 5) +
	// 									' ~ ' +
	// 									history.end_time.substring(0, 5),
	// 								[balltype[history.ball - 1], history.level, history.rule],
	// 							]}
	// 							status={status}
	// 						/>
	// 					);
	// 				})}
	// 			</Box>
	// 		</Box>
	// 	</div>
	// );
}
