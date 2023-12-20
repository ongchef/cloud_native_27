import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import StadiumCard from "./adminStadiumCard";
import React, { useState, useEffect } from "react";
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
export default function AdminStadiumStatus() {
  const [sport, setSport] = useState("ALL");
  const [location, setLocation] = useState("ALL");
  const [providers, setProviders] = useState([]);
  const [provider, setProvider] = useState("ALL");
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);

  const [date, setDate] = useState(moment(new Date()).format("YYYY-MM-DD"));
  const [time, setTime] = useState(dayjs("00:00:00", "HH:mm:ss"));
  const [stadiumList, setStadiumList] = useState([]);
  async function getProviders() {
    return FetchData.getData("http://localhost:3000/api/admin/getProviders");
  }
  async function getStadium() {
    let s = sport !== "ALL" ? sport : "";
    let l = location !== "ALL" ? location : "";
    let p = provider !== "ALL" ? provider : "";
    console.log(s, l, p);
    return FetchData.getData("http://localhost:3000/api/admin/court", page, {
      query_time: date + time.$d.toString().substring(15, 24),
      ...(s && s !== null && { ball: s }),
      ...(l && l !== null && { address: l }),
      provider: p,
    });
  }
  const handleSearch = async () => {
    try {
      console.log("click");
      const result = await getStadium();
      // handle the result
      setStadiumList(result.courts);
    } catch (error) {
      // handle the error
      console.log("Error:" + error);
    }
  };
  useEffect(() => {
    getProviders().then((res) => {
      const providerNames = res.map((item) => item.name);
      setProviders(providerNames);
    });
    getStadium().then((res) => {
      if (res) {
        setStadiumList(res.courts);
        setTotalPage(res.total_page);
        let day = moment(date).day();
      }
    });
  }, [page]);
  const handleSportChange = (event) => {
    setSport(event.target.value);
  };
  const handleProviderChange = (event) => {
    setProvider(event.target.value);
  };
  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  };
  return (
    <>
      <h1>Admin Stadium Status</h1>
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="center"
        alignItems="center"
        width="80vw"
        margin="auto"
      >
        <Box m={1}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">球場提供商</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={provider}
              onChange={handleProviderChange}
              label="球場提供商"
            >
              <MenuItem value={"ALL"}>ALL</MenuItem>
              {providers.map((provider) => {
                return <MenuItem value={provider}>{provider}</MenuItem>;
              })}
            </Select>
          </FormControl>
        </Box>
        <Box mx={1} display="flex" flexDirection="row" gap={1}>
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
              <MenuItem value={"ALL"}>ALL</MenuItem>
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
              <MenuItem value={"ALL"}>ALL</MenuItem>
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
          以下場地有預約紀錄
        </Typography>
      </Box>
      <Box m={0.5} sx={{ height: "70vh", overflowY: "auto" }}>
        {stadiumList.map((court) => {
          return (
            <StadiumCard
              id={court.court_id}
              image={pic}
              title={court.name + " - " + court.location}
              description={[
                court.address,
                court.contact,
                court.ball_type_id,
                court.available,
              ]}
              datetime={date}
            />
          );
        })}

        {/* <StadiumCard
          id={2}
          image={pic2}
          title={"台大舊體育館 - 羽球 B場"}
          description={[
            "106台北市大安區羅斯福路四段1號",
            "週一至週五",
            "18:00~22:00",
            6,
          ]}
        />
        <StadiumCard
          id={3}
          image={pic}
          title={"台大醫體 - 羽球場 B場"}
          description={[
            "106台北市大安區羅斯福路四段1號",
            "週一、週三、週五",
            "17:00~21:00",
            10,
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
  );
}
