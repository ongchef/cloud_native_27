import { useNavigate } from "react-router-dom"; // 引入useNavigate
import { useEffect } from "react";
import Container from "@mui/material/Container"; // 引入Container元件
import Box from "@mui/material/Box"; // 引入Box元件
import pic2 from "../pic/羽球3.png";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Card } from "@mui/material";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { Button } from "antd";
import React, { useState } from "react";
import { Radio } from "antd";
import ButtonM from "@mui/material/Button";

export default function OrderStadiumDetail() {
  const navigate = useNavigate();
  useEffect(() => {
    let url = new URL(window.location.href);
    let params = url.searchParams;
    for (let pair of params.entries()) {
      console.log(`key: ${pair[0]}, value: ${pair[1]}`);
    }
  });
  const [selectedOptions, setSelectedOptions] = useState(["a"]);

  const handleButtonClick = (value) => {
    const index = selectedOptions.indexOf(value);
    if (index < 0) {
      setSelectedOptions([...selectedOptions, value]);
    } else {
      setSelectedOptions([
        ...selectedOptions.slice(0, index),
        ...selectedOptions.slice(index + 1),
      ]);
    }
  };
  return (
    <div>
      <h1>Order Stadium Detail</h1>
      <Box
        display="flex"
        width="70vw"
        flexDirection="column"
        justifyContent="center"
      >
        <Container maxWidth="sm" width="90vw">
          <Box my={1}>
            <ButtonM
              width="300px"
              variant="outlined"
              onClick={() => navigate(-1)}
            >
              <ArrowBackIcon />
              返回搜尋頁
            </ButtonM>
          </Box>
          <Typography variant="h4">組隊詳細資料</Typography>
          {/* 內容1 */}
        </Container>
        <Container maxWidth="sm">
          <Box my={2}>
            <Card sx={{ width: "70vw", margin: "auto" }}>
              <Grid container>
                <Grid item xs={6}>
                  <CardMedia
                    component="img"
                    image={pic2} // 替換為您的圖片URL
                    alt="Stadium"
                  />
                </Grid>
                <Grid item xs={6}>
                  <CardContent>
                    <Typography
                      variant="h5"
                      component="div"
                      sx={{ fontWeight: "bold" }}
                    >
                      台大綜合體育館 - 一樓多功能球場 2023/11/02
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      paddingX={1}
                      paddingY={0.2}
                    >
                      106台北市大安區羅斯福路四段1號
                    </Typography>
                    <Typography variant="body2" color="000000" paddingY={0.2}>
                      <span
                        style={{
                          color: "000000",
                          backgroundColor: "#D9D9D9",
                          paddingLeft: "10px",
                          paddingRight: "10px",
                        }}
                      >
                        週一至週五 16:00~21:00 開放預約
                      </span>
                    </Typography>
                    <Typography
                      variant="body2"
                      color="000000"
                      paddingX={1}
                      paddingY={0.2}
                    >
                      建議最大使用人數 : {8}
                    </Typography>
                    <Typography
                      variant="body1"
                      color="000000"
                      paddingX={1}
                      paddingY={0.2}
                      sx={{ fontWeight: "bold" }}
                    >
                      預約時間：
                    </Typography>

                    <Box mx={1}>
                      <Button
                        type={
                          selectedOptions.includes("a") ? "primary" : "default"
                        }
                        onClick={() => handleButtonClick("a")}
                      >
                        16:00
                      </Button>
                      <Button
                        type={
                          selectedOptions.includes("b") ? "primary" : "default"
                        }
                        onClick={() => handleButtonClick("b")}
                      >
                        16:30
                      </Button>
                      <Button
                        type={
                          selectedOptions.includes("c") ? "primary" : "default"
                        }
                        onClick={() => handleButtonClick("c")}
                      >
                        17:00
                      </Button>
                      <Button
                        type={
                          selectedOptions.includes("d") ? "primary" : "default"
                        }
                        onClick={() => handleButtonClick("d")}
                      >
                        17:30
                      </Button>
                      <Button
                        type={
                          selectedOptions.includes("e") ? "primary" : "default"
                        }
                        onClick={() => handleButtonClick("e")}
                      >
                        18:00
                      </Button>
                    </Box>
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
