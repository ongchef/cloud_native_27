import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import StadiumCard from "./orderStadiumCard";
import React, { useState, useEffect } from "react";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import dayjs from "dayjs";
import moment from "moment/moment";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import pic from "../pic/羽球1.png";
import pic2 from "../pic/羽球3.png";
import fakeStadium from "../testData/fakeStadium";
import Pagination from "@mui/material/Pagination"; // 引入Pagination元件
import FetchData from "../authService/fetchData";
import Typography from "@mui/material/Typography";
import { LinearProgress } from "@mui/material";
export default function OrderStadium() {
  const [sport, setSport] = useState();
  const [location, setLocation] = useState();
  const [date, setDate] = useState(moment(new Date()).format("YYYY-MM-DD"));
  const [time, setTime] = useState(dayjs("00:00:00", "HH:mm:ss"));
  const [weekday, setWeekday] = useState(moment(date).day());
  const [ball, setBall] = useState();
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fakeStadium();
  });
  const handleSportChange = (event) => {
    setSport(event.target.value);
  };

  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  };
  const handleSearch = async () => {
    try {
      const result = await SearchStadium();
      // handle the result
      setStadiumList(result.courts);
    } catch (error) {
      // handle the error
      console.log("Error:" + error);
    }
  };
  async function SearchStadium() {
    let day = moment(date).day();
    if (day === 0) {
      setWeekday(7);
    } else {
      setWeekday(day);
    }
    setLoading(true)
    return FetchData.getData(
      "api/users/appointment",
      page,
      {
        query_time: date + " " + time.format("HH:mm:ss"),
        ball: sport,
        address: location,
      }
    ).then((data)=>{
      setLoading(false)
      return data})
  }
  const [stadiumList, setStadiumList] = useState([]);
  useEffect(() => {
    SearchStadium().then((res) => {
      setTotalPage(res.total_page);

      setStadiumList(res.courts);
    });
  }, [page]);

  return (
    <div>
      <h2>Order Stadium</h2>
      {loading ? (
        <Box>
          <LinearProgress sx={{ display: "flex", justifyContent: "center" }} />
        </Box>
      ) : (
        <>
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="center"
        alignItems="center"
        width="70%"
        margin="auto"
      >
        <Box m={0.5} display="flex" flexDirection="row">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              disablePast={true}
              value={dayjs(date + 1)}
              shouldDisableDate={(date) => {
                return date.date() > new Date().getDate() + 7;
              }}
              formatDate={(date) => moment(date).format("DD-MM-YYYY")}
              onChange={(newDate) => {
                setDate(newDate.format("YYYY-MM-DD"));
                //console.log(newDate);
                // do something with weekday...
              }}
            />
          </LocalizationProvider>
        </Box>
        <Box m={1}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <TimePicker
              timeSteps={{ minutes: 30 }}
              label="時段"
              ampm={false}
              minTime={moment("9:00", "HH:mm")}
              maxTime={moment("22:00", "HH:mm")}
              // views={["hours","minutes"]}
              format="HH:mm"
              // defaultValue={dayjs("0000-00-00T9:00")}
              onChange={(newTime) => {
                setTime(newTime);
                console.log(time);
              }}
            />
          </LocalizationProvider>
        </Box>
        <Box m={1}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">球類</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={sport}
              onChange={handleSportChange}
              label="球類"
              style={{ width: "80px" }}
            >
              <MenuItem value={"1"}>羽球</MenuItem>
              <MenuItem value={"2"}>籃球</MenuItem>
              <MenuItem value={"3"}>桌球</MenuItem>
              <MenuItem value={"4"}>排球</MenuItem>
              <MenuItem value={null}>ALL</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Box m={1}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label-2">地點</InputLabel>
            <Select
              labelId="demo-simple-select-label-2"
              id="demo-simple-select-2"
              value={location}
              onChange={handleLocationChange}
              label="地點"
              style={{ width: "100px" }}
            >
              <MenuItem value={"大安區"}>大安區</MenuItem>
              <MenuItem value={"文山區"}>文山區</MenuItem>
              <MenuItem value={"信義區"}>信義區</MenuItem>
              <MenuItem value={null}>ALL</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Box m={1}>
          <Button variant="contained" onClick={handleSearch}>
            Search
          </Button>
        </Box>
      </Box>
      <Box display="flex" justifyContent="center">
        <Typography variant="h4" width="70%">
          以下場地可供預約
        </Typography>
      </Box>
      <Box m={0.5} sx={{ height: "70vh", overflowY: "auto" }}>
        {(stadiumList || []).map((court) => {
          const weekdayMapping = [
            "日",
            "一",
            "二",
            "三",
            "四",
            "五",
            "六",
            "日",
          ];
          const weekdayInChinese = weekdayMapping[weekday];

          const availableTime = court.available_time.find(
            (time) => time.weekday === weekday
          );
          const startTime = availableTime
            ? availableTime.start_time.substring(0, 5)
            : "";
          const endTime = availableTime
            ? availableTime.end_time.substring(0, 5)
            : "";

          return (
            <StadiumCard
              id={court.court_id}
              image={court.image_url.split(".jpg")[0] + ".jpg"}
              title={court.name + " - " + court.location}
              description={[
                court.address,
                "週" + weekdayInChinese,
                startTime + "~" + endTime,
                court.available,
              ]}
              datetime={date + " " + time.format("HH:mm:ss")}
            />
          );
        })}
        {/* <StadiumCard
          id={2}
          image={pic}
          title={"台大舊體育館 - 羽球場 A場"}
          description={[
            "106台北市大安區羅斯福路四段1號",
            "週一至週五",
            "16:00~22:00",
            7,
          ]}
        />
        <StadiumCard
          id={3}
          image={pic2}
          title={"台大新體育場 - 羽球場 A場"}
          description={[
            "106台北市大安區羅斯福路四段1號",
            "週一至週五",
            "16:00~22:00",
            8,
          ]}
        /> */}
      </Box>
      <Box display="flex" justifyContent="center" marginTop="20px">
        {/* 其他內容 */}
        <Pagination
          count={totalPage}
          onChange={(event, num) => setPage(num)}
          page={page}
          color="primary"
        />{" "}
      </Box>
      </>
      )}
    </div>
  );
}
