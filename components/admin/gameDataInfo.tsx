import React from 'react';
import { GAMETYPE } from "../types";

type propsType = {
	gamesData: GAMETYPE
}

function GameDataInfo({gamesData}: propsType) {
	return (
		<div className="flex">
			{gamesData.users.map((user, i) => (
				<div key={i} className="leading-relaxed text-base px-0.5" >
					{user.userId ? user.userId : "빈자리"}
				</div>
			))}
		</div>
	);
}

export default GameDataInfo;
