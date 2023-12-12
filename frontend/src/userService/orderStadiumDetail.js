// React and hooks
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
// Material UI components
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { Card, IconButton } from "@mui/material";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import ButtonM from "@mui/material/Button";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import PlaceIcon from "@mui/icons-material/Place";
// Ant Design components
import { Input } from "antd";
import { Button } from "antd";
import { Radio } from "antd";
import { Switch } from "antd";
// Other imports
import axios from "axios";
import Map from "../commonService/map";
import authHeader from "../authService/authHeader";
import pic2 from "../pic/羽球3.png";

// const availableTime = [32, 42];
// const bookingList = [
//   {
//     num: 4,
//     period: [32, 36],
//   },
//   {
//     num: 2,
//     period: [38, 41],
//   },
// ];

export default function OrderStadiumDetail() {
  // Inside your component
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get("id");
  const datetime = searchParams.get("time");
  console.log(id, datetime);
  const navigate = useNavigate();
  const [dataLoaded, setDataLoaded] = useState(false);

  const [selectedOptions, setSelectedOptions] = useState([]);
  const [availableTime, setAvailableTime] = useState();
  const [bookingList, setBookingList] = useState([]);
  async function StadiumDetail() {
    return await axios.get(
      "http://localhost:3000/api/users/appointmentDetail",
      {
        headers: authHeader(),
        params: {
          court_id: id,
          query_time: datetime,
        },
      }
    );
  }
  const [stadiumDetail, setStadiumDetail] = useState([]);

  useEffect(() => {
    StadiumDetail().then((res) => {
      console.log(res.data);
      setStadiumDetail(res.data);
      SetDetails(res.data);
    });
  }, []);

  function SetDetails(data) {
    const date = new Date(data[0].appointment_time[0].date);
    const weekday = date.getDay() || 7; // Convert Sunday from 0 to 7
    const availableTimeObj = data[0].available_time.find(
      (time) => time.weekday === weekday
    );
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
    // console.log(availableTime1); // Logs: [16, 24]
    // console.log(bookingList1);
    setAvailableTime(availableTime1);
    setBookingList(bookingList1);
    setDataLoaded(true);
    console.log(availableTime);
    console.log(bookingList);
  }

  useEffect(() => {
    let url = new URL(window.location.href);
    let params = url.searchParams;
    for (let pair of params.entries()) {
      console.log(`key: ${pair[0]}, value: ${pair[1]}`);
    }
  });
  const validateTime = () => {
    if (selectedOptions === null || selectedOptions.length === 0) {
      console.log("No time selected");
      return false;
    }
    // Sort the selected times
    const sortedTimes = selectedOptions.sort();
    // Iterate over the sorted times
    for (let i = 0; i < sortedTimes.length - 1; i++) {
      // Parse the hours and minutes of the current time and the next time
      const [currentHours, currentMinutes] = sortedTimes[i]
        .split(":")
        .map(Number);
      const [nextHours, nextMinutes] = sortedTimes[i + 1]
        .split(":")
        .map(Number);
      // Calculate the difference in minutes
      const difference =
        nextHours * 60 + nextMinutes - (currentHours * 60 + currentMinutes);
      // If the difference is not 30 minutes, the times are not continuous
      if (difference !== 30) {
        console.log("Selected times are not continuous");
        return false;
      }
    }
    console.log("Selected times are continuous");
    return [true, `${sortedTimes[0]}~${sortedTimes[sortedTimes.length - 1]}`];
  };

  function TimeBtn(props) {
    const {availableTime, bookingList} = props
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
    // <div>
    //   {dataLoaded ? (
    <div>
      <h1>Order Stadium Detail</h1>

      <Box
        display="flex"
        width="70vw"
        flexDirection="column"
        justifyContent="center"
      >
        <Container maxWidth="sm" width="90vw">
          <Box my={1}>
            <ButtonM
              width="300px"
              variant="outlined"
              onClick={() => navigate(-1)}
            >
              <ArrowBackIcon />
              返回搜尋頁
            </ButtonM>
          </Box>

          <Typography variant="h4">預約球場詳細資訊</Typography>
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
                        週一至週五 16:00~21:00 開放預約
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
                      預約時間：
                    </Typography>

                    <Box mx={1}>
                      <Grid container spacing={1}>
                        {console.log(availableTime)}
                        {console.log(bookingList)}
                       {bookingList&&availableTime&&
                        (<TimeBtn
                              bookingList={bookingList}
                              availableTime={availableTime}
                            />)}
                      </Grid>
                    </Box>
                    <Box my={1} display="flex" alignItems="center">
                      <Typography
                        variant="body1"
                        color="000000"
                        paddingX={1}
                        paddingY={0.2}
                        sx={{ fontWeight: "bold" }}
                      >
                        強度：
                      </Typography>
                      <Radio.Group defaultValue="newbie" buttonStyle="solid">
                        <Radio.Button value="newbie">新手友善</Radio.Button>
                        <Radio.Button value="advanced">Advanced</Radio.Button>
                        <Radio.Button value="prestige">頂尖對決</Radio.Button>
                      </Radio.Group>
                    </Box>
                    <Box my={1} display="flex" alignItems="center">
                      <Typography
                        variant="body1"
                        color="000000"
                        paddingX={1}
                        paddingY={0.2}
                        sx={{ fontWeight: "bold" }}
                      >
                        規則：
                      </Typography>
                      <Radio.Group defaultValue="single" buttonStyle="solid">
                        <Radio.Button value="single">單打</Radio.Button>
                        <Radio.Button value="double">雙打</Radio.Button>
                      </Radio.Group>
                    </Box>
                    <Box my={1} display="flex" alignItems="center">
                      <Typography
                        variant="body1"
                        color="000000"
                        paddingX={1}
                        paddingY={0.2}
                        sx={{ fontWeight: "bold" }}
                      >
                        備註：
                      </Typography>
                      <Input
                        placeholder="e.g. 激烈碰撞"
                        style={{ width: 300 }}
                      />
                    </Box>
                    <Box my={1} display="flex" alignItems="center">
                      <Typography
                        variant="body1"
                        color="000000"
                        paddingX={1}
                        paddingY={0.2}
                        sx={{ fontWeight: "bold" }}
                      >
                        將此預約設定為私人房間：
                      </Typography>
                      <Switch />
                    </Box>
                    <Box display="flex" justifyContent="flex-end">
                      <ButtonM
                        width="300px"
                        variant="outlined"
                        onClick={() => {
                          console.log(validateTime());
                        }}
                      >
                        <ArrowForwardIcon />
                        預約場地
                      </ButtonM>
                    </Box>
                  </CardContent>
                </Grid>
              </Grid>
            </Card>
            <Box>
              <Map
                latitude={25.014057657671447}
                longtitude={121.53812819619687}
                name={"台大綜合體育館 - 一樓多功能球場"}
              />
            </Box>
          </Box>
        </Container>
      </Box>
    </div>
    //   ) : (
    //     // Loading indicator
    //     <p>Loading...</p>
    //   )}
    // </div>
  );
}
