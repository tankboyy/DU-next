import React, { useState } from "react";
import AdminUser from "./adminUser";
import AdminLog from "./adminLog";
import AdminGame from "./adminGame";
import AdminTest from "./adminTest";
import AdminProfit from "./adminProfit";
import { Tabs, Typography, Box, Tab } from "@mui/material";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function AdminTaps() {
  const [value, setValue] = React.useState(1);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  return (
    <div>
      <Box>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="lab API tabs example"
          >
            <Tab label="유저 관리" {...a11yProps(0)} />
            <Tab label="게임 관리" {...a11yProps(1)} />
            <Tab label="로그 관리" {...a11yProps(2)} />
            <Tab label="실적 관리" {...a11yProps(3)} />
            <Tab label="테스트" {...a11yProps(4)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <AdminUser />
        </TabPanel>
        <TabPanel value={value} index={1}>
          {/* <AdminGame setAdmin1={true}/> */}
        </TabPanel>
        <TabPanel value={value} index={2}>
          <AdminLog />
        </TabPanel>
        <TabPanel value={value} index={3}>
          <AdminProfit />
        </TabPanel>
        <TabPanel value={value} index={4}>
          <AdminTest />
        </TabPanel>
      </Box>
    </div>
  );
}

export default AdminTaps;
