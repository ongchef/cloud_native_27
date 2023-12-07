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
import axios from "axios";
import authHeader from "../authService/authHeader";
export default function OrderStadium() {
  const [sport, setSport] = useState("basketball");
  const [location, setLocation] = useState("Da an");
  const [date, setDate] = useState(moment(new Date()).format("YYYY-MM-DD"));
  const [time, setTime] = useState(dayjs("00:00:00", "HH:mm:ss"));
  const [weekday, setWeekday] = useState(moment(date).day());
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
      setStadiumList(result.data);
    } catch (error) {
      // handle the error
      console.log("Error:" + error);
    }
  };
  async function SearchStadium() {
    //console.log(dayjs(date + time.format("HH:mm:ss")));
    //console.log(time);
    //console.log(date + time.format("HH:mm:ss"));
    setWeekday(moment(date).day());
    return await axios.get("http://localhost:3000/api/users/appointment", {
      headers: authHeader(),
      params: {
        querytime: date + time.format("HH:mm:ss"),
      },
    });
  }
  const [stadiumList, setStadiumList] = useState([]);
  useEffect(() => {
    SearchStadium().then((res) => setStadiumList(res.data));
  }, []);

  return (
    <div>
      <h1>Order Stadium</h1>

      <Box
        display="flex"
        flexDirection="row"
        justifyContent="center"
        alignItems="center"
        width="70%"
        margin="auto"
      >
        <Box m={1} display="flex" flexDirection="row">
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
              maxTime={moment("21:00", "HH:mm")}
              // views={["hours","minutes"]}
              format="hh:mm"
              // defaultValue={dayjs("0000-00-00T9:00")}
              onChange={(newTime) => {
                setTime(newTime);
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
            >
              <MenuItem value={"basketball"}>籃球</MenuItem>
              <MenuItem value={"badminton"}>羽球</MenuItem>
              <MenuItem value={"volleyball"}>排球</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Box m={1}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label-2">Location</InputLabel>
            <Select
              labelId="demo-simple-select-label-2"
              id="demo-simple-select-2"
              value={location}
              onChange={handleLocationChange}
              label="Location"
            >
              <MenuItem value={"Da an"}>大安區</MenuItem>
              <MenuItem value={"CC"}>中正區</MenuItem>
              <MenuItem value={"Xinyi"}>信義區</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Box m={1}>
          <Button variant="contained" onClick={handleSearch}>
            Search
          </Button>
        </Box>
      </Box>
      <Box m={0.5} sx={{ height: "70vh", overflowY: "auto" }}>
        <StadiumCard
          id={1}
          image={pic2}
          title={"台大綜合體育館 - 一樓多功能球場"}
          description={[
            "106台北市大安區羅斯福路四段1號",
            "週一至週五",
            "16:00~22:00",
            6,
          ]}
        />
        {stadiumList.map((court) => {
          const weekdayMapping = ["日", "一", "二", "三", "四", "五", "六"];
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
              image={pic}
              title={court.name + " - " + court.location}
              description={[
                court.location,
                "週" + weekdayInChinese,
                startTime + "~" + endTime,
                court.available,
              ]}
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
        <Pagination count={10} color="primary" /> {/* 添加這一行 */}
      </Box>
    </div>
  );
}
