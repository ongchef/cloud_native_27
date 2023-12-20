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
import CircularProgress from "@mui/material/CircularProgress";
import Snackbar from "@mui/material/Snackbar";
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
import FetchData from "../authService/fetchData";
import LinearProgress from "@mui/material/LinearProgress";
const ballTypes = {
  1: "羽球",
  2: "籃球",
  3: "桌球",
  4: "排球",
};
const ballTypeMapping = {
  羽球: 1,
  籃球: 2,
  桌球: 3,
  排球: 4,
  // Add other ball types here
};
export default function OrderStadiumDetail() {
  // Inside your component
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get("id");
  const datetime = searchParams.get("time");
  const navigate = useNavigate();
  const [courtInfo, setCourtInfo] = useState({});
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [availableTime, setAvailableTime] = useState();
  const [bookingList, setBookingList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [switchState, setSwitchState] = useState(false);
  const [rule, setRule] = useState("");
  const [level, setLevel] = useState("新手友善");
  const [note, setNote] = useState("");
  const [password, setPassword] = useState("");
  const [open, setOpen] = useState(false);
  const [balls, setBalls] = useState();
  const [ball, setBall] = useState();

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  const handleSwitchChange = () => {
    setSwitchState(!switchState);
  };
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

  useEffect(() => {
    setLoading(true);
    StadiumDetail().then((res) => {
      //console.log(res.data);
      if (res.data.length > 0) {
        let courtData = { ...res.data[0] };
        delete courtData.available_time;
        delete courtData.appointment_time;
        setCourtInfo(courtData);
      }

      SetDetails(res.data);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    console.log(ball);
  }, [ball]);
  function SetDetails(data) {
    const date = new Date(datetime.split(" ")[0]);
    const weekday = date.getDay() || 7; // Convert Sunday from 0 to 7
    const availableTimeObj = data[0].available_time.find(
      (time) => time.weekday === weekday
    );
    const weekdayMapping = ["日", "一", "二", "三", "四", "五", "六"];
    const weekdayInChinese = weekdayMapping[weekday];

    const availableTime = [
      parseInt(availableTimeObj.start_time.split(":")[0]) * 2,
      parseInt(availableTimeObj.end_time.split(":")[0]) * 2,
    ];
    const courtData = { ...data[0] };
    delete courtData.available_time;
    delete courtData.appointment_time;
    courtData.weekday = weekdayInChinese;
    courtData.availableTimeinday =
      availableTimeObj.start_time.substring(0, 5) +
      "~" +
      availableTimeObj.end_time.substring(0, 5);
    console.log(courtData);
    const bookingList = data[0].appointment_time.map((time) => ({
      period: [
        parseInt(time.start_time.split(":")[0]) * 2,
        parseInt(time.end_time.split(":")[0]) * 2 + 1,
      ],
    }));
    const balls = data[0].ball_type_id
      .split(",")
      .map((ballType) => ballTypes[ballType]);

    console.log(bookingList);
    console.log(availableTime);
    setCourtInfo(courtData);
    setAvailableTime(availableTime);
    setBookingList(bookingList);
    setBalls(balls);
    setBall(balls[0]);
  }

  useEffect(() => {
    let url = new URL(window.location.href);
    let params = url.searchParams;
    for (let pair of params.entries()) {
      console.log(`key: ${pair[0]}, value: ${pair[1]}`);
    }
  }, []);
  const validateTime = () => {
    if (selectedOptions === null || selectedOptions.length === 0) {
      console.log("No time selected");
      alert("請選擇時間");
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
        alert("請選擇連續的時間");
        return false;
      }
    }
    console.log("Selected times are continuous");
    function roundUpToNearestHalfHour(time) {
      let [hours, minutes] = time.split(":").map(Number);
      if (minutes < 30) {
        minutes = 30;
      } else {
        minutes = 0;
        hours++;
      }
      return `${hours.toString().padStart(2, "0")}:${minutes
        .toString()
        .padStart(2, "0")}`;
    }
    console.log(balls);

    let appointment = {
      court_id: id,
      public: switchState ? 0 : 1,
      ball: ballTypeMapping[ball],
      level: level,
      rule: rule,
      password: password,
      note: note,
      date: datetime.split(" ")[0],
      start_time: sortedTimes[0],
      end_time: roundUpToNearestHalfHour(sortedTimes[sortedTimes.length - 1]),
    };
    console.log(appointment);
    FetchData.postData(
      "http://localhost:3000/api/users/appointment",
      appointment
    ).then((res) => {
      console.log(res);
      if (res === 200) {
        alert("預約成功");
        //window.location.reload();
        navigate(`/userHistory`);
      }
    });
  };

  function TimeBtn(props) {
    const { availableTime, bookingList } = props;
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
              style={{ width: "80px" }}
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
              style={{ width: "80px" }}
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
          {loading ? (
            <CircularProgress />
          ) : (
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
                      image={courtInfo.image_url.split(".jpg")[0] + ".jpg"} // 替換為您的圖片URL
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
                        {courtInfo.name} - {courtInfo.location}{" "}
                        {datetime.split(" ")[0]}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        paddingX={1}
                        paddingY={0.6}
                      >
                        {courtInfo.address}
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
                          週{courtInfo.weekday} {courtInfo.availableTimeinday}{" "}
                          開放預約
                        </span>
                      </Typography>
                      <Typography
                        variant="body2"
                        color="000000"
                        paddingX={1}
                        paddingY={0.6}
                      >
                        建議最大使用人數 : {courtInfo.available}
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
                        {loading ? (
                          // <Grid
                          //   container
                          //   spacing={1}
                          //   sx={{
                          //     display: "flex",
                          //     justifyContent: "center",
                          //     alignItems: "center",
                          //   }}
                          // >
                          //   <Box>
                          //     <CircularProgress size={55}/>
                          //   </Box>
                          // </Grid>

                          <LinearProgress />
                        ) : (
                          bookingList &&
                          availableTime && (
                            <Grid container spacing={1} sx={{}}>
                              <TimeBtn
                                bookingList={bookingList}
                                availableTime={availableTime}
                              />
                            </Grid>
                          )
                        )}
                      </Box>
                      <Box
                        m={1}
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                      >
                        <Radio.Group
                          defaultValue={ball || ""}
                          buttonStyle="solid"
                          gap={1}
                        >
                          {(balls || []).map((ball) => (
                            <Radio.Button
                              style={{ margin: "0 10px" }}
                              value={ball}
                              onClick={() => setBall(ball)}
                            >
                              {ball}
                            </Radio.Button>
                          ))}
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
                          強度：
                        </Typography>
                        <Radio.Group
                          defaultValue="新手友善"
                          buttonStyle="solid"
                          onChange={(e) => setLevel(e.target.value)}
                          gap={1}
                        >
                          <Radio.Button value="新手友善">新手友善</Radio.Button>
                          <Radio.Button value="Advanced">Advanced</Radio.Button>
                          <Radio.Button value="頂尖對決">頂尖對決</Radio.Button>
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
                        <Radio.Group
                          defaultValue="單打"
                          buttonStyle="solid"
                          onChange={(e) => setRule(e.target.value)}
                        >
                          <Radio.Button value="單打">單打</Radio.Button>
                          <Radio.Button value="雙打">雙打</Radio.Button>
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
                          onChange={(e) => setNote(e.target.value)}
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
                        <Switch
                          checked={switchState}
                          onChange={handleSwitchChange}
                        />
                      </Box>
                      {switchState && (
                        <Box my={1} display="flex" alignItems="center">
                          <Typography
                            variant="body1"
                            color="000000"
                            paddingX={1}
                            paddingY={0.2}
                            sx={{ fontWeight: "bold" }}
                          >
                            密碼：
                          </Typography>

                          <Input
                            type="password"
                            style={{ width: 200 }}
                            onChange={(e) => setPassword(e.target.value)}
                          />
                        </Box>
                      )}
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
          )}
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
