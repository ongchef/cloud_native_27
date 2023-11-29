import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { Box } from "@mui/material";
import Button from "@mui/material/Button";
export default function UserHistoryCard({
  id,
  image,
  title,
  description,
  status,
}) {
  return (
    <Box my={2}>
      <Card sx={{ height: "30vh", width: "70vw", margin: "auto" }}>
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
                {description[1] + " " + description[2]}
              </Typography>
              {description[3].map((item, index) => (
                <Typography key={index} variant="body2" color="text.secondary">
                  {item}
                </Typography>
              ))}
              <Button variant="contained" disabled={!status}>
                {status ? "即將到來" : "已結束"}
              </Button>
            </CardContent>
          </Grid>
        </Grid>
      </Card>
    </Box>
  );
}
