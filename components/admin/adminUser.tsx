import React, { useEffect, useState } from "react";
import {
  DataGrid,
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarExport,
  GridToolbarFilterButton,
  koKR,
} from "@mui/x-data-grid";
import useGetYMD from "../../hooks/useGetYMD";
import GridUserChange from "./gridUserChange";
import { createTheme, ThemeProvider } from "@mui/material";
import axios from "axios";
import useGetYMDHM from "../../hooks/useGetYMDHM";

export interface tUSER {
  id?: number;
  created: string;
  friends: string[];
  userBirthDay: string;
  userGender: string;
  userId: string;
  userName: string;
  userPw: string;
  userSchool: string;
  userNumber?: string | undefined;
}

function AdminUser() {
  const [users, setUsers] = useState<tUSER[]>();
  const [user, setUser] = useState<tUSER>();
  let userArr: tUSER[] = [];

  useEffect(() => {
    async function getUserData() {
      const { data } = await axios.get(`api/users`);

      const newData: tUSER[] = [];
      data?.map((user: tUSER) => {
        const created = useGetYMDHM(new Date(user.created));
        newData.push({ ...user, created });
      });

      for (const [key, value] of Object.entries(newData)) {
        const realData = { ...value, id: parseInt(key) + 1 };
        userArr = [...userArr, realData];
      }

      setUsers(userArr);
    }

    getUserData();
  }, []);

  function CustomToolbar() {
    return (
      <GridToolbarContainer>
        <GridToolbarExport />
        <GridUserChange user={user} users={users} setUsers={setUsers} />
      </GridToolbarContainer>
    );
  }

  const theme = createTheme(
    {
      palette: {
        primary: { main: "#1976d2" },
      },
    },
    koKR
  );

  return (
    <div style={{ height: 600, width: 800 }}>
      {users ? (
        <ThemeProvider theme={theme}>
          <DataGrid
            rowHeight={40}
            onSelectionModelChange={(ids) => {
              const i: number = ids[0] as number;
              setUser(users![i - 1]);
            }}
            columns={[
              { field: "id", headerName: "", width: 20 },
              { field: "userId", headerName: "ID", width: 100 },
              { field: "userName", headerName: "이름" },
              { field: "userGender", headerName: "성별" },
              { field: "userBirthDay", headerName: "생년월일" },
              { field: "userSchool", headerName: "학교" },
              { field: "created", headerName: "가입일", width: 200 },
            ]}
            rows={users}
            density="compact"
            components={{
              Toolbar: CustomToolbar,
            }}
          />
        </ThemeProvider>
      ) : (
        <div>로딩중 ...</div>
      )}
    </div>
  );
}

export default AdminUser;
