import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { Box } from "@mui/material";
import Button from "@mui/material/Button"; // 引入Button元件
import { useEffect } from "react";

export default function joinStadiumCard({ id, image, title, description }) {
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
                {description}
              </Typography>
              <Button
                variant="contained"
                onClick={() => (window.location.href = "joinStadiumDetail?id=")}
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
