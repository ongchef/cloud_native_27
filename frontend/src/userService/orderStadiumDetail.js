import { useNavigate } from "react-router-dom"; // 引入useNavigate
import Button from "@mui/material/Button"; // 引入Button元件
import { useEffect } from "react";
export default function OrderStadiumDetail() {
  const navigate = useNavigate();
  useEffect(()=>{
    let url = new URL(window.location.href);
    let params = url.searchParams;
    for (let pair of params.entries()) {
      console.log(`key: ${pair[0]}, value: ${pair[1]}`);
    }
  })
  return (
    <div>
      <h1>Order Stadium Detail</h1>
      <Button variant="contained" onClick={() => navigate(-1)}>
        返回上一頁
      </Button>
    </div>
  );
}
