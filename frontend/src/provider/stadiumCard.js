import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { Box } from "@mui/material";
import Button from "@mui/material/Button"; // 引入Button元件
import { useNavigate } from "react-router-dom"; // Import useNavigate instead of useHistory
import moment from "moment";
import { useState } from "react";

export default function StadiumCard({ id, image, title, description,date }) {
  // const [date, setDate] = useState(moment(new Date()).format("YYYY-MM-DD"));
  const navigate = useNavigate();
  return (
    <Box my={2}>
      <Card
        sx={{
          height: "38vh",
          width: "70%",
          margin: "auto",
          "@media (max-width:800px)": {
            height: "auto",
            width: "100%",
          },
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              height="100%"
              width="100%"
            >
              <CardMedia
                component="img"
                image={image} // 替換為您的圖片URL
                alt="Stadium"
                sx={{
                  maxHeight: "100%",
                  maxWidth: "100%",
                  objectFit: "fill",
                }}
              />
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <CardContent>
              <Typography
                variant="h5"
                component="div"
                sx={{ fontWeight: "bold" }}
              >
                {title}
              </Typography>
              <Box mx={1} my={1} display="flex" flexDirection="column">
                <Typography variant="body2" color="text.secondary">
                  {description[0]}
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
                    {description[1]} {description[2]} 開放預約
                  </span>
                  
                </Typography>

                <Typography variant="body2" color="000000">
                  建議最大使用人數： <strong>{description[3]}</strong>
                </Typography>

                <Box display="flex" justifyContent="flex-end">
                  <Button
                    size="small"
                    variant="contained"
                    onClick={() => navigate(`/stadiumBookingDetail?id=${id}&time=${date}`)} // Include the id in the string
                  >
                    查看詳細場地狀況
                  </Button>
                </Box>
              </Box>
            </CardContent>
          </Grid>
        </Grid>
      </Card>
      {/* <Card sx={{ width: "70vw", margin: "auto" }}>
        <Grid container>
          <Grid
            item
            xs={6}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <CardMedia
              component="img"
              image={image}
              alt={title}
              sx={{ maxHeight: "100%", maxWidth: "100%", objectFit: "contain" }}
            />
          </Grid>
          <Grid item xs={6}>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {description[0]}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {description[1]} {description[2]} 開放預約
              </Typography>
              <Typography variant="body2" color="text.secondary">
                建議最大使用人數：{description[3]}
              </Typography>
              
              <Button
                variant="contained"
                onClick={() => navigate(`/stadiumBookingDetail?id=${id}`)} // Include the id in the string
              >
                查看詳細場地狀況
              </Button>
            </CardContent>
          </Grid>
        </Grid>
      </Card> */}
    </Box>
  );
}
