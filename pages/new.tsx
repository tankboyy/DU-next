import NewUserSearch from "../components/newUserSearch";
import MobileGameList from "../components/mobile/mobileGameList";
import ReservedUser from "../components/newComponents/reservedUser";
import React from "react";
import PlayerView from "../components/newComponents/playerView";

export default function() {

	return (
		<>
			<PlayerView/>
			<NewUserSearch/>
			<MobileGameList/>
			<ReservedUser/>
		</>
	)
}
