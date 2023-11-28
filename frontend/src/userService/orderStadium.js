import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
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

export default function OrderStadium() {
  const [sport, setSport] = useState(10);
  const [location, setLocation] = useState(20);
  const [date, setDate] = useState(moment(new Date()).format("YYYY-MM-DD"));
  const [time, setTime] = useState(0);
  useEffect(() => {
    fakeStadium();
  });
  const handleSportChange = (event) => {
    setSport(event.target.value);
  };

  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  };
  return (
    <div>
      <h1>Order Stadium</h1>
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="center"
        alignItems="center"
        width="70vw"
        margin="auto"
      >
        <Box m={1}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              disablePast={true}
              value={dayjs(date + 1)}
              shouldDisableDate={(date) => {
                return date.date() > new Date().getDate() + 7;
              }}
              formatDate={(date) => moment(date).format("DD-MM-YYYY")}
              onChange={(newDate) => {
                newDate = moment(
                  new Date(newDate.year(), newDate.month(), newDate.date())
                ).format("YYYY-MM-DD");
                setDate(newDate);
              }}
            />
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
                console.log(newTime);
                console.log(newTime.get("hour"));
                setTime(newTime.get("hour"));
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
              <MenuItem value={10}>籃球</MenuItem>
              <MenuItem value={20}>羽球</MenuItem>
              <MenuItem value={30}>排球</MenuItem>
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
              <MenuItem value={10}>大安區</MenuItem>
              <MenuItem value={20}>中正區</MenuItem>
              <MenuItem value={30}>信義區</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Box m={1}>
          <Button variant="contained">Search</Button>
        </Box>
      </Box>
      <Box m={0.5} sx={{ height: "70vh", overflowY: "auto" }}>
        <StadiumCard
          id={1}
          image={pic2}
          title={"球場名稱1"}
          description={[
            "106台北市大安區羅斯福路四段1號",
            "週一至週五",
            "16:00~22:00",
            6,
          ]}
        />
        <StadiumCard
          id={2}
          image={pic}
          title={"球場名稱2"}
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
          title={"球場名稱3"}
          description={[
            "106台北市大安區羅斯福路四段1號",
            "週一至週五",
            "16:00~22:00",
            8,
          ]}
        />
      </Box>
      <Box display="flex" justifyContent="center" marginTop="20px">
        {/* 其他內容 */}
        <Pagination count={10} color="primary" /> {/* 添加這一行 */}
      </Box>
    </div>
  );
}
