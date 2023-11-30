import { useNavigate } from "react-router-dom"; // 引入useNavigate
import Button from "@mui/material/Button"; // 引入Button元件
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
import Tooltip from "@mui/material/Tooltip";

const availableTime = [13, 20];
const bookingList = [
  {
    num: 4,
    period: [13, 14, 15],
  },
  {
    num: 2,
    period: [17, 19],
  },
];

function TimeBtn() {
  const availableTimeList = Array.from(
    new Array(availableTime[1] - availableTime[0] + 1),
    (x, i) => i + availableTime[0]
  );
  const btnList = availableTimeList.map((time) => {
    return (
      <Grid item>
        {bookingList.some((item) => item.period.includes(time)) ? (
          <Tooltip
            title={bookingList.find((item) => item.period.includes(time)).num}
            placement="top"
          >
            <Button variant="outlined">{time}</Button>
          </Tooltip>
        ) : (
          <Button variant="outlined">{time}</Button>
        )}
      </Grid>
    );
  });
  return btnList;
}
export default function StadiumBookingDetail() {
  const navigate = useNavigate();
  useEffect(() => {
    let url = new URL(window.location.href);
    let params = url.searchParams;
    for (let pair of params.entries()) {
      console.log(`key: ${pair[0]}, value: ${pair[1]}`);
    }
  });
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
              <Grid container>
                <Grid item xs={6}>
                  <CardMedia
                    component="img"
                    image={pic2} // 替換為您的圖片URL
                    alt="Stadium"
                  />
                </Grid>
                <Grid item xs={6}>
                  <CardContent>
                    <Typography variant="h5" component="div">
                      標題
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      description
                    </Typography>
                  </CardContent>
                  <Box
                    paddingLeft={3}
                    display="flex"
                    alignContent="right"
                    flexWrap="wrap"
                  >
                    <Grid rowSpacing={2} container>
                      <TimeBtn></TimeBtn>
                    </Grid>
                  </Box>
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
