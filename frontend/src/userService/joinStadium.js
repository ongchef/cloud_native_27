import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import StadiumCard from "./joinStadiumCard";
import React, { useEffect, useState } from "react";
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
export default function JoinStadium() {
  const [sport, setSport] = useState();
  const [location, setLocation] = useState();
  const [date, setDate] = useState(moment(new Date()).format("YYYY-MM-DD"));
  const [time, setTime] = useState(dayjs("00:00:00", "HH:mm:ss"));
  const [minute, setMinute] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);

  const [publicIndex, setPublicIndex] = useState(1);
  const handleSportChange = (event) => {
    setSport(event.target.value);
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
    } catch (error) {
      // handle the error
      console.log("Error:" + error);
    }
  };
  async function SearchAppointment() {
    let d = date;
    //console.log(date);
    //console.log(time.$d.toString().substring(15, 24));
    d = date + time.$d.toString().substring(15, 24);
    return FetchData.getData(
      "http://localhost:3000/api/users/appointment/join",
      1,
      {
        query_time: date + time.$d.toString().substring(15, 24),
        ball: sport,
        address: location,
        public_index: publicIndex,
      }
    );
    // return await axios.get("http://localhost:3000/api/users/appointment/join", {
    //   headers: authHeader(),
    //   params: {
    //     query_time: date + time.$d.toString().substring(15, 24),
    //     ball: sport,
    //     address: location,
    //     public_index: publicIndex,
    //     page: 1,
    //   },
    // });
  }
  const [appointmentList, setAppointmentList] = useState([]);
  useEffect(() => {
    SearchAppointment().then((res) => {
      if (res) {
        setTotalPage(res.total_page);
        setAppointmentList(res.courts);
      }
    });
  }, [page]);
  useEffect(() => {
    console.log(appointmentList);
  }, [appointmentList]);
  return (
    <div>
      <h1>Join Stadium</h1>
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
              format="hh:mm"
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
          defaultValue="top"
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
        <StadiumCard
          id={1}
          image={pic}
          title={"球場名稱2"}
          description={[
            "106台北市大安區羅斯福路四段1號",
            "2023-11-02",
            "19:00~21:00",
            ["Basketball", "新手友善", "雙打"],
            "Wonu Juan",
            [4, 8],
          ]}
        />
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
              id={appointment.appointment_id}
              image={appointment.image_url.split(".jpg")[0] + ".jpg"}
              title={appointment.court_name + " - " + appointment.location}
              description={[
                appointment.address,
                formattedDate,
                appointment.start_time.substring(0, 5) +
                  " ~ " +
                  appointment.end_time.substring(0, 5),
                [appointment.ball, appointment.level, appointment.rule],
                appointment.creator_name,
                [appointment.attendence, appointment.available],
              ]}
            />
          );
        })}
        {/* <StadiumCard
          id={2}
          image={pic2}
          title={"球場名稱2"}
          description={[
            "106台北市大安區羅斯福路四段1號",
            "2023-11-02",
            "19:00~21:00",
            ["Basketball", "新手友善", "雙打"],
            "Gordon Sung",
          ]}
        />
        <StadiumCard
          id={3}
          image={pic}
          title={"球場名稱2"}
          description={[
            "106台北市大安區羅斯福路四段1號",
            "2023-11-02",
            "19:00~21:00",
            ["Basketball", "新手友善", "雙打"],
            "Bryan Chen",
          ]}
        />
        <StadiumCard
          id={4}
          image={pic}
          title={"球場名稱2"}
          description={[
            "106台北市大安區羅斯福路四段1號",
            "2023-11-02",
            "19:00~21:00",
            ["Basketball", "新手友善", "雙打"],
            "Bryan Chen",
          ]}
        />
        <StadiumCard
          id={5}
          image={pic}
          title={"球場名稱2"}
          description={[
            "106台北市大安區羅斯福路四段1號",
            "2023-11-02",
            "19:00~21:00",
            ["Basketball", "新手友善", "雙打"],
            "Bryan Chen",
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
        />
        {/* 添加這一行 */}
      </Box>
    </div>
  );
}
