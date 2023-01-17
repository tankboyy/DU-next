import React, { useRef, useState } from "react";
import { GAMETYPE, USERSTYPE } from "../types";
import useEndTime from "../../hooks/useEndTime";
import {
	Stack,
	Divider,
	Paper,
	Dialog,
	DialogTitle,
	DialogContentText,
	DialogContent,
	DialogActions,
	Button,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import UseBackDrop from "../useBackDrop";
import { Tgames } from "./adminGame";
import axios from "axios";

const Item = styled(Paper)(({theme}) => ({
	backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
	...theme.typography.body2,
	padding: theme.spacing(1),
	textAlign: "center",
	color: theme.palette.text.secondary,
}));

function AdminGameList({
	gameData,
	gamesData,
	setGames,
	setAdmin = false,
}: {
	setAdmin: Boolean;
	gameData: GAMETYPE;
	gamesData: Tgames;
	setGames: React.Dispatch<React.SetStateAction<Tgames | undefined>>;
}) {
	const [diaOpen, setDiaOpen] = useState(false);
	const [loading, setLoading] = useState(false);

	const itemIndex = useRef<number | null>(null);

	const cancelReserved = async (item: USERSTYPE, i: number) => {
		if (setAdmin) {
			if (item.userId) {
				itemIndex.current = i;
				setDiaOpen(true);
			}
		}
	};

	const handleCancel = async () => {
		setLoading(true);
		const newData = [...gameData.users];

		const currentData = newData[itemIndex.current!];

		newData[itemIndex.current!] = {userId: "", startTime: ""};

		axios
			.post(`api/game/cancelG`, {
				newData,
				gameName: gameData.id,
				gamesData,
			})
			.then(({data}) => {
				setLoading(false);
				setGames(data.cancelReserved);
				console.log(currentData);
				setDiaOpen(false);
			})
			.catch((err) => {
				setLoading(false);
				alert("실패......왜와이?")
				console.log(err)
			});
	};

	return (
		<div>
			<h1>{gameData.id}</h1>
			{/*<div style={{display: "flex", flexDirection: "row", marginRight: 1}}>*/}
			{/*	{gameData.users.map((item, i) => (*/}
			{/*		<div key={i} style={{display: "flex", flexDirection: "row", marginInline: 1}}>*/}
			{/*			<div>{item.userId ? item.userId : "빈자리"}</div>*/}
			{/*			<div>{item.startTime && useEndTime(new Date(item.startTime), 40)}</div>*/}
			{/*		</div>*/}
			{/*	))}*/}
			{/*</div>*/}
			<Stack
				direction="row"
				divider={<Divider orientation="vertical" flexItem/>}
				spacing={2}
			>
				{gameData.users.map((item, i) => (
					<div key={i}>
						{item.userId ? (
							<div>
								<Item
									style={{display: "flex", background: "#E8E8E8"}}
									onClick={() => cancelReserved(item, i)}
								>
									<div>{item.userId ? item.userId : "빈자리"}</div>
									<div>{` | `}</div>
									{gameData.id !== "충전" ? (
										<div>
											{item.startTime &&
												useEndTime(new Date(item.startTime), gameData.id === "노래방" ? 30 : 40)}
											분
										</div>
									) : null}
								</Item>
							</div>
						) : (
							<Item>
								<div>빈자리</div>
							</Item>
						)}
					</div>
				))}
			</Stack>
			<Dialog open={diaOpen} keepMounted onClose={() => setDiaOpen(false)}>
				<UseBackDrop bdOpen={loading}/>
				<DialogTitle>캔슬</DialogTitle>
				<DialogContent>
					<DialogContentText>
						{`게임 : ${gameData.id}
						이름 : ${
							itemIndex.current !== null &&
							gameData.users[itemIndex.current].userId
						}`}
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleCancel}>지우기</Button>
					<Button onClick={() => setDiaOpen(false)}>취소</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}

export default AdminGameList;
