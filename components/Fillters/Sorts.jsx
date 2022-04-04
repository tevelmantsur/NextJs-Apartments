import React, { useCallback, useState } from "react";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import FilterListIcon from "@mui/icons-material/FilterList";
import CloseTwoToneIcon from "@mui/icons-material/CloseTwoTone";
import IconButton from "@mui/material/IconButton";
import { Button, Typography } from "@mui/material";

export default function Sorts({ HandelSort, placeholder, htl, lth, sort }) {
  const [clicked, setClicked] = useState("");

  const HandelClick = React.useCallback((e, i) => {
    i = sort;
    HandelSort(e, i);

    if (clicked === "low") {
      setClicked("high");
    }
    if (clicked === "") {
      setClicked("low");
    }
    if (clicked === "high") {
      setClicked("");
    }
  });

  return (
    <>
      <Typography variant="h6" textAlign="center">
        {placeholder}
      </Typography>
      {clicked === "" ? (
        <Button
          onClick={HandelClick}
          color="inherit"
          startIcon={<ArrowUpwardIcon />}
        >
          ללא סינון
        </Button>
      ) : null}

      {clicked === "low" ? (
        <Button
          id={lth}
          onClick={HandelClick}
          color="primary"
          variant="outlined"
          startIcon={<ArrowUpwardIcon color="primary" />}
        >
          מהגבוה לנמוך
        </Button>
      ) : null}

      {clicked === "high" ? (
        <Button
          id="no"
          onClick={HandelClick}
          color="secondary"
          variant="outlined"
          startIcon={<ArrowDownwardIcon />}
        >
          מהנמוך לגבוהה
        </Button>
      ) : null}
    </>
  );
}

export const MemoSorts = React.memo(Sorts, (prevProps, nextProps) => {
  if (prevProps.HandelSort !== nextProps.HandelSort) {
    return true;
  }

  return false;
});
