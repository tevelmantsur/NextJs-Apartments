import { Input } from "@mui/material";
import React from "react";

export default function MeterFillter(props) {
  return (
    <div className="fillter">
      <h3>מטרים</h3>
      <div className="flex">
        <h5>
          מ-{" "}
          <Input
            style={{ width: "57px" }}
            name="metermin"
            onChange={props.handleChange5}
            placeholder="מטרים"
            min="0"
            type="number"
            variant="standard"
            color="warning"
          ></Input>
        </h5>
        <h5>
          עד-{" "}
          <Input
            style={{ width: "57px" }}
            onChange={props.handleChange4}
            placeholder="מטרים"
            name="metermax"
            min="0"
            type="number"
            variant="standard"
            color="warning"
          ></Input>
        </h5>
      </div>
    </div>
  );
}

export const MemoMeterFillter = React.memo(
  MeterFillter,
  (prevProps, nextProps) => {
    if (prevProps.handleChange6 !== nextProps.handleChange6) {
      return true;
    }
    if (prevProps.handleChange7 !== nextProps.handleChange7) {
      return true;
    }
    return false;
  }
);
