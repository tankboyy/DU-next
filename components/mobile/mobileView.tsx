import React from 'react';
import MobileGameList from "./mobileGameList";
import MobileLayout from "./mobileLayout";

type PropsType = {}

function MobileView(props: PropsType) {
	return (
		<div>
			<MobileLayout />
			<MobileGameList />
		</div>
	);
}

export default MobileView;
