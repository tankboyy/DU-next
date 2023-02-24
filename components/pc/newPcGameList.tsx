import React, { useEffect, useState } from 'react';
import Grid from "@mui/material/Unstable_Grid2";
import AdminGameList from "../admin/adminGameList";
import { GAMETYPE } from "../types";
import { resSoloGame, useGetGamesData, useResSoloGame } from "../../hooks/reactQuerys/games";
import { styled } from "@mui/material/styles";
import { Paper, Stack, Typography } from "@mui/material";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { filterPlayers, playersState } from "../../recoil";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from 'axios';

const Item = styled(Paper)(({theme}) => ({
	backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
	...theme.typography.body2,
	padding: theme.spacing(1),
	textAlign: 'center',
	color: theme.palette.text.secondary,
}));


type PropsType = {}

function NewPcGameList(props: PropsType) {
	const [games, setGames] = useState<GAMETYPE[]>();
	const {
		data,
		status,
		fetchStatus,
		refetch
	}: {data: GAMETYPE[] | undefined, status: string, fetchStatus: string, refetch: any} = useGetGamesData();
	const resSolo = useResSoloGame();
	const setData = useSetRecoilState(playersState);
	const players = useRecoilValue(filterPlayers);
	useEffect(() => {
		if (status === "success") setGames(data)
	}, [fetchStatus])

	const setPlayers = () => {
		const prev = [...players];
		prev.shift()
		setData(prev);
	}
	const queryClient = useQueryClient();

	const onReserve = (gName: string, i: number) => {
		resSolo.mutate({gameNumber: i, userId: players[0], name: gName}, {
				onSuccess: async () => {
					// refetch();
					await axios.post(`api/logs/addlog`,{gameName: gName, userId: [players[0]]}).then(() => queryClient.invalidateQueries(["gamesData"]))
					setPlayers();
				},
			}
		)

	}


	return (
		<div>
			<button onClick={() => queryClient.invalidateQueries(["gamesData"])}>asd</button>
			불러온 시간: {new Date().getHours()}시 {new Date().getMinutes()}분 {new Date().getSeconds()}초
			{status === 'loading' ? <div>로딩중...</div> :
				<div className={"flex justify-center"}>
					{games ?
						<div>
							<Grid container spacing={2}>
								{games.map(item => (
									<Grid xs={"auto"} md={4} className="">
										<Typography variant="h5">
											{item.id}
										</Typography>
										<Stack direction={{xs: "row", md: "row"}}>
											{item.users.map((user, i) => (
												<Item className={'pr-0.5 bg-sky-200'} onClick={() => onReserve(item.id, i)}>
													<Typography variant="body2" className={`${user.userId && "bg-gray-300"}`}>
														{user.userId === "" ? "빈자리" : user.userId}
													</Typography>
												</Item>
											))}
										</Stack>
									</Grid>
								))}
							</Grid>
						</div>
						:
						null
					}
				</div>
			}
		</div>
	);
}

export default NewPcGameList;
