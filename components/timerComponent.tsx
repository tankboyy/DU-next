import React, { useEffect, useState } from 'react';

function TimerComponent(props: {setIsStep: React.Dispatch<React.SetStateAction<number>>, setSearch: React.Dispatch<React.SetStateAction<string>>, setPlayers: React.Dispatch<React.SetStateAction<string[]>>}) {
	const [seconds, setSeconts] = useState<number>(30)
	useEffect(() => {
		setTimeout(() => {
			setSeconts(seconds - 1)
			if (seconds <= 0) {
				props.setIsStep(1)
				props.setSearch("")
				props.setPlayers([])
			}
		}, 1000)
	})
	return (
		<div>
			{seconds}
		</div>
	);
}

export default TimerComponent;
