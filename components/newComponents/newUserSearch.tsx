import React, { useEffect, useState } from 'react';
import { Autocomplete, TextField } from "@mui/material";
import { useGetIds } from "../../hooks/useGetIds";
import { filterPlayers, playersState } from '../../recoil';
import { useRecoilState, useRecoilValue } from "recoil";
import { log } from "util";

type PropsType = {}

function NewUserSearch(props: PropsType) {
	const [userIds, setUserIds] = useState<string[]>([]);
	const [players, setPlayers] = useRecoilState<string[]>(playersState);
	useEffect(() => {
		useGetIds().then((data) => setUserIds(data.data));
	}, [])
	const filteredData = useRecoilValue(filterPlayers);
	const handleKeyDown = (e: any) => {
		if (e.key === "Enter") console.log("enter")
	}
	return (
		<>
			<div className="flex justify-center p-4">
				<Autocomplete
					multiple
					id="tags-outlined"
					options={userIds}
					sx={{width: 400}}
					value={[]}
					onChange={(e: any, newValue: string[]) => setPlayers((prevData) => [...prevData, ...newValue])}
					filterSelectedOptions
					renderInput={(params) => (
						<TextField
							onKeyPress={(e) => handleKeyDown(e)}
							{...params}
							label="이름"
						/>
					)}
				/>
			</div>
		</>
	);
}

export default NewUserSearch;
