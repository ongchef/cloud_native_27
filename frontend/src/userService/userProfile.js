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
      <h1>user Profile</h1>
      <Box display="flex" flexDirection="column" alignItems="center" gap={5}>
        <Container maxWidth="sm"></Container>
        <Container maxWidth="sm">
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
                      label="Name"
                      onChange={handleChange}
                      style={{ width: "70%" }}
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
                      label="Email"
                      onChange={handleChange}
                      style={{ width: "70%" }}
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
                      label="Line ID"
                      onChange={handleChange}
                      style={{ width: "70%" }}
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
                      label="Phone"
                      onChange={handleChange}
                      style={{ width: "70%" }}
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
        </Container>
      </Box>
      {/* 添加這一行 */}
    </div>
  );
}
