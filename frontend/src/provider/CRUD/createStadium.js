import { useNavigate } from "react-router-dom"; // 引入useNavigate
import Button from "@mui/material/Button"; // 引入Button元件
import { useEffect, useState } from "react";
import Container from "@mui/material/Container"; // 引入Container元件
import Box from "@mui/material/Box"; // 引入Box元件
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Card, TextField } from "@mui/material";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import JButton from '@mui/joy/Button';
import JToggleButtonGroup from '@mui/joy/ToggleButtonGroup';
import DeleteIcon from '@mui/icons-material/Delete';

import dayjs from "dayjs";
const week = {
  "mon":"一",
  "tue":"二",
  "wed":"三",
  "thu":"四",
  "fri":"五",
  "sat":"六",
  "sun":"日"
}
function checkTimeSeries(availableTime) {
  for (const daytime of Object.values(availableTime)) {
    for (const time of Object.values(daytime)){
      if (time[1].isBefore(time[0])) {
        alert("起始時間與結束時間未按照順序");
        return false;
      }
    }
  }
}
function checkTimeOverlap(availableTime) {

  for (const [day, daytime] of Object.entries(availableTime)) {
    var timeList = [];
    for (const time of Object.values(daytime)){
      timeList.push(time)
    }
    console.log(timeList);
    timeList.sort(function (a, b) {
    if (a[0].isAfter(b[0])) {
      return 1;
    } else {
      return -1;
    }
  });
  for (var i = 0; i < timeList.length - 1; i++) {
    if (timeList[i][1].isAfter(timeList[i + 1][0])) {
      alert("星期"+week[day]+"時段重疊");
    }
  }
  console.log(timeList);
  }
  
}
const EditDialog=(props)=>{
  const [open, setOpen] = useState(false);
  const [newTime, setNewTime] = useState([])
  const{availableTime,setAvailableTime,selectedDay,id,}=props
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);    
  };
  const handleSubmit = () =>{
    console.log(newTime)
    setAvailableTime({...availableTime,[selectedDay]:{...availableTime[selectedDay],[id]:newTime}})
    checkTimeSeries(availableTime)
    handleClose()
  }
  
  return (
    <>
    <IconButton variant="outlined" onClick={handleClickOpen}>
        <EditIcon />
      </IconButton>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>選取日期與時間</DialogTitle>
        <DialogContent><FormDialog startTime={availableTime[selectedDay][id][0]} endTime={availableTime[selectedDay][id][1]} selectedDay={selectedDay} disabled={true} newTime = {newTime} setNewTime={setNewTime}/></DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>取消</Button>
          <Button onClick={handleSubmit}>確認</Button>
        </DialogActions>
      </Dialog>
      </>
  )
}
const AddDialog=(props)=>{
  const [open, setOpen] = useState(false);
  const [newTime, setNewTime] = useState([])
  const [selectedDay, setSelectedDay] = useState([])
  const{availableTime,setAvailableTime}=props
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setNewTime([])
    setSelectedDay([])
    setOpen(false);    
  };
  const handleSubmit = () =>{
    console.log(newTime)
    console.log(availableTime)
    console.log(selectedDay)
    var newAvailableTime  = availableTime
    selectedDay.map((day)=>
      newAvailableTime = {...newAvailableTime,[day]:{...newAvailableTime[day],[Object.keys(newAvailableTime[day]).length]:newTime}}
    )
    console.log(newAvailableTime)
    setAvailableTime(newAvailableTime)
    checkTimeSeries(availableTime)
    handleClose()
    // checkTimeOverlap(startTimeList, endTimeList)
    // console.log(startTimeList)
  }
  return (
    <>
    <Button variant="outlined" onClick={handleClickOpen}>
        新增開放時間
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>選取日期與時間</DialogTitle>
        <DialogContent><FormDialog  startTime={dayjs("9:00",'HH:mm')} endTime={dayjs("22:00",'HH:mm')} selectedDay={selectedDay} setSelectedDay={setSelectedDay} disabled={false} newTime = {newTime} setNewTime={setNewTime}/></DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>取消</Button>
          <Button onClick={handleSubmit}>確認</Button>
        </DialogActions>
      </Dialog>
      </>
  )
}
const  FormDialog=(props)=>{

  const [startTime, setStartTime] = useState([]);
  const [endTime, setEndTime] = useState([]);
  const [periodId, setPeriodId] = useState(0);
  const {newTime,setNewTime,selectedDay,setSelectedDay} = props

  useEffect(() => {
    setStartTime(props.startTime)
    setEndTime(props.endTime)
    setNewTime([props.startTime,props.endTime])
  }, []);
  useEffect(()=>{
    console.log(newTime)
  },[newTime])
  return (
    <>
        <JToggleButtonGroup
          value={selectedDay}
          disabled = {props.disabled}
          onChange={(event,value)=>{
            console.log(selectedDay)
            setSelectedDay(value)}}
          sx={{display:'flex', justifyContent:'center', borderLeft:'' }}    
          spacing={3}
          color="primary"   
             
        >
        {Object.keys(week).map((eng)=>{

          return (
          <JButton value={eng} >
            {week[eng]}
          </JButton >)
        })}
        </JToggleButtonGroup>
        
        <br></br>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={['TimePicker', 'TimePicker']}>
        <TimePicker
          timeSteps={{ minutes: 30 }}
          ampm={false}
          label="起始時段"
          // views={["hours","minutes"]}
          format="HH:mm"
          value={startTime?dayjs(startTime):dayjs("9:00",'HH:mm')}
          onChange={(value) => {
            setNewTime([dayjs(value.get("hour") + ":" + value.get("minute"),"HH:m"),newTime[1]])
          }}
        />
        <TimePicker
          timeSteps={{ minutes: 30 }}
          ampm={false}
          label="結束時段"
          // views={["hours","minutes"]}
          format="HH:mm"
          value={endTime?dayjs(endTime):dayjs("22:00",'HH:mm')}
          // defaultValue={dayjs("0000-00-00T9:00")}
          onChange={(value) => {
            setNewTime([newTime[0],dayjs(value.get("hour") + ":" + value.get("minute"),"HH:mm")])
          }}
        />
      </DemoContainer>
    </LocalizationProvider>
        
    </>
  );
}

