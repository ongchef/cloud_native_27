import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { Box } from "@mui/material";
import Button from "@mui/material/Button";
import React, { useEffect } from "react";
export default function UserHistoryCard({
  id,
  image,
  title,
  description,
  status,
}) {
  return (
    <Box my={2}>
      <Card
        sx={{
          height: "35vh",
          width: "70%",
          margin: "auto",
          "@media (max-width:600)": {
            height: "70%",
          },
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <CardMedia
              component="img"
              image={image}
              alt="Stadium"
              sx={{ height: "100%", width: "100%" }}
            />
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
              <Box
                mx={1}
                my={1}
                display="flex"
                flexDirection="column"
                gap={1.2}
              >
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
                    {description[1]} {description[2]}
                  </span>
                </Typography>
                <Typography variant="body2" color="000000">
                  {description[3].map((tag, index) => (
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
                      {index < description[3].length - 1 && <>&nbsp;</>}
                    </React.Fragment>
                  ))}
                </Typography>
                <Typography variant="body2" color="000000">
                  當前場地預約人數： <strong>4/8</strong>
                </Typography>

                <Box display="flex" justifyContent="flex-end">
                  <Button variant="contained" disabled={!status}>
                    {status ? "即將到來" : "已結束"}
                  </Button>
                </Box>
              </Box>
            </CardContent>
          </Grid>
        </Grid>
      </Card>
    </Box>
  );
}
