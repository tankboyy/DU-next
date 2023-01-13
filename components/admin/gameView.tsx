import React from 'react';

type propsType = {
	gameName: string
}

function GameView({gameName}: propsType) {
	return (
		<div>
			<h2 className="text-lg text-gray-900 font-medium title-font mb-2">{gameName}</h2>
			<p className="leading-relaxed text-base">Fingerstache flexitarian street art 8-bit waist co, subway tile
				poke farm.</p>
		</div>
	);
}

export default GameView;
