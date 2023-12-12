import { useLocation, useNavigate } from "react-router-dom"; // 引入useNavigate
import Button from "@mui/material/Button"; // 引入Button元件
import { useEffect, useState } from "react";
import Container from "@mui/material/Container"; // 引入Container元件
import Box from "@mui/material/Box"; // 引入Box元件
import pic2 from "../pic/羽球3.png";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Card } from "@mui/material";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Tooltip from "@mui/material/Tooltip";
import FetchData from "../authService/fetchData";
import dayjs from "dayjs";
import moment from "moment";
import CircularProgress from '@mui/material/CircularProgress';

const availableTime = [moment("13:00","HH:mm"),moment("15:00","HH:mm")];
const bookingList = [
  {
    num: 4,
    period: [26, 30],
  },
  {
    num: 2,
    period: [34, 38],
  },
];


async function SearchReserved(courtId,datetime){
  
  return FetchData.getData("http://localhost:3000/api/courts/reserved",1,{date:datetime,court_id:courtId})
}
export default function StadiumBookingDetail() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get("id");
  const datetime = searchParams.get("time");
  const [dataLoaded, setDataLoaded] = useState(false);

  const [selectedOptions, setSelectedOptions] = useState([]);
  const[reservedTime, setReservedTime] = useState()
  const [availableTime, setAvailableTime] = useState([10,20]);
  const [bookingList, setBookingList] = useState([]);
  
  const navigate = useNavigate();
  useEffect(() => {
    SearchReserved(id,datetime).then((res)=>{
        console.log(res)
        setReservedTime(res)
        SetDetails(res);
    })
  },[]);

  function SetDetails(data) {
    const date = new Date(datetime.split(" ")[0]);
    const weekday = date.getDay() || 7; // Convert Sunday from 0 to 7
    console.log(data)
    // 要等API改
    const availableTimeObj = data[0].availableTime.find(
      (time) => time.weekday === weekday
    );
    console.log(availableTimeObj)
    const availableTime1 = [
      parseInt(availableTimeObj.start_time.split(":")[0]) * 2,
      parseInt(availableTimeObj.end_time.split(":")[0]) * 2,
    ];
    const bookingList1 = data[0].appointment_time.map((time) => ({
      period: [
        parseInt(time.start_time.split(":")[0]) * 2,
        parseInt(time.end_time.split(":")[0]) * 2,
      ],
    }));
    setAvailableTime(availableTime1);
    setBookingList(bookingList1);
    setDataLoaded(true);
    console.log(availableTime);
    console.log(bookingList);
  }
  
  function TimeBtn(props) {
    const { availableTime, bookingList } = props;
    console.log(availableTime[1] - availableTime[0]);
    const availableTimeList = Array.from(
      new Array(availableTime[1] - availableTime[0]),
      (x, i) => (i + availableTime[0]) / 2
    );
    const btnList = availableTimeList.map((time) => {
      const value = `${Math.floor(time)}:${time % 1 ? "30" : "00"}`;
      return (
        <Grid item>
          {bookingList.some(
            (item) => item.period[0] / 2 <= time && item.period[1] / 2 > time
          ) ? (
            <Button
              variant="outlined"
              color="inherit"
              disabled
              key={value}
              value={time % 1 ? "30" : "00"}
              type={selectedOptions.includes(value) ? "primary" : "default"}
              onClick={() => handleButtonClick(value)}
            >
              {value}
            </Button>
          ) : (
            <Button
              variant="outlined"
              color="inherit"
              key={value}
              value={time % 1 ? "30" : "00"}
              type={selectedOptions.includes(value) ? "primary" : "default"}
              onClick={() => handleButtonClick(value)}
            >
              {value}
            </Button>
          )}
        </Grid>
      );
    });
    return btnList;
  }
  const handleButtonClick = (value) => {
    if (selectedOptions.includes(value)) {
      setSelectedOptions(selectedOptions.filter((option) => option !== value));
    } else {
      setSelectedOptions([...selectedOptions, value]);
    }
  };
  return (
    <div>
      <h1>場地詳細狀況</h1>
      <Box
        display="flex"
        width="70vw"
        flexDirection="column"
        justifyContent="center"
      >
        <Container maxWidth="sm" width="90vw">
          <Button width="300px" variant="outlined" onClick={() => navigate(-1)}>
            <ArrowBackIcon />
            返回搜尋頁
          </Button>
          {/* 內容1 */}
        </Container>
        <Container maxWidth="sm">
          <Box my={2}>
            <Card sx={{ width: "70vw", margin: "auto" }}>
              <Grid
                paddingLeft="30px"
                container
                spacing={2}
                alignItems="center"
                justifyContent="center"
              >
                <Grid item xs={12} sm={6}>
                  <CardMedia
                    component="img"
                    image={pic2} // 替換為您的圖片URL
                    alt="Stadium"
                  />
                </Grid>
                <Grid item xs={6}>
                  <CardContent>
                    <Typography
                      variant="h5"
                      component="div"
                      sx={{ fontWeight: "bold" }}
                    >
                      台大綜合體育館 - 一樓多功能球場 2023/11/02
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      paddingX={1}
                      paddingY={0.6}
                    >
                      106台北市大安區羅斯福路四段1號
                    </Typography>
                    <Typography
                      variant="body2"
                      color="000000"
                      paddingY={0.6}
                      paddingX={1}
                    >
                      <span
                        style={{
                          color: "000000",
                          backgroundColor: "#D9D9D9",
                          paddingLeft: "10px",
                          paddingRight: "10px",
                        }}
                      >
                        週一至週五 13:00~20:00 開放預約
                      </span>
                    </Typography>
                    <Typography
                      variant="body2"
                      color="000000"
                      paddingX={1}
                      paddingY={0.6}
                    >
                      建議最大使用人數 : {8}
                    </Typography>
                    <Typography
                      variant="body1"
                      color="000000"
                      paddingX={1}
                      paddingY={0.6}
                      sx={{ fontWeight: "bold" }}
                    >
                      預約狀況：
                    </Typography>

                    <Box mx={1}>
                      <Grid container spacing={1}>
                        {console.log(availableTime)}
                      {false?
                        <Box sx={{display:'flex', justifyContent:'center'}}>
                          <CircularProgress />
                        </Box>
                        :(bookingList && availableTime && (
                          <TimeBtn
                            bookingList={bookingList}
                            availableTime={availableTime}
                          />)
                        )}
                      </Grid>
                    </Box>
                    <Box display="flex" justifyContent="flex-end">
                      <Tooltip
                        title="Click to reserve the stadium"
                        placement="top"
                      >
              
                      </Tooltip>
                    </Box>
                  </CardContent>
                </Grid>
              </Grid>
            </Card>
          </Box>
        </Container>
      </Box>
      {/* 添加這一行 */}
    </div>
  );
}
