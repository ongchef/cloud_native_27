import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import StadiumCard from "./StadiumCard";
import React, { useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import pic from "../pic/羽球1.png";
import pic2 from "../pic/羽球3.png";
export default function OrderStadium() {
  const [sport, setSport] = useState(10);
  const [location, setLocation] = useState(20);

  const handleSportChange = (event) => {
    setSport(event.target.value);
  };

  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  };
  return (
    <div>
      <h1>Order Stadium</h1>
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="center"
        alignItems="center"
        width="70vw"
        margin="auto"
      >
        <Box m={1}>
          <TextField
            id="datetime-local"
            label="Next appointment"
            type="datetime-local"
            defaultValue="2017-05-24T10:30"
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Box>
        <Box m={1}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">球類</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={sport}
              onChange={handleSportChange}
              label="球類"
            >
              <MenuItem value={10}>籃球</MenuItem>
              <MenuItem value={20}>羽球</MenuItem>
              <MenuItem value={30}>排球</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Box m={1}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label-2">Location</InputLabel>
            <Select
              labelId="demo-simple-select-label-2"
              id="demo-simple-select-2"
              value={location}
              onChange={handleLocationChange}
              label="Location"
            >
              <MenuItem value={10}>大安區</MenuItem>
              <MenuItem value={20}>中正區</MenuItem>
              <MenuItem value={30}>信義區</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Box m={1}>
          <Button variant="contained">Search</Button>
        </Box>
      </Box>
      <Box m={0.5} sx={{ height: "80vh", overflowY: "auto" }}>
        <StadiumCard
          my={2}
          image={pic2}
          title={"球場名稱"}
          description={"球場的資訊"}
        />
        <StadiumCard
          image={pic}
          title={"球場名稱"}
          description={"球場的資訊"}
        />
        <StadiumCard
          image={pic}
          title={"球場名稱"}
          description={"球場的資訊"}
        />
      </Box>
    </div>
  );
}
