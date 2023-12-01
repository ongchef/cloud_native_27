import Box from '@mui/material/Box'; // 引入Box元件
import Typography from '@mui/material/Typography'; // 引入Typography元件
import HistoryCard from './userHistoryCard'; // 引入StadiumCard元件
import pic from '../pic/羽球1.png';
import pic2 from '../pic/羽球3.png';

export default function UserHistory() {
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
				<Box m={0.5} sx={{ height: '70vh', overflowY: 'auto' }}>
					<HistoryCard
						image={pic}
						title={'球場名稱1'}
						description={[
							'106台北市大安區羅斯福路四段1號',
							'2023-11-02',
							'19:00~21:00',
							['Basketball', '新手友善', '雙打'],
						]}
						status={true}
					/>
					<HistoryCard
						image={pic2}
						title={'球場名稱2'}
						description={[
							'106台北市大安區羅斯福路四段1號',
							'2023-11-02',
							'19:00~21:00',
							['Basketball', '新手友善', '雙打'],
						]}
						status={true}
					/>
					<HistoryCard
						image={pic2}
						title={'球場名稱3'}
						description={[
							'106台北市大安區羅斯福路四段1號',
							'2023-11-02',
							'19:00~21:00',
							['Basketball', '新手友善', '雙打'],
						]}
						status={false}
					/>
				</Box>
			</Box>
		</div>
	);
}
