import { useNavigate } from "react-router-dom"; // 引入useNavigate
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

function TimeBtn() {
  var availableTimeList = [availableTime[0]]
  console.log(availableTime[0])
  do{
    var time = availableTimeList[availableTimeList.length-1]
    console.log(time)
    time = moment(time.add(30,'minutes').format("HH:mm"),"HH:mm")
    // console.log(time.add(30,"minutes").format("hh:mm"))
    availableTimeList.push(time)
    console.log(time)
    console.log(availableTime[1])
    console.log(time.isBefore(availableTime[1]))
  }while(false)
  // const availableTimeList = Array.from(
  //   new Array(availableTime[1] - 1 - availableTime[0] + 1),
  //   (x, i) => (i + availableTime[0]) / 2
  // );
  const btnList = availableTimeList.map((time) => {
    console.log(time)
    // return (
    //   <Grid item>
    //     {bookingList.some(
    //       (item) => item.period[0] / 2 <= time && item.period[1] / 2 > time
    //     ) ? (
    //       <Tooltip
    //         title={
    //           bookingList.find(
    //             (item) =>
    //               item.period[0] / 2 <= time && item.period[1] / 2 > time
    //           ).num
    //         }
    //         placement="top"
    //       >
    //         <Button 
    //           variant="outlined"
    //         >
    //           {Math.floor(time)}:{time % 1 ? "30" : "00"}
    //         </Button>
    //       </Tooltip>
    //     ) : (
    //       <Button
    //         variant="outlined"
    //         color="inherit"
    //         sx={{ color: "black", borderColor: "black" }}
    //       >
    //         {Math.floor(time)}:{time % 1 ? "30" : "00"}
    //       </Button>
    //     )}
    //   </Grid>
    // );
  });
  return btnList;
}
async function SearchReserved(courtId){
  
  var date = moment("2023-12-01").format("YYYY-MM-DD")
  return FetchData.getData("http://localhost:3000/api/courts/reserved",1,{date:date,court_id:courtId})
}
export default function StadiumBookingDetail() {
  const[reservedTime, setReservedTime] = useState()
  const navigate = useNavigate();
  useEffect(() => {
    let url = new URL(window.location.href);
    let params = url.searchParams;
    var courtId
    for (let pair of params.entries()) {
      console.log(`key: ${pair[0]}, value: ${pair[1]}`);
      courtId=pair[1]
    }
    SearchReserved(courtId).then((res)=>{
        console.log(res)
        setReservedTime(res)
        console.log(moment(res[0].start_time,"HH:mm:ss").hours())
    })
  },[]);
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
                        <TimeBtn />
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
