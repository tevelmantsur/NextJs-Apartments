import { TextField } from "@mui/material";
import React from "react";

export default function AdressFillter(props) {
  return (
    <div className="fillter">
      <h5>הזן כתובת לחיפוש</h5>
      <TextField
        color="primary"
        name="location"
        size="small"
        style={{ width: "80%", padding: "5px 0" }}
        onChange={props.AdressSearch}
        placeholder={` לדוגמא : "תל אביב"`}
        min="0"
        type="text"
      ></TextField>
    </div>
  );
}
export const MemoAdressFillter = React.memo(
  AdressFillter,
  (prevProps, nextProps) => {
    if (prevProps.AdressSearch !== nextProps.AdressSearch) {
      return true;
    }

    return false;
  }
);
