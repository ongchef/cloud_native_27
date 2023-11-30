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


export default function CreateStadium() {
  const navigate = useNavigate();
  const[ image, setImage ] = useState()
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
          console.log(file)
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
                  <CardMedia
                    component="img"
                    src={image}
                    alt="Stadium"
                  />
                  <TextField 
                    type="file"
                    onClick={(e)=>setImage(e.target.value)}
                    onChange={(e)=>{
                        console.log(e.target.value)
                        setImage(e.target.value)}}
                    />
                    {/* <Button variant="contained" color="primary" component="span">
                        Upload
                    </Button> */}
                </Grid>
                <Grid item xs={6}>
                  <CardContent>
                    <Typography>
                        球場名稱
                    </Typography>
                    <TextField
                        fullWidth
                        size="small"
                    />
                    <Typography>
                        球場地址
                    </Typography>
                    <TextField
                        fullWidth
                        size="small"
                    />
                    <Typography>
                        最大使用人數
                    </Typography>
                    <TextField
                        fullWidth
                        size="small"
                    />
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
