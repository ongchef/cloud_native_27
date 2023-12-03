import { useNavigate } from "react-router-dom"; // 引入useNavigate
import Button from "@mui/material/Button"; // 引入Button元件
import React, { useEffect } from "react";
import Container from "@mui/material/Container"; // 引入Container元件
import Box from "@mui/material/Box"; // 引入Box元件
import pic from "../pic/羽球1.png";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Card } from "@mui/material";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

export default function JoinStadiumDetail() {
  const navigate = useNavigate();
  const tags = ["Basketball", "現場報隊", "新手友善"];
  useEffect(() => {
    let url = new URL(window.location.href);
    let params = url.searchParams;
    for (let pair of params.entries()) {
      console.log(`key: ${pair[0]}, value: ${pair[1]}`);
    }
  });
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
            <Button
              width="300px"
              variant="outlined"
              onClick={() => navigate(-1)}
            >
              <ArrowBackIcon />
              返回搜尋頁
            </Button>
          </Box>
          <Typography variant="h4">組隊詳細資料</Typography>
          {/* 內容1 */}
        </Container>
        <Container maxWidth="sm">
          <Box my={2}>
            <Card sx={{ width: "70vw", margin: "auto" }}>
              <Grid
                paddingLeft="30px"
                container
                spacing={2}
                alignItems="center"
                justifyContent="center"
              >
                <Grid item xs={12} sm={6}>
                  <CardMedia
                    component="img"
                    image={pic} // 替換為您的圖片URL
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
                      台大舊體育館 - 籃球Ａ場 2023/11/02
                    </Typography>
                    <Box
                      mx={1}
                      display="flex"
                      flexDirection="column"
                      justifyContent="center"
                      flexWrap="wrap"
                      gap={1}
                    >
                      <Typography variant="body2" color="text.secondary">
                        106台北市大安區羅斯福路四段1號
                      </Typography>
                      <Typography variant="body2" color="000000">
                        <span
                          style={{
                            color: "000000",
                            backgroundColor: "#D9D9D9",
                            paddingLeft: "10px",
                            paddingRight: "10px",
                            fontSize: "14px",
                          }}
                        >
                          2023/11/29 16:00~18:00
                        </span>
                      </Typography>
                      <Typography variant="body2" color="000000">
                        {tags.map((tag, index) => (
                          <React.Fragment key={index}>
                            <span
                              style={{
                                color: "000000",
                                backgroundColor: "#D9D9D9",
                                paddingLeft: "10px",
                                paddingRight: "10px",
                                paddingTop: "5px",
                                paddingBottom: "5px",
                                fontSize: "16px",
                              }}
                            >
                              {tag}
                            </span>
                            {index < tags.length - 1 && <>&nbsp;</>}
                          </React.Fragment>
                        ))}
                      </Typography>
                      <Typography variant="body2" color="000000">
                        當前場地預約人數： <strong>4/8</strong>
                      </Typography>
                      <Box
                        display="flex"
                        flexDirection="row"
                        alignItems="center"
                        flexWrap="wrap"
                        gap={1}
                      >
                        <Avatar
                          sx={{ bgcolor: "#FFA370" }}
                          alt="Remy Sharp"
                          src="/broken-image.jpg"
                        >
                          B
                        </Avatar>
                        主揪人：{"Bryan Chen"}
                      </Box>
                      <Box display="flex" justifyContent="flex-end">
                        <Button
                          width="300px"
                          variant="outlined"
                          onClick={() => {
                            console.log("加入場地api");
                          }}
                        >
                          <ArrowForwardIcon />
                          加入場地
                        </Button>
                      </Box>
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
