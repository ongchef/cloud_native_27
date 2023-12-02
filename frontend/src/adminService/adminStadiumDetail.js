import { useNavigate } from "react-router-dom"; // 引入useNavigate
import { useEffect } from "react";
import Container from "@mui/material/Container"; // 引入Container元件
import Box from "@mui/material/Box"; // 引入Box元件
import pic2 from "../pic/羽球3.png";
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
const availableTime = [26, 40];
const bookingList = [
  {
    Founder: "Wonu Juan",
    num: 4,
    period: [26, 30],
  },
  {
    Founder: "Gordon Sung",
    num: 2,
    period: [34, 38],
  },
  {
    Founder: "Mingyu Kim",
    num: 8,
    period: [38, 40],
  },
];

function TimeBtn() {
  const availableTimeList = Array.from(
    new Array(availableTime[1] - 1 - availableTime[0] + 1),
    (x, i) => (i + availableTime[0]) / 2
  );
  const btnList = availableTimeList.map((time) => {
    return (
      <Grid item>
        {bookingList.some(
          (item) => item.period[0] / 2 <= time && item.period[1] / 2 > time
        ) ? (
          <Tooltip
            title={
              bookingList.find(
                (item) =>
                  item.period[0] / 2 <= time && item.period[1] / 2 > time
              ).num + "/8"
            }
            placement="top"
          >
            <Button variant="outlined">
              {Math.floor(time)}:{time % 1 ? "30" : "00"}
            </Button>
          </Tooltip>
        ) : (
          <Button variant="outlined" color="inherit">
            {Math.floor(time)}:{time % 1 ? "30" : "00"}
          </Button>
        )}
      </Grid>
    );
  });
  return btnList;
}
function EventFounders() {
  return (
    <>
      {bookingList.map((booking, index) => (
        <Typography key={index}>
          {Math.floor(booking.period[0] / 2)}:
          {booking.period[0] % 2 ? "30" : "00"}~
          {Math.floor(booking.period[1] / 2)}:
          {booking.period[1] % 2 ? "30" : "00"} 主揪人:{booking.Founder}{" "}
          <span style={{ color: booking.num === 8 ? "red" : "#1890FF" }}>
            {booking.num}/8
          </span>
        </Typography>
      ))}
    </>
  );
}

export default function AdminStadiumDetail() {
  const navigate = useNavigate();
  useEffect(() => {
    let url = new URL(window.location.href);
    let params = url.searchParams;
    for (let pair of params.entries()) {
      console.log(`key: ${pair[0]}, value: ${pair[1]}`);
    }
  });
  const [selectedOptions, setSelectedOptions] = useState([""]);

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
                    <Box m={1}>
                      <EventFounders></EventFounders>
                    </Box>
                    {/* <Box display="flex" justifyContent="flex-end">
                      <Tooltip
                        title="Click to reserve the stadium"
                        placement="top"
                      >
                        <Button width="300px" variant="outlined">
                          <ArrowForwardIcon />
                          預約場地
                        </Button>
                      </Tooltip>
                    </Box> */}
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
