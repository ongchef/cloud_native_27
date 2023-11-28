import { useNavigate } from "react-router-dom"; // 引入useNavigate
import Button from "@mui/material/Button"; // 引入Button元件
import { useEffect } from "react";
import Container from "@mui/material/Container"; // 引入Container元件
import Box from "@mui/material/Box"; // 引入Box元件
import StadiumCard from "./joinStadiumCard";
import pic2 from "../pic/羽球3.png";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
export default function JoinStadiumDetail() {
  const navigate = useNavigate();
  useEffect(() => {
    let url = new URL(window.location.href);
    let params = url.searchParams;
    for (let pair of params.entries()) {
      console.log(`key: ${pair[0]}, value: ${pair[1]}`);
    }
  });
  return (
    <>
      <h1>Join Stadium Detail</h1>
      <Box
        display="flex"
        width="70vw"
        justifyContent="center"
        flexDirection="column"
      >
        {" "}
        {/* 添加這一行 */}
        <Container maxWidth="sm" width="90vw">
          <Button width="300px" variant="outlined" onClick={() => navigate(-1)}>
            <ArrowBackIcon />
            返回搜尋頁
          </Button>
          {/* 內容1 */}
        </Container>
        <Container maxWidth="sm">
          <StadiumCard
            my={2}
            image={pic2}
            title={"球場名稱"}
            description={"球場的"}
          />
          {/* 內容2 */}
        </Container>
      </Box>{" "}
      {/* 添加這一行 */}
    </>
  );
}
