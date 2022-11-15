import React from 'react';

function ArrView(props: {arr: number[][]}) {
	return (
		<div style={{display: 'flex', flexDirection: "row"}}>
			{props.arr.map((item, i) => (
				<div key={i} style={{paddingInline: '10px'}} >{item.length}</div>
			))}
		</div>
	);
}

export default ArrView;
