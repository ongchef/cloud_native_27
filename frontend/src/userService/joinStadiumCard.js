import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { Box } from "@mui/material";
import Button from "@mui/material/Button"; // 引入Button元件
import { useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate instead of useHistory

export default function JoinStadiumCard({ id, image, title, description }) {
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
              sx={{
                maxHeight: "100%",
                maxWidth: "100%",
                objectFit: "contain",
                padding: "2%",
              }}
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
                {description[1] + " " + description[2]}
              </Typography>
              {Array.isArray(description[3]) &&
                description[3].map((item, index) => (
                  <Typography
                    key={index}
                    variant="body2"
                    color="text.secondary"
                  >
                    {item}
                  </Typography>
                ))}
              <Button
                variant="contained"
                onClick={() => navigate(`/joinStadiumDetail?id=${id}`)} // Include the id in the string
              >
                加入場地
              </Button>
            </CardContent>
          </Grid>
        </Grid>
      </Card>
    </Box>
  );
}
