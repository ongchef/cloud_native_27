import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import StadiumCard from "./joinStadiumCard";
import React, { useEffect, useState, useCallback, useLocation } from "react";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import dayjs from "dayjs";
import moment from "moment/moment";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import Radio from "@mui/material/Radio"; // 引入Radio元件
import RadioGroup from "@mui/material/RadioGroup"; // 引入RadioGroup元件
import FormControlLabel from "@mui/material/FormControlLabel"; // 引入FormControlLabel元件
import pic from "../pic/羽球1.png";
import pic2 from "../pic/羽球3.png";

import Pagination from "@mui/material/Pagination";
import FetchData from "../authService/fetchData";
import Typography from "@mui/material/Typography";

import { useSearchParams } from "react-router-dom";
import { LinearProgress } from "@mui/material";
const balltype = ["羽球", "籃球", "桌球", "排球"];
export default function JoinStadium() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initSport = searchParams.get("sport");
  const [sport, setSport] = useState(initSport ? initSport : null); // 加入預設值以防止mui警告
  const [location, setLocation] = useState(null); // 加入預設值以防止mui警告
  const [date, setDate] = useState(moment(new Date()).format("YYYY-MM-DD"));
  const [time, setTime] = useState(dayjs()); // 目前時間
  // const [time, setTime] = useState(dayjs().format('HH:mm:ss'));
  const [minute, setMinute] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [publicIndex, setPublicIndex] = useState(1);
  const [appointmentList, setAppointmentList] = useState([]);

  const handleSportChange = (event) => {
    setSport(event.target.value);
    console.log(sport);
  };
  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  };
  const handlePublicIndexChange = (event) => {
    setPublicIndex(event.target.value);
  };
  const handleSearch = async () => {
    try {
      console.log("click");
      const result = await SearchAppointment();
      // handle the result
      setAppointmentList(result.courts);
      setTotalPage(result.total_page);
    } catch (error) {
      // handle the error
      console.log("Error:" + error);
    }
  };
  async function SearchAppointment() {
    setLoading(true);
    try {
      console.log({
        query_time: date + time.$d.toString().substring(15, 24),
        ball: sport,
        address: location,
        public_index: publicIndex,
      });

      const res = await FetchData.getData(
        "api/users/appointment/join",
        1,
        {
          query_time: date + time.$d.toString().substring(15, 24),
          ball: sport,
          address: location,
          public_index: publicIndex,
        }
      ).then((data)=>{
        setLoading(false)
        return data
      });
      return res;
    } catch (error) {
      console.log("Error:" + error);
    }
  }

  const fetchData = useCallback(async () => {
    try {
      const res = await SearchAppointment();
      setAppointmentList(res.courts);
      setTotalPage(res.total_page);
    } catch (error) {
      console.log("Error:" + error);
    }
  }, []);

  useEffect(() => {
    console.log(time);
    console.log(dayjs().format("HH:mm:ss"));
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    console.log(appointmentList);
  }, [appointmentList]);

  return (
    <div>
      <h2>Join Stadium</h2>
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
        <Box m={1} display="flex" flexDirection="row" gap={1}>
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
              minTime={moment("8:00", "HH:mm")}
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
            <InputLabel id="demo-simple-select-label-2">Location</InputLabel>
            <Select
              labelId="demo-simple-select-label-2"
              id="demo-simple-select-2"
              value={location}
              onChange={handleLocationChange}
              label="Location"
              style={{ width: "100px" }}
            >
              <MenuItem value={"大安區"}>大安區</MenuItem>
              <MenuItem value={"文山區"}>文山區</MenuItem>
              <MenuItem value={"信義區"}>信義區</MenuItem>
              <MenuItem value={null}>ALL</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <RadioGroup
          padding="10px"
          column
          aria-label="position"
          name="position"
          defaultValue="1"
          onChange={handlePublicIndexChange}
        >
          <FormControlLabel
            value="1"
            control={<Radio color="primary" />}
            label="公開"
            labelPlacement="end"
          />
          <FormControlLabel
            value="0"
            control={<Radio color="primary" />}
            label="私人"
            labelPlacement="end"
          />
        </RadioGroup>
        <Box m={1}>
          <Button variant="contained" onClick={handleSearch}>
            Search
          </Button>
        </Box>
      </Box>
      <Box display="flex" justifyContent="center">
        <Typography variant="h4" width="70%">
          以下組隊房間可供加入
        </Typography>
      </Box>
      <Box m={0.5} sx={{ height: "70vh", overflowY: "auto" }}>
        {(appointmentList || []).map((appointment) => {
          const DateInGMT8 = new Date(appointment.date);
          let year = DateInGMT8.getFullYear();
          let month = DateInGMT8.getMonth() + 1; // getMonth() returns month index starting from 0
          let day = DateInGMT8.getDate();

          // Pad single digit month and day with leading 0
          month = month < 10 ? "0" + month : month;
          day = day < 10 ? "0" + day : day;

          let formattedDate = `${year}-${month}-${day}`;
          console.log(formattedDate);
          //console.log(status);
          return (
            <StadiumCard
              key={appointment.appointment_id}
              id={appointment.appointment_id}
              image={appointment.image_url.split(".jpg")[0] + ".jpg"}
              title={appointment.court_name + " - " + appointment.location}
              description={[
                appointment.address,
                formattedDate,
                appointment.start_time.substring(0, 5) +
                  " ~ " +
                  appointment.end_time.substring(0, 5),
                [
                  balltype[appointment.ball - 1],
                  appointment.level,
                  appointment.rule,
                ],
                appointment.creator_name,
                [appointment.attendence, appointment.available],
              ]}
            />
          );
        })}
      </Box>
      <Box display="flex" justifyContent="center" marginTop="20px">
        {/* 其他內容 */}
        <Pagination
          count={totalPage}
          onChange={(event, num) => setPage(num)}
          page={page}
          color="primary"
        />
        {/* 添加這一行 */}
      </Box>
      </>
      )}
    </div>
  );
}
