import { Chip, Stack } from '@mui/material';
import React from 'react';
import { useRecoilState, useRecoilValue } from "recoil";
import { filterPlayers, playersState } from "../../recoil";

type PropsType = {}
const data = ['111', '222', '333', '444', '555', '666', '777', '888', '999', '000']

function ReservedUser(props: PropsType) {
	const [players, setPlayers] = useRecoilState<string[]>(playersState);
	const chipClick = (name: string, e: any) => {
		setPlayers((prev) => [...prev, name])
	}
	return (
		<div className={"w-screen"}>
			<Stack direction="column" spacing={0.5} className={"grid grid-rows-5 grid-cols- grid-flow-col"}>
				{data.map((item, i) => (
					<div key={i} >
						<Chip label={item} size="small" onClick={(e: any) => chipClick(item, e)} />
					</div>
				))}
			</Stack>
		</div>
	);
}

export default ReservedUser;
