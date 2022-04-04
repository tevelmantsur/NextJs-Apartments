import { Input, TextField } from "@mui/material";
import React from "react";

import rtlPlugin from "stylis-plugin-rtl";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { prefixer } from "stylis";
export default function Fillters({
  HandelFillters,
  frominputName,
  toinputName,
  placeholder,
}) {
  const cacheRtl = createCache({
    key: "muirtl",
    stylisPlugins: [prefixer, rtlPlugin],
  });
  return (
    <CacheProvider value={cacheRtl}>
      <div className="fillter">
        <h3>{placeholder}</h3>
        <div className="flex" style={{ gap: "20px" }}>
          <TextField
            key={toinputName}
            style={{ width: "58px", textAlign: "right" }}
            onChange={HandelFillters}
            name={toinputName}
            min="0"
            type="number"
            variant="standard"
            helperText={`מ-${placeholder}`}
            label="מ "
          ></TextField>

          <h5>
            <TextField
              key={frominputName}
              name={frominputName}
              style={{ width: "57px" }}
              onChange={HandelFillters}
              label="עד "
              min="0"
              type="number"
              variant="standard"
              helperText={`עד-${placeholder}`}
            ></TextField>
          </h5>
        </div>
      </div>
    </CacheProvider>
  );
}

export const MemoFillter = React.memo(Fillters, (prevProps, nextProps) => {
  if (prevProps.HandelFillters !== nextProps.HandelFillters) {
    return true;
  }

  return false;
});
