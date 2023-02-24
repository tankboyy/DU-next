import React from 'react';
import { Chip, Stack } from "@mui/material";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { filterPlayers, playersState } from "../../recoil";

type PropsType = {}

function PlayerView(props: PropsType) {
	const setPlayers = useSetRecoilState(playersState);
	const players = useRecoilValue(filterPlayers);
	const handleDelete = (player: string) => {
		const index = players.findIndex((name) => name === player);
		const prev = [...players];
		prev.splice(index, 1);
		setPlayers(prev);
	}
	return (
		<>
			<Stack
				direction="row"
				spacing={1}
				sx={{display: "flex", justifyContent: "center", p: 2}}
			>
				{players && (
					players.map((player, i) => (
						<Chip
							key={i}
							label={player}
							variant="outlined"
							onDelete={() => handleDelete(player)}
						/>
					))
				)}
			</Stack>
		</>
	);
}

export default PlayerView;
