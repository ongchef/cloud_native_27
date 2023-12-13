import { useNavigate } from "react-router-dom"; // 引入useNavigate
import Button from "@mui/material/Button"; // 引入Button元件
import React, { useState, useEffect } from "react";
import Container from "@mui/material/Container"; // 引入Container元件
import Box from "@mui/material/Box"; // 引入Box元件

import { Card } from "@mui/material";

import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { TextField } from "@mui/material";
import axios from "axios";
import authHeader from "../authService/authHeader";

export default function UserProfile() {
  const [userProfile, setUserProfile] = useState([]);
  async function getUserProfile() {
    return await axios.get("http://localhost:3000/api/users/id", {
      headers: authHeader(),
    });
  }
  useEffect(() => {
    getUserProfile().then((res) => {
      setUserProfile(res.data[0]);
      setProfile({
        name: res.data[0].name,
        email: res.data[0].email,
        phone: res.data[0].phone,
        line_ID: res.data[0].line_id,
      });
    });
  }, []);

  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    line_ID: "",
    password: "",
  });
  useEffect(() => {
    console.log(userProfile);
  }, [userProfile]);
  useEffect(() => {
    console.log(profile);
  }, [profile]);
  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Update profile logic here
    console.log(profile);
  };
  const navigate = useNavigate();

  return (
    <div>
      <h1>user Profile</h1>
      <Box display="flex" flexDirection="column" alignItems="center" gap={5}>
        <Container maxWidth="sm"></Container>

        <Box>
          <Card sx={{ width: "50vw", margin: "auto" }}>
            <form>
              <Box
                my={4}
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                gap={2}
              >
                <Typography variant="h4">User Profile</Typography>
                <Box
                  display="flex"
                  flexDirection="row"
                  justifyContent="space-between"
                  alignItems="center"
                  width="70%"
                >
                  <Typography variant="h5" style={{}}>
                    Name :
                  </Typography>
                  <TextField
                    id="name"
                    label="Name"
                    onChange={handleChange}
                    style={{ width: "70%" }}
                    value={profile.name}
                  />
                </Box>
                <Box
                  display="flex"
                  flexDirection="row"
                  justifyContent="space-between"
                  alignItems="center"
                  width="70%"
                >
                  <Typography variant="h5" style={{}}>
                    Email :
                  </Typography>
                  <TextField
                    id="email"
                    label="Email"
                    onChange={handleChange}
                    style={{ width: "70%" }}
                    value={profile.email}
                  />
                </Box>
                <Box
                  display="flex"
                  flexDirection="row"
                  justifyContent="space-between"
                  alignItems="center"
                  width="70%"
                >
                  <Typography variant="h5" style={{}}>
                    Line ID :
                  </Typography>
                  <TextField
                    id="line_ID"
                    label="Line ID"
                    onChange={handleChange}
                    style={{ width: "70%" }}
                    value={profile.line_ID}
                  />
                </Box>
                <Box
                  display="flex"
                  flexDirection="row"
                  justifyContent="space-between"
                  alignItems="center"
                  width="70%"
                >
                  <Typography variant="h5" style={{}}>
                    Phone :
                  </Typography>
                  <TextField
                    id="phone"
                    label="Phone"
                    onChange={handleChange}
                    style={{ width: "70%" }}
                    value={profile.phone}
                  />
                </Box>

                <Box
                  display="flex"
                  flexDirection="row"
                  justifyContent="space-between"
                  alignItems="center"
                  width="70%"
                >
                  <Typography variant="h5" style={{}}>
                    Password :
                  </Typography>
                  <TextField
                    label="Password"
                    type="password"
                    onChange={handleChange}
                    style={{ width: "70%" }}
                  />
                </Box>
                <Box display="flex" justifyContent="center" gap={2}>
                  <Button variant="contained" style={{ width: "100px" }}>
                    Cancel
                  </Button>

                  <Button
                    variant="contained"
                    color="primary"
                    style={{ width: "100px" }}
                  >
                    Save
                  </Button>
                </Box>
                {/* 其他輸入字段 */}
              </Box>
            </form>
          </Card>
        </Box>
      </Box>
      {/* 添加這一行 */}
    </div>
  );
}
