import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import StadiumCard from "./stadiumCard";
import React, { useState, useEffect } from "react";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import dayjs from "dayjs";
import moment from "moment/moment";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import pic from "../../pic/羽球1.png";
import pic2 from "../../pic/羽球3.png";
import fakeStadium from "../../testData/fakeStadium";
import Pagination from "@mui/material/Pagination";
import AddIcon from "@mui/icons-material/Add";
import FetchData from "../../authService/fetchData";
import { FormLabel } from "@mui/material";
async function SearchCourt(){
  return FetchData.getData("http://localhost:3000/api/courts/admin",10,{})
  // return await axios.get("http://localhost:3000/api/courts/admin",{headers:authHeader()})
}
export default function ReadStadium() {
  const [sport, setSport] = useState(10);
  const [location, setLocation] = useState(20);
  const [date, setDate] = useState(moment(new Date()).format("YYYY-MM-DD"));
  const [courtList, setCourtList] = useState([])
  const [weekday, setWeekday] = useState(moment(date).day());
  const [courtName, setCourtName] = useState()
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
  useEffect(() => {
    fakeStadium();
    SearchCourt().then((res)=>
      {
        setCourtList(res.courts)
      
      }
    )
  },[]);
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
          <FormControl>
          {/* <InputLabel>球場名稱</InputLabel> */}
          <TextField
            placeholder="球場名稱"
            label="球場名稱"
            value={courtName}
            onClick={(event, value)=>setCourtName(value)}
          >

          </TextField>
          </FormControl>
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
      <Box>
        <Grid container>
          <Grid item xs={1.5}></Grid>
          <Grid item xs={4.5}>
            <Typography variant="h4" color="text.secondary">
              球場預約情況
            </Typography>
          </Grid>
          <Grid item xs={3}></Grid>
          <Grid item xs={3}>
            <Button
              variant="outlined"
              startIcon={<AddIcon />}
              sx={{ lineHeight: 0 }}
              onClick={()=>window.location.href="/createStadium"}
            >
              新增球場
            </Button>
          </Grid>
        </Grid>
      </Box>
      <Box m={0.5} sx={{ height: "70vh", overflowY: "auto" }}>
      {
        
          courtList.map((court)=>{
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
            return(
            <StadiumCard
              id={court.court_id}
              image={court.image_url.split(".jpg")[0]+".jpg"}
              title={court.name + " - " + court.location}

              description={[
                court.address,
                "週" + weekdayInChinese,
                startTime + "~" + endTime,
                court.available,
              ]}
            />)}
          )
        }
        
      </Box>
      <Box display="flex" justifyContent="center" marginTop="20px">
        {/* 其他內容 */}
        <Pagination count={10} color="primary" /> {/* 添加這一行 */}
      </Box>
    </div>
  );
}
