import React, { useState } from "react";
import LogDatePicker from "./logDatePicker";
import {
  DataGrid,
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarExport,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";
import GridPresent from "./gridPresent";

export type GAMELOG = {
  id?: number;
  userName: string;
  gameName: string;
  userId: string;
  userGender: string;
  currentTime: string;
};

function AdminLog() {
  function CustomToolbar() {
    return (
      <GridToolbarContainer>
        <GridToolbarExport />
        <GridPresent data={gameLogs} />
      </GridToolbarContainer>
    );
  }

  const [gameLogs, setGameLogs] = useState<GAMELOG[]>([]);
  return (
    <div>
      <LogDatePicker setGameLogs={setGameLogs} />
      <div style={{ marginTop: 10, height: 400, width: "100%" }}>
        <DataGrid
          rowHeight={40}
          columns={[
            { field: "id", headerName: "", width: 20 },
            { field: "userName", headerName: "사용자", width: 100 },
            { field: "currentTime", headerName: "일자", width: 200 },
            { field: "userGender", headerName: "성별" },
            { field: "gameName", headerName: "게임" },
            { field: "userId", headerName: "아이디" },
          ]}
          rows={gameLogs}
          localeText={{
            toolbarDensity: "Size",
            toolbarDensityLabel: "Size",
            toolbarDensityCompact: "Small",
            toolbarDensityStandard: "Medium",
            toolbarDensityComfortable: "Large",
          }}
          density="compact"
          components={{
            Toolbar: CustomToolbar,
          }}
        />
      </div>
    </div>
  );
}

export default AdminLog;
