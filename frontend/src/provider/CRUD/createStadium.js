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
import moment from "moment";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import HighlightOff from "@mui/icons-material/HighlightOff";

function TimeBlock(props) {
  const {
    startTimeList,
    setStartTimeList,
    endTimeList,
    setEndTimeList,
    periodId,
    handleDelete,
  } = props;
  console.log(periodId);
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["TimePicker", "TimePicker"]}>
        <TimePicker
          timeSteps={{ minutes: 30 }}
          ampm={false}
          label="起始時段"
          // views={["hours","minutes"]}
          format="hh:mm"
          // defaultValue={dayjs("0000-00-00T9:00")}
          onChange={(newTime) => {
            console.log(newTime);
            console.log(moment(newTime));
            setStartTimeList((preState) => ({
              ...preState,
              [periodId]: moment(
                newTime.get("hour") + ":" + newTime.get("minute"),
                "hh:mm"
              ),
            }));
          }}
        />
        <TimePicker
          timeSteps={{ minutes: 30 }}
          ampm={false}
          label="結束時段"
          // views={["hours","minutes"]}
          format="hh:mm"
          // defaultValue={dayjs("0000-00-00T9:00")}
          onAccept={(newTime) => {
            setEndTimeList((preState) => ({
              ...preState,
              [periodId]: moment(
                newTime.get("hour") + ":" + newTime.get("minute"),
                "hh:mm"
              ),
            }));
          }}
        />
        <Button onClick={() => handleDelete(periodId)}>
          <HighlightOff />
        </Button>
      </DemoContainer>
    </LocalizationProvider>
  );
}
function checkTimeSeries(startTimeList, endTimeList) {
  for (const [id, time] of Object.entries(startTimeList)) {
    const startTime = time;
    const endTime = endTimeList[id];
    if (endTime.isBefore(startTime)) {
      alert("起始時間與結束時間未按照順序");
      return false;
    }
  }
}
function checkTimeOverlap(startTimeList, endTimeList) {
  console.log(startTimeList);
  console.log(endTimeList);
  var timeList = [];
  for (const [id, time] of Object.entries(startTimeList)) {
    console.log(timeList);
    timeList.push([time, endTimeList[id]]);
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
      alert("時段重疊");
    }
  }
  console.log(timeList);
}
function FormDialog() {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({});
  const [startTimeList, setStartTimeList] = useState([]);
  const [endTimeList, setEndTimeList] = useState([]);
  const [periodId, setPeriodId] = useState(0);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    //checkTimeSeries(startTimeList,endTimeList)
    checkTimeOverlap(startTimeList, endTimeList);
    // setOpen(false);
  };
  useEffect(() => {
    setForm({
      [periodId]: (
        <TimeBlock
          startTimeList={startTimeList}
          setStartTimeList={setStartTimeList}
          endTimeList={endTimeList}
          setEndTimeList={setEndTimeList}
          periodId={periodId}
          con={con}
          handleDelete={handleDelete}
        />
      ),
    });
    setPeriodId(periodId + 1);
  }, []);
  useEffect(() => {
    console.log(startTimeList);
    console.log(endTimeList);
    console.log(form);
  }, [startTimeList, endTimeList, form]);
  // useEffect(()=>{
  //   console.log(form)
  // })
  function con() {
    console.log(form);
  }
  const handleDelete = (timeToDelete) => {
    setForm(form.filter((timeBlock) => timeBlock !== timeToDelete));
    console.log(form);
  };
  return (
    <>
      <IconButton variant="outlined" onClick={handleClickOpen}>
        <EditIcon />
      </IconButton>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>選取日期與時間</DialogTitle>
        <DialogContent>
          {Object.values(form)}
          <Button
            variant="text"
            onClick={() => {
              setForm({
                ...form,
                [periodId]: (
                  <TimeBlock
                    startTimeList={startTimeList}
                    setStartTimeList={setStartTimeList}
                    endTimeList={endTimeList}
                    setEndTimeList={setEndTimeList}
                    periodId={periodId}
                    con={con}
                    handleDelete={handleDelete}
                  />
                ),
              });
              setPeriodId(periodId + 1);
            }}
          >
            新增營業時間
          </Button>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Subscribe</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default function CreateStadium() {
  const navigate = useNavigate();
  const [image, setImage] = useState();
  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      let img = URL.createObjectURL(e.target.files[0]);
      setImage(img);
    }
  };
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
                  <CardMedia component="img" src={image} alt="Stadium" />
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
                    <Typography>球場地址</Typography>
                    <TextField fullWidth size="small" />
                    <Typography>最大使用人數</Typography>
                    <TextField fullWidth size="small" />
                    <FormDialog />
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