export default function CreateStadium() {
  const navigate = useNavigate();
  const [image, setImage] = useState();
  const [ availableTime, setAvailableTime] = useState({
    mon:{0:[dayjs("9:00",'HH:mm'),dayjs("11:00",'HH:mm')],
    1:[dayjs("13:00",'HH:mm'),dayjs("22:00",'HH:mm')]},
    tue:{0:[dayjs("9:00",'HH:mm'),dayjs("22:00",'HH:mm')]},
    wed:{0:[dayjs("9:00",'HH:mm'),dayjs("22:00",'HH:mm')]},
    thu:{0:[dayjs("9:00",'HH:mm'),dayjs("22:00",'HH:mm')]},
    fri:{0:[dayjs("9:00",'HH:mm'),dayjs("22:00",'HH:mm')]},
    sat:{0:[dayjs("9:00",'HH:mm'),dayjs("22:00",'HH:mm')]},
    sun:{0:[dayjs("9:00",'HH:mm'),dayjs("22:00",'HH:mm')]}
  })
  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      let img = URL.createObjectURL(e.target.files[0]);
      setImage(img);
    }
  };
  function handleDelete (day,id){

    delete availableTime[day][id]
    console.log(availableTime)
    setAvailableTime({...availableTime})
  }
  function showMyImage(fileInput) {
    var files = fileInput.files;
    console.log(files);
    for (var i = 0; i < files.length; i++) {
      var file = files[i];
      console.log(file.name);
      var imageType = /image.*/;
      if (!file.type.match(imageType)) {
        continue;
      }
      console.log(file);
      //$("#banner_name").text(file.name);
    }
  }
  useEffect(()=>{
    console.log(availableTime)
  },[availableTime])

  return (
    <div>
      <h1> 新增場地資訊 </h1>
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
                  {image&&<CardMedia component="img" src={image} alt="Stadium" />}
                  <TextField
                    type="file"
                    onChange={(e) => {
                      handleImageChange(e);
                      showMyImage(e.target);
                    }}
                  />
                  {/* <Button variant="contained" color="primary" component="span">
                        Upload
                    </Button> */}
                </Grid>
                <Grid item xs={6}>
                  <CardContent>
                    <Typography>球場名稱</Typography>
                    <TextField fullWidth size="small" />
                    <Typography>球場名稱</Typography>
                    <TextField fullWidth size="small" />
                    <Typography>球場地址</Typography>
                    <TextField fullWidth size="small" />
                    <Typography>最大使用人數</Typography>
                    <TextField fullWidth size="small" />
                    {Object.keys(availableTime).map((day)=>{
                      return(
                      Object.keys(availableTime[day]).map((id)=>{
                        return (
                        <Typography>
                          星期{week[day]}{availableTime[day][id][0].format('HH:mm')}-{availableTime[day][id][1].format('HH:mm')}
                        <EditDialog availableTime={availableTime} setAvailableTime={setAvailableTime} id={id} selectedDay={day}/>
                        <IconButton onClick={()=>handleDelete(day,id)}>
                          <DeleteIcon />
                        </IconButton>
                        </Typography>
                        )
                      })
                      )
                    })}
                    <AddDialog availableTime={availableTime} setAvailableTime={setAvailableTime}/>
                    <Button onClick={()=>checkTimeOverlap(availableTime)}>
                      送出
                    </Button>
                  </CardContent>
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
