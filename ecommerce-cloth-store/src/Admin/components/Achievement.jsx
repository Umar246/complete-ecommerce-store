import React from "react";
import { Button, Card, CardContent, styled, Typography } from "@mui/material";
import trophyImg from "../../assets/trophyImg.png"

const TrophyImg = styled("img")({
  right: 36,
  bottom: 20,
  height: 98,
  position: "absolute",
});

export default function Achievement() {
  return (
    <Card sx={{ position: "relative", bgcolor:"#242B2E", color:"#fff" }}>
      <CardContent>
        <Typography variant="h6" sx={{ letterSpacing: ".25px" }}>
          Shop with Zosh
        </Typography>
        <Typography variant="body2">Congratulations 🥳</Typography>
        <Typography variant="h5" sx={{my:3.1}}> 420.8k </Typography>
        <Button size="small" variant="contained">View Sales</Button>
        <TrophyImg src={trophyImg}/>
      </CardContent>
    </Card>
  );
}
