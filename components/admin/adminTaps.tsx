import React, { useState } from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import AdminUser from "./adminUser";
import AdminLog from "./adminLog";
import AdminGame from "./adminGame";
import AdminTest from "./adminTest";
import AdminProfit from "./adminProfit";

function AdminTaps() {
	const [value, setValue] = React.useState("1");
	const handleChange = (event: React.SyntheticEvent, newValue: string) => {
		setValue(newValue);
	};

	return (
		<div>
			<TabContext value={value}>
				<Box sx={{borderBottom: 1, borderColor: "divider"}}>
					<TabList onChange={handleChange} aria-label="lab API tabs example">
						<Tab label="유저 관리" value="1"/>
						<Tab label="게임 관리" value="2"/>
						<Tab label="로그 관리" value="3"/>
						<Tab label="실적 관리" value="4"/>
						<Tab label="테스트" value="5"/>
					</TabList>
				</Box>
				<TabPanel value="1">
					<AdminUser/>
				</TabPanel>
				<TabPanel value="2">
					<AdminGame setAdmin1={true}/>
				</TabPanel>
				<TabPanel value="3">
					<AdminLog/>
				</TabPanel>
				<TabPanel value="4">
					<AdminProfit/>
				</TabPanel>
				<TabPanel value="5">
					<AdminTest/>
				</TabPanel>
			</TabContext>
		</div>
	);
}

export default AdminTaps;
