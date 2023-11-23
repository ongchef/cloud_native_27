import { useNavigate } from "react-router-dom"; // 引入useNavigate
import Button from "@mui/material/Button"; // 引入Button元件
export default function OrderStadiumDetail() {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Order Stadium Detail</h1>
      <Button variant="contained" onClick={() => navigate(-1)}>
        返回上一頁
      </Button>
    </div>
  );
}
