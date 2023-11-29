import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { Box } from "@mui/material";
import Button from "@mui/material/Button"; // 引入Button元件
import { useNavigate } from "react-router-dom"; // Import useNavigate instead of useHistory

export default function OrderStadiumCard({ id, image, title, description }) {
  const navigate = useNavigate();
  return (
    <Box my={2}>
      
      <Card sx={{ width: "70vw", margin: "auto" }}>
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
      </Card>
    </Box>
  );
}
