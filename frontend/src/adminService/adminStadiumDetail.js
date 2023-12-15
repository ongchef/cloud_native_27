import { useNavigate } from "react-router-dom"; // 引入useNavigate
import { useEffect } from "react";
import Container from "@mui/material/Container"; // 引入Container元件
import Box from "@mui/material/Box"; // 引入Box元件
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Card } from "@mui/material";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import React, { useState } from "react";
import Button from "@mui/material/Button";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Tooltip from "@mui/material/Tooltip";
import FetchData from "../authService/fetchData";
import { useLocation } from "react-router-dom";
import moment from "moment";
import CircularProgress from "@mui/material/CircularProgress";

const ballTypes = {
  1: "羽球",
  2: "籃球",
  3: "桌球",
  4: "排球",
};

async function SearchReserved(courtId, datetime) {
  datetime = datetime + "+00:00:00";
  return FetchData.getData("http://localhost:3000/api/admin/courtDetail", 1, {
    query_time: datetime,
    court_id: courtId,
  });
}

function EventFounders({ holderList }) {
  console.log(holderList);
  holderList.sort(function (a, b) {
    console.log(a.period[0]);
    if (moment(a.period[0], "HH:ss").isAfter(moment(b.period[0], "HH:ss"))) {
      return 1;
    } else {
      return -1;
    }
  });
  return (
    <>
      {holderList.map((booking, index) => (
        <>
          <Grid item xs={4} display="flex" justifyContent="left">
            {booking.period[0].split(":")[0]}:{booking.period[0].split(":")[1]}~
            {booking.period[1].split(":")[0]}:{booking.period[1].split(":")[1]}
          </Grid>
          <Grid item xs={3} display="flex" justifyContent="left">
            主揪人:{booking.period[2]}
          </Grid>
          <Grid item xs={2} display="flex" justifyContent="left">
            {booking.period[3]}/8
          </Grid>
        </>
        // <Typography key={index}>
        //   {booking.period[0].split(":")[0]}:
        //   {booking.period[0].split(":")[1]}~
        //   {booking.period[1].split(":")[0]}:
        //   {booking.period[1].split(":")[1]} 主揪人:{booking.period[2]}{" "}
        //   <span style={{ color: booking.num === 8 ? "red" : "#1890FF" }}>
        //     {booking.period[3]}/8
        //   </span>
        // </Typography>
      ))}
    </>
  );
}

export default function AdminStadiumDetail() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get("id");
  const datetime = searchParams.get("time");
  const [courtInfo, setCourtInfo] = useState({});
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [availableTime, setAvailableTime] = useState();
  const [bookingList, setBookingList] = useState([]);
  const [holderList, setHolderList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [ballNames, setBallNames] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    setLoading(true);
    SearchReserved(id, datetime).then((res) => {
      //console.log(res);
      SetDetails(res);
      setLoading(false);
    });
  }, []);

  function SetDetails(data) {
    const date = new Date(datetime.split(" ")[0]);
    const weekday = date.getDay() || 7; // Convert Sunday from 0 to 7
    //console.log(data.court_info[0]);
    // 要等API改
    const availableTimeObj = data.available_time.find(
      (time) => time.weekday === weekday
    );

    const weekdayMapping = ["日", "一", "二", "三", "四", "五", "六"];
    const weekdayInChinese = weekdayMapping[weekday];
    console.log(availableTimeObj);
    const availableTime1 = [
      parseInt(availableTimeObj.start_time.split(":")[0]) * 2,
      parseInt(availableTimeObj.end_time.split(":")[0]) * 2,
    ];
    const bookingList1 = data.appointment.map((time) => ({
      period: [
        parseInt(time.start_time.split(":")[0]) * 2,
        parseInt(time.end_time.split(":")[0]) * 2,
        time.name,
        time.participant_count,
      ],
    }));
    const bookingList2 = data.appointment.map((time) => ({
      period: [
        time.start_time,
        time.end_time,
        time.name,
        time.participant_count,
      ],
    }));
    const courtData = data.court_info[0];
    delete courtData.available_time;
    delete courtData.appointment_time;
    courtData.weekday = weekdayInChinese;
    courtData.availableTimeinday =
      availableTimeObj.start_time.substring(0, 5) +
      "~" +
      availableTimeObj.end_time.substring(0, 5);
    console.log(courtData);
    const ballNames = courtData.ball_type_id
      .split(",")
      .map((ballType) => ballTypes[ballType])
      .join(",");
    setBallNames(ballNames);
    setAvailableTime(availableTime1);
    setBookingList(bookingList1);
    setHolderList(bookingList2);
    setCourtInfo(courtData);
  }

  function TimeBtn(props) {
    const { availableTime, bookingList } = props;
    var num;
    const availableTimeList = Array.from(
      new Array(availableTime[1] - availableTime[0]),
      (x, i) => (i + availableTime[0]) / 2
    );
    const btnList = availableTimeList.map((time) => {
      const value = `${Math.floor(time)}:${time % 1 ? "30" : "00"}`;
      return (
        <Grid item>
          {bookingList.some((item) => {
            num = item.period[2];
            return item.period[0] / 2 <= time && item.period[1] / 2 > time;
          }) ? (
            <Tooltip title={num + "/" + courtInfo.available} placement="top">
              <div>
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
              </div>
            </Tooltip>
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
    const index = selectedOptions.indexOf(value);
    if (index < 0) {
      setSelectedOptions([...selectedOptions, value]);
    } else {
      setSelectedOptions([
        ...selectedOptions.slice(0, index),
        ...selectedOptions.slice(index + 1),
      ]);
    }
  };

  return (
    <div>
      <h1>Admin Stadium Detail</h1>
      <Box
        display="flex"
        width="70vw"
        flexDirection="column"
        justifyContent="center"
      >
        <Container maxWidth="sm" width="90vw">
          <Box my={1}>
            <Button
              width="300px"
              variant="outlined"
              onClick={() => navigate(-1)}
            >
              <ArrowBackIcon />
              返回搜尋頁
            </Button>
          </Box>
          <Typography variant="h4" sx={{ fontWeight: "bold" }}>
            球場詳細預約資訊
          </Typography>
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
                        {courtInfo.name} - {courtInfo.location} {datetime}
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
                        場地球類：{ballNames}
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
                          {bookingList && availableTime && (
                            <TimeBtn
                              bookingList={bookingList}
                              availableTime={availableTime}
                            />
                          )}
                        </Grid>
                      </Box>
                      <Box my={1} display="flex" justifyContent="left">
                        <Grid container spacing={1}>
                          {holderList && (
                            <EventFounders
                              holderList={holderList}
                            ></EventFounders>
                          )}
                        </Grid>
                      </Box>
                    </CardContent>
                  </Grid>
                </Grid>
              </Card>
            </Box>
          )}
        </Container>
      </Box>
      {/* 添加這一行 */}
    </div>
  );
}
