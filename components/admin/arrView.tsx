import React from 'react';

function ArrView(props: {arr: number[][], sN: string[]}) {
	return (
		<div style={{display: 'flex', flexDirection: "row"}}>
			{props.arr.map((item, i) => (
				<div key={i}>
					<div>{props.sN[i]}</div>
					<div style={{paddingInline: '10px'}}>{item.length}</div>
				</div>
			))}
		</div>
	);
}

export default ArrView;
