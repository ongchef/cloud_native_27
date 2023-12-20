import Box from "@mui/material/Box"; // 引入Box元件
import Typography from "@mui/material/Typography"; // 引入Typography元件
import HistoryCard from "./userHistoryCard"; // 引入StadiumCard元件
import pic from "../pic/羽球1.png";
import { useEffect, useState } from "react";
import axios from "axios";
import authHeader from "../authService/authHeader";
import moment from "moment/moment";

const balltype = ["羽球", "籃球", "桌球", "排球"];
export default function UserHistory() {
  const [date, setDate] = useState(moment(new Date()).format("YYYY-MM-DD"));
  const [userHistoryList, setUserHistoryList] = useState([]);
  async function getUserHistory() {
    return await axios.get(
      "http://localhost:3000/api/users/appointment/histories",
      {
        headers: authHeader(),
      }
    );
  }
  useEffect(() => {
    getUserHistory().then((res) => setUserHistoryList(res.data));
  }, []);
  return (
    <div>
      <h1>user History</h1>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "5px",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* 修改這一行 */}
        <Box width="80vw">
          <Typography variant="h3">球場歷史紀錄</Typography>
        </Box>
        <Box m={0.5} sx={{ height: "70vh", overflowY: "auto", width: "70%" }}>
          {[...userHistoryList].reverse().map((history) => {
            const currentDate = new Date();

            const currentTime = new Date();
            console.log(currentTime);
            const historyDateInGMT8 = new Date(history.date);
            historyDateInGMT8.setHours(history.end_time.substring(0, 2));
            historyDateInGMT8.setMinutes(history.end_time.substring(3, 5));
            console.log(historyDateInGMT8);
            let year = historyDateInGMT8.getFullYear();
            let month = historyDateInGMT8.getMonth() + 1; // getMonth() returns month index starting from 0
            let day = historyDateInGMT8.getDate();
            // Pad single digit month and day with leading 0
            month = month < 10 ? "0" + month : month;
            day = day < 10 ? "0" + day : day;
            let formattedDate = `${year}-${month}-${day}`;
            // console.log(formattedDate);

            const status = new Date(currentTime) <= new Date(historyDateInGMT8);
            console.log(status);
            return (
              <HistoryCard
                image={history.image_url.split(".jpg")[0] + ".jpg"}
                title={history.court_name + " - " + history.location}
                description={[
                  history.address,
                  formattedDate,
                  history.start_time.substring(0, 5) +
                    " ~ " +
                    history.end_time.substring(0, 5),
                  [balltype[history.ball - 1], history.level, history.rule],
                ]}
                status={status}
              />
            );
          })}
          {/* <HistoryCard
            image={pic}
            title={"球場名稱1"}
            description={[
              "106台北市大安區羅斯福路四段1號",
              "2023-11-02",
              "19:00~21:00",
              ["Basketball", "新手友善", "雙打"],
            ]}
            status={true}
          />
          <HistoryCard
            image={pic2}
            title={"球場名稱2"}
            description={[
              "106台北市大安區羅斯福路四段1號",
              "2023-11-02",
              "19:00~21:00",
              ["Basketball", "新手友善", "雙打"],
            ]}
            status={true}
          />
          <HistoryCard
            image={pic2}
            title={"球場名稱3"}
            description={[
              "106台北市大安區羅斯福路四段1號",
              "2023-11-02",
              "19:00~21:00",
              ["Basketball", "新手友善", "雙打"],
            ]}
            status={false}
          /> */}
        </Box>
      </Box>
    </div>
  );
}
