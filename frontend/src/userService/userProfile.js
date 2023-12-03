import { useNavigate } from "react-router-dom"; // 引入useNavigate
import Button from "@mui/material/Button"; // 引入Button元件
import React, { useState, useEffect } from "react";
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
import { TextField } from "@mui/material";

export default function UserProfile() {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    line_ID: "",
    password: "",
  });
  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Update profile logic here
    console.log(profile);
  };
  const navigate = useNavigate();

  return (
    <div>
      <h1>Order Stadium Detail</h1>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <Container maxWidth="sm" width="90%">
          <Typography variant="h4">個人資料修改</Typography>
          {/* 內容1 */}
        </Container>
        <Container maxWidth="sm">
          <Box display="flex" justifyContent="center" alignItems="center">
            <Card sx={{ width: "50vw", margin: "auto" }}>
              <form>
                <Box
                  my={2}
                  display="flex"
                  flexDirection="column"
                  justifyContent="center"
                  alignItems="center"
                  gap={2}
                >
                  <Box
                    mx={2}
                    display="flex"
                    flexDirection="row"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Typography variant="h6">Name : </Typography>
                    <TextField label="Name" onChange={handleChange} />
                  </Box>
                  <div>
                    <TextField label="Email" onChange={handleChange} />
                  </div>
                  <div>
                    <TextField label="Phone" onChange={handleChange} />
                  </div>
                  <div>
                    <TextField label="Line ID" onChange={handleChange} />
                  </div>
                  <div>
                    <TextField
                      label="Password"
                      type="password"
                      onChange={handleChange}
                    />
                  </div>
                  <Button type="submit">Submit</Button>
                </Box>
              </form>
            </Card>
          </Box>
        </Container>
      </Box>
      {/* 添加這一行 */}
    </div>
  );
}
