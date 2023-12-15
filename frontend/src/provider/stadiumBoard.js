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
import pic from "../pic/羽球1.png";
import pic2 from "../pic/羽球3.png";
import Pagination from "@mui/material/Pagination"; 

import FetchData from "../authService/fetchData";

export default function StadiumBoard() {
  const [sport, setSport] = useState();
  const [address, setAddress] = useState();
  const [date, setDate] = useState(moment(new Date()).format("YYYY-MM-DD"));
  const [time, setTime] = useState(0);
  const [courtList, setCourtList] = useState([])
  const [page, setPage] = useState(1)
  const [totalPage, setTotalPage] = useState(0)
  const [weekday, setWeekday] = useState(moment(date).day());
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
  async function SearchCourt(){
    return FetchData.getData("http://localhost:3000/api/courts/admin/appointment",1,
    {
      date:date,
      ...(sport&& sport && {ball_type_id:sport}),
      ...(address&& address && {address:address}),
    }
    )
    // return await axios.get("http://localhost:3000/api/courts/admin",{headers:authHeader()})
  }
  useEffect(() => {
    SearchCourt().then((res)=>
      {
        if (res){
          setCourtList(res.courts)
          setTotalPage(res.total_page)
          let day = moment(date).day()
          if (day === 0) {
            setWeekday(7);
          } else {
            setWeekday(day);
          }
        }
        
      }
    )
  },[]);
  const handleSportChange = (event) => {
    setSport(event.target.value);
  };

  const handleAddressChange = (event) => {
    setAddress(event.target.value);
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
              <MenuItem value={undefined}>所有球類</MenuItem>
              <MenuItem value={"1"}>羽球</MenuItem>
              <MenuItem value={"2"}>籃球</MenuItem>
              <MenuItem value={"3"}>排球</MenuItem>
              <MenuItem value={"4"}>桌球</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Box m={1}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label-2">Address</InputLabel>
            <Select
              labelId="demo-simple-select-label-2"
              id="demo-simple-select-2"
              value={address}
              onChange={handleAddressChange}
              label="Address"
              style={{ width: "100px" }}
            >
              <MenuItem value={undefined}>所有地區</MenuItem>
              <MenuItem value={"大安區"}>大安區</MenuItem>
              <MenuItem value={"文山區"}>文山區</MenuItem>
              <MenuItem value={"信義區"}>信義區</MenuItem>3
            </Select>
          </FormControl>
        </Box>
        <Box m={1}>
          <Button variant="contained">Search</Button>
        </Box>
        
      </Box>
      <Box >
      <Grid
            container
          >
    
        <Grid item xs={1.5}>
        </Grid>
        <Grid item xs={4.5}>
        <Typography variant="h4" color="text.secondary">
                球場預約情況
        </Typography>
        </Grid>
        <Grid item xs={6}>
        
        </Grid>
        </Grid>    
        </Box>
      <Box m={0.5} sx={{ height: "70vh", overflowY: "auto" }}>
        {console.log(courtList)}
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
            return (
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
            />)
          })
          
        }
        {/* // <StadiumCard
        //   id={1}
        //   image={pic2}
        //   title={"球場名稱1"}
        //   description={[
        //     "106台北市大安區羅斯福路四段1號",
        //     "週一至週五",
        //     "16:00~22:00",
        //     6,
        //   ]}
        // />
        // <StadiumCard
        //   id={2}
        //   image={pic}
        //   title={"球場名稱2"}
        //   description={[
        //     "106台北市大安區羅斯福路四段1號",
        //     "週一至週五",
        //     "16:00~22:00",
        //     7,
        //   ]}
        // />
        // <StadiumCard
        //   id={3}
        //   image={pic2}
        //   title={"球場名稱3"}
        //   description={[
        //     "106台北市大安區羅斯福路四段1號",
        //     "週一至週五",
        //     "16:00~22:00",
        //     8,
        //   ]}
        // /> */}
      </Box>
      <Box display="flex" justifyContent="center" marginTop="20px">
        {/* 其他內容 */}
        <Pagination 
          count={totalPage}
          onChange={(event,num)=>setPage(num)} 
          page={page}
          color="primary" 
          
          /> {/* 添加這一行 */}
      </Box>
    </div>
  );
}
