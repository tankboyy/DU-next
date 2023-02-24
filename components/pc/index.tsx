import React from 'react';
import NewUserSearch from "../newUserSearch";
import PlayerView from "../newComponents/playerView";
import NewPcGameList from "./newPcGameList";

type PropsType = {}

function Index(props: PropsType) {
	return (
		<div>
			<PlayerView />
			<NewUserSearch />
			<NewPcGameList />
		</div>
	);
}

export default Index;
