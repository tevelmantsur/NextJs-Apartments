import { Input } from "@mui/material";
import React from "react";

export default function Fillters({
  HandelFillters,
  frominputName,
  toinputName,
  placeholder,
}) {
  return (
    <div className="fillter">
      <h3>{placeholder}</h3>
      <div className="flex">
        <h5>
          מ-{" "}
          <Input
            key={toinputName}
            style={{ width: "57px" }}
            onChange={HandelFillters}
            placeholder={placeholder}
            name={toinputName}
            min="0"
            type="number"
            variant="standard"
            color="warning"
          ></Input>
        </h5>
        <h5>
          עד-{" "}
          <Input
            key={frominputName}
            name={frominputName}
            style={{ width: "57px" }}
            onChange={HandelFillters}
            placeholder={placeholder}
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

export const MemoFillter = React.memo(Fillters, (prevProps, nextProps) => {
  if (prevProps.HandelFillters !== nextProps.HandelFillters) {
    return true;
  }

  return false;
});
