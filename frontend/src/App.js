import React from "react";
import { Box, Button, Card, Typography } from "@mui/material";
import Board from "./components/Board/Board";

export default function App() {
  return (
    <Box
      className="App"
      sx={{
        width: "100%",
        height: "100vh",
        // border: "2px solid black",
      }}
    >
      <Board />
    </Box>
  );
}
