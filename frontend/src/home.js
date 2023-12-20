import { Box, CardMedia } from "@mui/material";
import Slide from "@mui/material/Slide";
import { useEffect, useState } from "react";
import pic1 from "./pic/joinable1.png";
import pic2 from "./pic/joinable2.png";
import pic3 from "./pic/joinable3.png";

export default function Home() {
  const [checked, setChecked] = useState(true);
  const [checked1, setChecked1] = useState(false);
  const [checked2, setChecked2] = useState(false);

  const handleChange = () => {
    setChecked((prev) => !prev);
  };
  useEffect(() => {
    setTimeout(() => {
      setChecked1(true);
      setChecked2(true);
    }, 1000);
  });
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      height="90vh"
      weight="100vw"
    >
      <Box height="18vw" width="18vw">
        <Slide
          direction="down"
          in={checked}
          mountOnEnter
          unmountOnExit
          timeout={1000}
        >
          <CardMedia
            component="img"
            image={pic1} // 替換為您的圖片URL
            alt="Stadium"
            sx={{
              objectFit: "fill",
            }}
          />
        </Slide>
        <Box display="flex" justifyContent="center">
          <Slide
            direction="right"
            in={checked1}
            mountOnEnter
            unmountOnExit
            timeout={500}
          >
            <CardMedia
              component="img"
              image={pic2} // 替換為您的圖片URL
              alt="Stadium"
              sx={{
                objectFit: "fill",
              }}
            />
          </Slide>
          <Slide
            direction="left"
            in={checked2}
            mountOnEnter
            unmountOnExit
            timeout={500}
          >
            <CardMedia
              component="img"
              image={pic3} // 替換為您的圖片URL
              alt="Stadium"
              sx={{
                objectFit: "fill",
              }}
            />
          </Slide>
        </Box>
      </Box>
    </Box>
  );
}
