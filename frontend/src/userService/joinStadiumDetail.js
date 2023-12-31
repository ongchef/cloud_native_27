import { useNavigate } from "react-router-dom"; // 引入useNavigate
import Button from "@mui/material/Button"; // 引入Button元件
import React, { useEffect } from "react";
import Container from "@mui/material/Container"; // 引入Container元件
import Box from "@mui/material/Box"; // 引入Box元件
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Card, CircularProgress } from "@mui/material";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import { useState } from "react";
import { useLocation } from "react-router-dom";
import FetchData from "../authService/fetchData";
import { Input } from "antd";
import Map from "../commonService/map";

const balltype = ["羽球", "籃球", "桌球", "排球"];

export default function JoinStadiumDetail() {
  const location = useLocation();
  const navigate = useNavigate();
  const tags = ["Basketball", "現場報隊", "新手友善"];
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get("id");
  const [date, setDate] = useState();
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    let url = new URL(window.location.href);
    let params = url.searchParams;
    for (let pair of params.entries()) {
      console.log(`key: ${pair[0]}, value: ${pair[1]}`);
    }
  });
  const [appointmentTag, setAppointmentTag] = useState([]);
  const [appointmentDetail, setAppointmentDetail] = useState([]);
  const [publicIndex, setPublicIndex] = useState(0);
  async function getStadiumDetail() {
    return FetchData.getData(
      "api/users/appointmentDetail/join",
      1,
      {
        appointment_id: id,
      }
    );
  }
  useEffect(() => {
    setLoading(true);
    getStadiumDetail().then((res) => {
      setAppointmentDetail(res[0]);
      setLoading(false);
    });
  }, []);
  useEffect(() => {
    console.log(appointmentDetail);
    const DateInGMT8 = new Date(appointmentDetail.date);
    let year = DateInGMT8.getFullYear();
    let month = DateInGMT8.getMonth() + 1; // getMonth() returns month index starting from 0
    let day = DateInGMT8.getDate();

    // Pad single digit month and day with leading 0
    month = month < 10 ? "0" + month : month;
    day = day < 10 ? "0" + day : day;

    let formattedDate = `${year}-${month}-${day}`;
    setDate(formattedDate);
    setPublicIndex(appointmentDetail.public);
    setAppointmentTag([
      balltype[appointmentDetail.ball - 1],
      appointmentDetail.level,
      appointmentDetail.rule,
    ]);
  }, [appointmentDetail]);

  const joinAppointment = () => {
    let jAppointment = {
      appointment_id: appointmentDetail.appointment_id,
      password: password,
    };
    console.log(location.pathname + location.search);
    FetchData.postData(
      "api/users/appointment/join",
      jAppointment,
      location.pathname + location.search
    ).then((res) => {
      console.log(res);
      if (res === 200) {
        console.log("加入成功");
        alert("加入成功");
        //window.location.reload();
        navigate(`/userHistory`);
      } else if (res === 401) {
        console.log("密碼錯誤");
        alert("密碼錯誤");
        window.location.reload();
      }
    });
  };
  return (
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
            <Button
              width="300px"
              variant="outlined"
              onClick={() => navigate(-1)}
            >
              <ArrowBackIcon />
              返回搜尋頁
            </Button>
          </Box>
          <Typography variant="h4">組隊詳細資料</Typography>
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
                      image={
                        appointmentDetail.image_url.split(".jpg")[0] + ".jpg"
                      } // 替換為您的圖片URL
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
                        {appointmentDetail.court_name} -{" "}
                        {appointmentDetail.location} {date}
                      </Typography>
                      <Box
                        mx={1}
                        display="flex"
                        flexDirection="column"
                        justifyContent="center"
                        flexWrap="wrap"
                        gap={1}
                      >
                        <Typography variant="body2" color="text.secondary">
                          {appointmentDetail.address}
                        </Typography>
                        <Typography variant="body2" color="000000">
                          <span
                            style={{
                              color: "000000",
                              backgroundColor: "#D9D9D9",
                              paddingLeft: "10px",
                              paddingRight: "10px",
                              fontSize: "14px",
                            }}
                          >
                            {date}{" "}
                            {appointmentDetail.start_time
                              ? appointmentDetail.start_time.substring(0, 5)
                              : " "}
                            ~
                            {appointmentDetail.end_time
                              ? appointmentDetail.end_time.substring(0, 5)
                              : " "}
                          </span>
                        </Typography>
                        <Typography variant="body2" color="000000">
                          {(appointmentTag || []).map((tag, index) => (
                            <React.Fragment key={index}>
                              <span
                                style={{
                                  color: "000000",
                                  backgroundColor: "#D9D9D9",
                                  paddingLeft: "10px",
                                  paddingRight: "10px",
                                  paddingTop: "5px",
                                  paddingBottom: "5px",
                                  fontSize: "16px",
                                }}
                              >
                                {tag}
                              </span>
                              {index < tags.length - 1 && <>&nbsp;</>}
                            </React.Fragment>
                          ))}
                        </Typography>
                        <Typography variant="body2" color="000000">
                          當前場地預約人數：{" "}
                          <strong>
                            {appointmentDetail.attendence}/
                            {appointmentDetail.available}
                          </strong>
                        </Typography>
                        <Box
                          display="flex"
                          flexDirection="row"
                          alignItems="center"
                          flexWrap="wrap"
                          gap={1}
                        >
                          <Avatar
                            sx={{ bgcolor: "#FFA370" }}
                            alt="Remy Sharp"
                            src="/broken-image.jpg"
                          >
                            {appointmentDetail.creator_name
                              ? appointmentDetail.creator_name[0]
                              : " "}
                          </Avatar>
                          主揪人：{appointmentDetail.creator_name}
                        </Box>
                        {publicIndex === 0 ? (
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
                        ) : (
                          <></>
                        )}
                        <Box display="flex" justifyContent="flex-end">
                          <Button
                            width="300px"
                            variant="outlined"
                            onClick={() => {
                              joinAppointment();
                              console.log("加入場地api");
                            }}
                          >
                            <ArrowForwardIcon />
                            加入場地
                          </Button>
                        </Box>
                      </Box>
                    </CardContent>
                  </Grid>
                </Grid>
              </Card>
              <Box>
                <Map address={appointmentDetail.address} name={appointmentDetail.location} />
              </Box>
            </Box>
          )}
        </Container>
      </Box>
      {/* 添加這一行 */}
    </div>
  );
}
