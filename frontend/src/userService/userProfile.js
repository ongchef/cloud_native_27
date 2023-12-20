import { useNavigate } from "react-router-dom"; // 引入useNavigate
import Button from "@mui/material/Button"; // 引入Button元件
import React, { useState, useEffect } from "react";
import Container from "@mui/material/Container"; // 引入Container元件
import Box from "@mui/material/Box"; // 引入Box元件
import { Card } from "@mui/material";
import Typography from "@mui/material/Typography";
import { TextField } from "@mui/material";
import FetchData from "../authService/fetchData";
export default function UserProfile() {
  const [userProfile, setUserProfile] = useState([]);
  async function getUserProfile() {
    return FetchData.getData("api/users/id", 1, {});
  }
  const updateUserProfile = () => {
    let userdata = profile;
    console.log(userdata);
    let login = { name: userdata.name, password: userdata.password };
    console.log(login);
    FetchData.postData("api/users/login", login).then(
      (res) => {
        console.log(res);
        if (res === 200) {
          delete userdata.password;
          FetchData.putData("api/users", userdata).then(
            (res) => {
              console.log(res);
              if (res === 200) {
                console.log("個人資訊更新成功");
                alert("個人資訊成功");
                window.location.reload();
              }
            }
          );
        } else if (res === 401) {
          alert("密碼錯誤");
          window.location.reload();
        }
      }
    );
  };
  useEffect(() => {
    getUserProfile().then((res) => {
      setUserProfile(res[0]);
      setProfile(res[0]);
    });
  }, []);

  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    line_id: "",
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
                    disabled
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
                    value={profile.line_id}
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
                    欲更新基本資料
                  </Typography>
                </Box>
                <Box
                  display="flex"
                  flexDirection="row"
                  justifyContent="space-between"
                  alignItems="center"
                  width="70%"
                >
                  <Typography variant="h5" style={{}}>
                    請輸入密碼 :
                  </Typography>
                  <br></br>
                  <TextField
                    id="password"
                    label="Password"
                    type="password"
                    onChange={handleChange}
                    style={{ width: "70%" }}
                  />
                </Box>
                <Box display="flex" justifyContent="center" gap={2}>
                  <Button
                    variant="contained"
                    style={{ width: "100px" }}
                    onClick={() => navigate(-1)}
                  >
                    Cancel
                  </Button>

                  <Button
                    variant="contained"
                    color="primary"
                    style={{ width: "100px" }}
                    onClick={updateUserProfile}
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
