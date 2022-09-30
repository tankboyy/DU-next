import React, { useEffect, useState } from "react";
import { Backdrop, CircularProgress } from "@mui/material";

function UseBackDrop({ bdOpen = false }: { bdOpen: boolean }) {
  const [open, setOpen] = useState(bdOpen);
  useEffect(() => {
    setOpen(bdOpen);
  }, [bdOpen]);
  return (
    <>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        onClick={() => setOpen(false)}
      >
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <p>로딩중...</p>
            <CircularProgress sx={{ ml: 1 }} color="inherit" />
          </div>
        </div>
      </Backdrop>
    </>
  );
}

export default UseBackDrop;
