// Achievement.js
import React from "react";
import { Button, Card, CardContent, styled, Typography, Box } from "@mui/material";
import trophyImg from "../../assets/trophyImg.png"

const TrophyImg = styled("img")({
  right: 36,
  bottom: 20,
  height: 98,
  position: "absolute",
});

export default function Achievement() {
  return (
    <Card sx={{ 
      position: "relative", 
      background: "linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)",
      color: "#fff",
      borderRadius: 3,
      boxShadow: 3,
      overflow: "hidden",
      height: "100%",
      width: "100%",
      display: "flex",
      flexDirection: "column"
    }}>
      <CardContent sx={{ 
        position: "relative", 
        zIndex: 2,
        flexGrow: 1,
        display: "flex",
        flexDirection: "column"
      }}>
        <Typography variant="h6" sx={{ letterSpacing: ".25px", fontWeight: 600 }}>
          Shop with Umar
        </Typography>
        <Typography variant="body2" sx={{ opacity: 0.9 }}>Congratulations 🥳</Typography>
        <Typography variant="h3" sx={{ my: 3, fontWeight: 700 }}> 420.8k </Typography>
        
        <Box sx={{ flexGrow: 1 }}></Box>
        
        <Button 
          size="small" 
          variant="contained" 
          sx={{ 
            mt: 2,
            alignSelf: "flex-start",
            bgcolor: "#fff", 
            color: "#4f46e5",
            fontWeight: 600,
            "&:hover": { bgcolor: "#f0f0f0" }
          }}
        >
          View Sales
        </Button>
        <TrophyImg src={trophyImg} />
      </CardContent>
      
      <div style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)",
        zIndex: 1
      }}></div>
    </Card>
  );
}