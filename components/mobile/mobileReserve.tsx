import React from 'react';
import { queryClient } from "../../pages/_app";
import { Tgames } from "../admin/adminGame";
import { Button, ButtonGroup } from "@mui/material";
import { USERSTYPE } from "../types";
import { useMutationGame } from "../../hooks/games";
import useEndTime from "../../hooks/useEndTime";

type PropsType = {
	games: Tgames
	gameName: string
}

function MobileReserve(props: PropsType) {

	const reserved = (i: number) => {
		console.log(`name: 오석중 i: ${i} gameName: ${props.gameName}`)
		const a = props.games[props.gameName].users

		const arr = Array(a.length).fill(false);
		arr[i] = true
		// console.log(useMutationGamesData(props.gameName, ['오석중'], arr));
	}

	const a = props.games[props.gameName]
	return (
		<div className="flex justify-center">
			<ButtonGroup variant="text" aria-label="outlined primary button group">
				{a.users.map((item: USERSTYPE, i: number) => (
					<Button onClick={() => reserved(i)} >{item.userId ? `${item.userId} ${useEndTime(new Date(item.startTime), 40)}분`  : `${i + 1}번`}</Button>
				))}
			</ButtonGroup>
		</div>
	);
}

export default MobileReserve;
