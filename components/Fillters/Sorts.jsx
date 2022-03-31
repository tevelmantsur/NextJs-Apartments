import React, { useCallback, useState } from "react";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import FilterListIcon from "@mui/icons-material/FilterList";
import CloseTwoToneIcon from "@mui/icons-material/CloseTwoTone";
import IconButton from "@mui/material/IconButton";

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
    <div style={{ padding: "0 15px" }}>
      <h4 className="mar" style={{ textAlign: "center" }}>
        מיין לפי {placeholder}
      </h4>
      {clicked === "" ? (
        <div className="flex">
          <IconButton className="mar">
            <ArrowUpwardIcon />
          </IconButton>
          <p id={htl} onClick={HandelClick} className="mar small_text">
            ללא סינון
          </p>
        </div>
      ) : null}

      {clicked === "low" ? (
        <div className="flex">
          <IconButton name={lth} className="mar" color="primary">
            <ArrowUpwardIcon />
          </IconButton>
          <p
            onClick={HandelClick}
            id={lth}
            value="trarta"
            className="mar small_text"
          >
            מהגבוה לנמוך
          </p>
        </div>
      ) : null}

      {clicked === "high" ? (
        <div className="flex">
          <IconButton className="mar" color="primary" onClick={HandelClick}>
            <ArrowDownwardIcon />
            <p id="no" className="mar small_text">
              מהנמוך לגבוהה{" "}
            </p>
          </IconButton>
        </div>
      ) : null}
    </div>
  );
}

export const MemoSorts = React.memo(Sorts, (prevProps, nextProps) => {
  if (prevProps.HandelSort !== nextProps.HandelSort) {
    return true;
  }

  return false;
});
