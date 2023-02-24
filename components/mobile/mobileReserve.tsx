import React, { useState } from 'react';
import { queryClient } from "../../pages/_app";
import { Tgames } from "../admin/adminGame";
import { Button, ButtonGroup, Snackbar } from "@mui/material";
import { GAMETYPE, USERSTYPE } from "../types";
import { useGetGamesData, useMutationGame } from "../../hooks/reactQuerys/games";
import useEndTime from "../../hooks/useEndTime";
import { useRecoilValue } from "recoil";
import { filterPlayers } from "../../recoil";

type PropsType = {
	games: GAMETYPE
}

function MobileReserve(props: PropsType) {

	useGetGamesData();
	const players = useRecoilValue(filterPlayers);

	const reserved = (i: number) => {
		console.log(`name: ${players[0]} i: ${i} gameName: ${props.games.id} ${players.length}`)
		if(!players.length) {
			setOpen(true)
		}

		const arr = Array(a.length).fill(false);
		arr[i] = true

		// console.log(useMutationGamesData(props.gameName, ['오석중'], arr));
	}

	const [open, setOpen] = useState<boolean>(false);
	// @ts-ignore
	const a = props.games.users;
	return (
		<div className="flex justify-center">
			<ButtonGroup variant="text" aria-label="outlined primary button group">
				{a.map((item, i) => (
					<Button disabled={item.userId !== ""} onClick={() => reserved(i)} >{item.userId ? `${item.userId} ${useEndTime(new Date(item.startTime), 40)}분`  : `${i + 1}번`}</Button>
				))}
			</ButtonGroup>
			<Snackbar
				anchorOrigin={{vertical: "bottom", horizontal: "right" }}
				open={open}
				// TransitionComponent={}
				onClose={() => setOpen(false)}
				message="친구를 골라주세요!"
				key={"hi"}
			/>
		</div>
	);
}

export default MobileReserve;
