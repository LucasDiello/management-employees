import { Typography } from "@mui/joy";
import { CircularProgress } from "@mui/material";
import React from "react";
import "./loading.css";
const Loading = () => {
  return (
    <div className="loading">
      <Typography>
        <CircularProgress />
      </Typography>
    </div>
  );
};

export default Loading;
